export default class CreatePersonPage {
  constructor(tracingCy) {
    this.tracingCy = tracingCy
    this.elements = {
      firstName: () => this.tracingCy.get('input[name="firstName"]'),
      lastName: () => this.tracingCy.get('input[name="lastName"]'),
      email: () => this.tracingCy.get('input[name="email"]'),
      cancelButton: () => this.tracingCy.get('#test-new-persons-button-cancel'),
      saveButton: () => this.tracingCy.get('#test-new-persons-button-save')
    }
  }

  inputFirstName(firstName) {
    this.tracingCy.type(this.elements.firstName(), firstName)
  }

  inputLastName(lastName) {
    this.tracingCy.type(this.elements.lastName(), lastName)
  }

  inputEmail(email) {
    this.tracingCy.type(this.elements.email(), email)
  }

  clickCancelButton() {
    this.tracingCy.click(this.elements.cancelButton())
  }

  clickSaveButton() {
    this.tracingCy.click(this.elements.saveButton())
  }
}
