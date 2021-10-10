package com.automationrhapsody.observability;

import com.automationrhapsody.observability.pages.CreateNewPersonPage;
import com.automationrhapsody.observability.pages.HomePage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;

public class RemoteWebDriverTracingTest {

    // This is run inside the Selenium container, which is inside the Docker network
    private static final String URL = "http://frontend:3000";

    private TracingWebDriver webDriver;

    @BeforeEach
    public void setUp(TestInfo testInfo) {
        webDriver = new TracingWebDriver(true,
                testInfo.getTestClass().get().getName(),
                testInfo.getTestMethod().get().getName());
        webDriver.get(URL);
    }

    @Test
    public void createPerson_thenCancel_personIsNotCreated() {
        HomePage homePage = new HomePage(webDriver);
        homePage.clickFetchPersonsButton();

        CreateNewPersonPage createPage = homePage.clickCreateNewPersonButton();
        createPage.clickCancelButton();

        webDriver.get(URL);
        homePage.clickFetchPersonsButton();
    }

    @AfterEach
    public void tearDown() {
        webDriver.quit();
    }
}
