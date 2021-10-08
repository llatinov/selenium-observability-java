package com.automationrhapsody.observability;

import com.automationrhapsody.observability.pages.HomePage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class HomePageTest {

    // This is run inside the Selenium container, which is inside the Docker network
    private static final String URL = "http://frontend:3000";

    private WebDriverFacade webDriver;

    @BeforeEach
    public void setUp() {
        webDriver = new WebDriverFacade(true);
        webDriver.start(URL);
    }

    @Test
    public void fetchPersons_returns_twoPersons() {
        HomePage homePage = new HomePage(webDriver);
        homePage.fetchPersons();
        Assertions.assertEquals(homePage.getPersonsCountText(), "Found 2 persons");
    }

    @AfterEach
    public void tearDown() {
        webDriver.stop();
    }
}
