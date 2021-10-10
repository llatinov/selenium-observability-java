package com.automationrhapsody.observability;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.ImmutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public enum WebDriverFactory {
    FIREFOX("firefox", FirefoxDriver::new, WebDriverManager.firefoxdriver()),
    CHROME("chrome", ChromeDriver::new, WebDriverManager.chromedriver()),
    EDGE("edge", ChromeDriver::new, WebDriverManager.edgedriver()),
    IE("ie", InternetExplorerDriver::new, WebDriverManager.iedriver());

    private String name;
    private Supplier<WebDriver> driverSupplier;
    private WebDriverManager driverManager;

    WebDriverFactory(String name, Supplier<WebDriver> driverSupplier, WebDriverManager driverManager) {
        this.name = name;
        this.driverSupplier = driverSupplier;
        this.driverManager = driverManager;
    }

    private static WebDriverFactory fromString(String value) {
        for (WebDriverFactory browser : values()) {
            if (value != null && value.toLowerCase().equals(browser.name)) {
                return browser;
            }
        }
        System.out.println("Invalid driver name passed as 'browser' system property. "
                + "One of: " + Arrays.stream(values()).map(a -> a.name).collect(Collectors.joining(", ")) + " is expected. Defaulting to Chrome.");
        return CHROME;
    }

    public static WebDriver createDriver(boolean isRemote) {
        WebDriverFactory factory = WebDriverFactory.fromString(System.getProperty("browser"));
        factory.driverManager.setup();
        try {
            return isRemote ? new RemoteWebDriver(new URL("http://localhost:4444"), new ImmutableCapabilities("browserName", "chrome")) : factory.driverSupplier.get();
        } catch (MalformedURLException e) {
            System.out.println("Exception when creating remote driver, defaulting to: " + factory.name);
            return factory.driverSupplier.get();
        }
    }
}
