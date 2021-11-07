import HomePage from '../pages/home_page'

describe('Person service frontend tests', () => {
  it('createPerson_thenCancel_personIsNotCreated', () => {
    cy.initTracing('createPerson_thenCancel_personIsNotCreated')

    const homePage = new HomePage()
    homePage.goTo()
    homePage.clickFetchPersonsButton()

    const createPersonPage = homePage.clickCreatePersonButton()
    createPersonPage.clickCancelButton()

    homePage.goTo()
    homePage.clickFetchPersonsButton()
  })
})
