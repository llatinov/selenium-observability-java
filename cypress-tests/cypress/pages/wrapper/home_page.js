import CreatePersonPage from './create_person_page'

export default class HomePage {
  constructor(tracingCy) {
    this.tracingCy = tracingCy
    this.elements = {
      fetchPersonsButton: () => this.tracingCy.get('#test-fetch-persons-button'),
      createPersonButton: () => this.tracingCy.get('#test-create-person-button')
    }
  }

  goTo() {
    this.tracingCy.visit('http://localhost:3000')
  }

  clickFetchPersonsButton() {
    this.tracingCy.click(this.elements.fetchPersonsButton())
  }

  clickCreatePersonButton() {
    this.tracingCy.click(this.elements.createPersonButton())
    return new CreatePersonPage(this.tracingCy)
  }
}
