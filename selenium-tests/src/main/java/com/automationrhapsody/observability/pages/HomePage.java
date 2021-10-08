package com.automationrhapsody.observability.pages;

import com.automationrhapsody.observability.WebDriverFacade;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class HomePage {

    private WebDriverFacade webDriver;

    public HomePage(WebDriverFacade webDriver) {
        this.webDriver = webDriver;
    }

    private WebElement getFetchPersonsButton() {
        return webDriver.findElement(By.id("test-fetch-persons-button"));
    }

    public void fetchPersons() {
        getFetchPersonsButton().click();
    }

    public String getPersonsCountText() {
        return webDriver.findElement(By.id("test-persons-count-text")).getText();
    }
}
