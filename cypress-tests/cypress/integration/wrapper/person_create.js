import TracingCypress from '../../support/tracing_cypress'
import HomePage from '../../pages/wrapper/home_page'

describe('Create person with Cypress wrapper', () => {
  it('createPerson_thenSave_personIsCreated', () => {
    const tracingCy = new TracingCypress()
    tracingCy.initTracing('createPerson_thenSave_personIsCreated')

    const homePage = new HomePage(tracingCy)
    homePage.goTo()

    const createPersonPage = homePage.clickCreatePersonButton()
    createPersonPage.inputFirstName('Jack')
    createPersonPage.inputLastName('Doe')
    createPersonPage.inputEmail('jack.doe@automationrhapsody.com')
    createPersonPage.clickSaveButton()
  })
})
