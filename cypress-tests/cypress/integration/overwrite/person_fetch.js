import HomePage from '../../pages/overwrite/home_page'

describe('Fetch person with commands overwrite', () => {
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
