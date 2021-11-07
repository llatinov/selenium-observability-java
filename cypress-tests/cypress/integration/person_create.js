import HomePage from '../pages/home_page'

describe('Person service frontend tests', () => {
  it('createPerson_thenSave_personIsCreated', () => {
    cy.initTracing('createPerson_thenSave_personIsCreated')

    const homePage = new HomePage()
    homePage.goTo()

    const createPersonPage = homePage.clickCreatePersonButton()
    createPersonPage.inputFirstName('Jack')
    createPersonPage.inputLastName('Doe')
    createPersonPage.inputEmail('jack.doe@automationrhapsody.com')
    createPersonPage.clickSaveButton()
  })
})
