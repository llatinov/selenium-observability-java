package com.automationrhapsody.observability;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class WebDriverFacade {

    private static final Duration WAIT_SECONDS = Duration.ofSeconds(5);

    private WebDriver driver;

    public WebDriverFacade(boolean isRemote) {
        System.setProperty("otel.traces.exporter", "jaeger");
        System.setProperty("otel.exporter.jaeger.endpoint", "http://localhost:14250");
        System.setProperty("otel.resource.attributes", "service.name=selenium-java-client");
        System.setProperty("otel.metrics.exporter", "none");

        driver = WebDriverFactory.createDriver(isRemote);
    }

    public void start(String url) {
        driver.get(url);
    }

    public void stop() {
        try {
            // Wait for all trace POST requests to get fired
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            // Do nothing
        } finally {
            driver.quit();
        }
    }

    public Object executeJavaScript(String script) {
        return ((JavascriptExecutor) driver).executeScript(script);
    }

    public WebElement findElement(By by) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, WAIT_SECONDS);
            return wait.until(ExpectedConditions.visibilityOfElementLocated(by));
        } catch (Exception ex) {
            return null;
        }
    }

    public List<WebElement> findElements(By by) {
        WebDriverWait wait = new WebDriverWait(driver, WAIT_SECONDS);
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(by));
    }
}