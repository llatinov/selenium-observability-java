import TracingCypress from '../../support/tracing_cypress'
import HomePage from '../../pages/wrapper/home_page'

describe('Fetch person with Cypress wrapper', () => {
  it('createPerson_thenCancel_personIsNotCreated', () => {
    const tracingCy = new TracingCypress()
    tracingCy.initTracing('createPerson_thenCancel_personIsNotCreated')

    const homePage = new HomePage(tracingCy)
    homePage.goTo()
    homePage.clickFetchPersonsButton()

    const createPersonPage = homePage.clickCreatePersonButton()
    createPersonPage.clickCancelButton()

    homePage.goTo()
    homePage.clickFetchPersonsButton()
  })
})
