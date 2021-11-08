import HomePage from '../../pages/overwrite/home_page'

describe('Create person with commands overwrite', () => {
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
