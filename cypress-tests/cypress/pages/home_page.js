import CreatePersonPage from './create_person_page'

export default class HomePage {
  constructor() {
    this.elements = {
      fetchPersonsButton: () => cy.get('#test-fetch-persons-button'),
      createPersonButton: () => cy.get('#test-create-person-button')
    }
  }

  goTo() {
    cy.visit('http://localhost:3000')
    cy.window().then(window => cy.initWindow(window))
  }

  clickFetchPersonsButton() {
    this.elements.fetchPersonsButton().click()
  }

  clickCreatePersonButton() {
    this.elements.createPersonButton().click()
    return new CreatePersonPage()
  }
}
