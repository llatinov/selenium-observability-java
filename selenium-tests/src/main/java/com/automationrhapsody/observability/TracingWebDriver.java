package com.automationrhapsody.observability;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.exporter.jaeger.JaegerGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.SimpleSpanProcessor;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.time.Duration;
import java.util.List;

public class TracingWebDriver {

    private static final Duration WAIT_SECONDS = Duration.ofSeconds(5);
    private static final String JAEGER_GRPC_URL = "http://localhost:14250";

    private WebDriver driver;
    private Tracer tracer;
    private Span mainSpan;
    private Span currentSpan;

    public TracingWebDriver(boolean isRemote, String className, String methodName) {
        System.setProperty("otel.traces.exporter", "jaeger");
        System.setProperty("otel.exporter.jaeger.endpoint", JAEGER_GRPC_URL);
        System.setProperty("otel.resource.attributes", "service.name=selenium-java-client");
        System.setProperty("otel.metrics.exporter", "none");

        initializeTracer();

        mainSpan = tracer.spanBuilder("webdriver-create").startSpan();
        mainSpan.setAttribute("test.class.name", className);
        mainSpan.setAttribute("test.method.name", methodName);
        currentSpan = mainSpan;
        driver = WebDriverFactory.createDriver(isRemote);
        mainSpan.end();
    }

    public Object executeJavaScript(String script) {
        return ((JavascriptExecutor) driver).executeScript(script);
    }

    public String captureScreenshot() {
        File screenshotFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        String output = screenshotFile.getAbsolutePath();
        System.out.println(output);
        return output;
    }

    public void get(String url) {
        currentSpan = mainSpan;
        Span span = createChildSpan("get: " + url);
        try {
            forceFlushTraces();
            driver.get(url);
            createBrowserBindingSpan(span);
        } catch (Exception ex) {
            span.setStatus(StatusCode.ERROR, ex.getMessage());
            captureScreenshot();
        } finally {
            span.end();
        }
    }

    public void quit() {
        forceFlushTraces();
        currentSpan = mainSpan;
        Span span = createChildSpan("quit");
        driver.quit();
        span.end();
    }

    public WebElement findElement(By by) {
        Span span = createChildSpan("findElement: " + by.toString());
        try {
            createBrowserBindingSpan(span);
            WebDriverWait wait = new WebDriverWait(driver, WAIT_SECONDS);
            return wait.until(ExpectedConditions.visibilityOfElementLocated(by));
        } catch (Exception ex) {
            span.setStatus(StatusCode.ERROR, ex.getMessage());
            captureScreenshot();
            return null;
        } finally {
            span.end();
        }
    }

    public List<WebElement> findElements(By by) {
        Span span = createChildSpan("findElements: " + by.toString());
        try {
            createBrowserBindingSpan(span);
            WebDriverWait wait = new WebDriverWait(driver, WAIT_SECONDS);
            return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(by));
        } catch (Exception ex) {
            span.setStatus(StatusCode.ERROR, ex.getMessage());
            captureScreenshot();
            return null;
        } finally {
            span.end();
        }
    }

    private void initializeTracer() {
        JaegerGrpcSpanExporter exporter = JaegerGrpcSpanExporter.builder().setEndpoint(JAEGER_GRPC_URL).build();
        Resource resource = Resource.builder()
                .put("service.name", "selenium-tests")
                .build();
        SdkTracerProvider provider = SdkTracerProvider.builder()
                .addSpanProcessor(SimpleSpanProcessor.create(exporter))
                .setResource(resource)
                .build();
        OpenTelemetrySdk openTelemetrySdk = OpenTelemetrySdk.builder()
                .setTracerProvider(provider)
                .build();
        tracer = openTelemetrySdk.getTracer("io.opentelemetry.jaeger.exporter");
    }

    private Span createChildSpan(String name) {
        Span span = tracer.spanBuilder(name)
                .setParent(Context.current().with(currentSpan))
                .startSpan();
        currentSpan = span;
        return span;
    }

    private void createBrowserBindingSpan(Span span) {
        executeJavaScript("window.startBindingSpan('" + span.getSpanContext().getTraceId() + "', '" + span.getSpanContext().getSpanId() + "', '" + span.getSpanContext().getTraceFlags().asHex() + "')");
    }

    private void forceFlushTraces() {
        executeJavaScript("if (window.flushTraces) window.flushTraces()");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            // Do nothing
        }
    }
}