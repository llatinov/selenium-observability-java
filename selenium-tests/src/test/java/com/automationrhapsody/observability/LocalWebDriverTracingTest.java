package com.automationrhapsody.observability;

import com.automationrhapsody.observability.pages.CreateNewPersonPage;
import com.automationrhapsody.observability.pages.HomePage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;

public class LocalWebDriverTracingTest {

    private static final String URL = "http://localhost:3000";

    private TracingWebDriver webDriver;

    @BeforeEach
    public void setUp(TestInfo testInfo) {
        webDriver = new TracingWebDriver(false,
                testInfo.getTestClass().get().getName(),
                testInfo.getTestMethod().get().getName());
        webDriver.get(URL);
    }

    @Test
    public void createPerson_thenSave_personIsCreated() {
        HomePage homePage = new HomePage(webDriver);

        CreateNewPersonPage createPage = homePage.clickCreateNewPersonButton();
        createPage.inputFirstName("Jack");
        createPage.inputLastName("Doe");
        createPage.inputEmail("jack.doe@automationrhapsody.com");
        createPage.clickSaveButton();

        homePage.clickFetchPersonsButton();
    }

    @AfterEach
    public void tearDown() {
        webDriver.quit();
    }
}
