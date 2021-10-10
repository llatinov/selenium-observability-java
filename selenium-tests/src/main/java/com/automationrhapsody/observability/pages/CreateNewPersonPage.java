package com.automationrhapsody.observability.pages;

import com.automationrhapsody.observability.TracingWebDriver;
import org.openqa.selenium.By;

public class CreateNewPersonPage {

    private TracingWebDriver webDriver;

    public CreateNewPersonPage(TracingWebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public void inputFirstName(String firstName) {
        webDriver.findElement(By.name("firstName")).sendKeys(firstName);
    }

    public void inputLastName(String lastName) {
        webDriver.findElement(By.name("lastName")).sendKeys(lastName);
    }

    public void inputEmail(String email) {
        webDriver.findElement(By.name("email")).sendKeys(email);
    }

    public void clickCancelButton() {
        webDriver.findElement(By.id("test-new-persons-button-cancel")).click();
    }

    public void clickSaveButton() {
        webDriver.findElement(By.id("test-new-persons-button-save")).click();
    }
}
