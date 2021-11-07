export default class CreatePersonPage {
  constructor() {
    this.elements = {
      firstName: () => cy.get('input[name="firstName"]'),
      lastName: () => cy.get('input[name="lastName"]'),
      email: () => cy.get('input[name="email"]'),
      cancelButton: () => cy.get('#test-new-persons-button-cancel'),
      saveButton: () => cy.get('#test-new-persons-button-save')
    }
  }

  inputFirstName(firstName) {
    this.elements.firstName().type(firstName)
  }

  inputLastName(lastName) {
    this.elements.lastName().type(lastName)
  }

  inputEmail(email) {
    this.elements.email().type(email)
  }

  clickCancelButton() {
    this.elements.cancelButton().click()
  }

  clickSaveButton() {
    this.elements.saveButton().click()
  }
}
