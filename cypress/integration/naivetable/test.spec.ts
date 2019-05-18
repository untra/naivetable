/// <reference types="Cypress" />
// tslint:disable-next-line: no-var-requires
// cy.log(varietyofDataTypesData)
const varietyOfDataTypesJSON = [
  {
    "numbers": 1,
    "strings": "2",
    "floats": 3.1,
    "existential": true,
    "arrays": ["of", "strings"]
  },
  {
    "numbers": 4,
    "strings": "5",
    "floats": 6.28921,
    "existential": false,
    "arrays": [420, 1.618, -69]
  },
  {
    "numbers": 7,
    "strings": "6",
    "floats": -9.329088,
    "existential": null,
    "arrays": ["mixed", 93.3, true, null]
  },
  {
    "numbers": 10,
    "strings": "11",
    "floats": 12.48721296,
    "arrays": []
  }
]

context("Actions", () => {
  function shouldContain (q , data, includeIndex = false ) {
    const includedIndex = includeIndex ? 1 : 0
    const numOfColumns = Object.keys(data[0]).length + includedIndex
    const numOfRows = data.length
    return data.reduce((acc, blob) => {
      return Object.keys(blob).reduce((acc, key) => {
        return acc.and('contain', `${key}`).and('contain', blob[key])
      }, acc)
    }, q.should('have.length', 1))
  }
  beforeEach(() => {
    // for integration tests
    // cy.visit('https://naivetable.untra.io/#/test')
    // for local development
    cy.visit("http://localhost:3000/#/test");
  });

  context("test1: It should be able to render a variety of data types", () => {
    it('should contain all of the data values', () => {
      shouldContain(cy.get(".test1"), varietyOfDataTypesJSON)
    })
  });

});
