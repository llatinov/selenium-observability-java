package com.automationrhapsody.observability.pages;

import com.automationrhapsody.observability.TracingWebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class HomePage {

    private TracingWebDriver webDriver;

    public HomePage(TracingWebDriver webDriver) {
        this.webDriver = webDriver;
    }

    private WebElement getFetchPersonsButton() {
        return webDriver.findElement(By.id("test-fetch-persons-button"));
    }

    public CreateNewPersonPage clickCreateNewPersonButton() {
        webDriver.findElement(By.id("test-create-person-button")).click();
        return new CreateNewPersonPage(webDriver);
    }

    public void clickFetchPersonsButton() {
        getFetchPersonsButton().click();
    }

    public String getPersonsCountText() {
        return webDriver.findElement(By.id("test-persons-count-text")).getText();
    }
}
