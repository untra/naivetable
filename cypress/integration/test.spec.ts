/// <reference types="Cypress" />
// tslint:disable-next-line: no-var-requires
// cy.log(varietyofDataTypesData)
import nameDataJSON from '../../src/content/fixtures/nameData.json'
import styledHeadersJSON from '../../src/content/fixtures/styledHeaders.json'
import varietyOfDataTypesJSON from '../../src/content/fixtures/varietyOfTypesData.json'
import { DataObj, TableConfigHeader } from '../../src/NaiveTable'
import { nameHeaders } from '../../src/routes/test'

const varietyofDataTypesData: DataObj[] = varietyOfDataTypesJSON

const styledHeaders: TableConfigHeader[] = styledHeadersJSON;

const nameData: DataObj[] = nameDataJSON;

context("Actions", () => {
  const shouldContainChildren = ({
    $container,
    data,
    headers = [],
    includeIndex = false
  }: {
    $container: JQuery<HTMLElement>;
    data: DataObj[];
    headers?: TableConfigHeader[];
    includeIndex?: boolean;
  }) => {
    const firstElement = data[0] || {}
    const includedIndex = includeIndex ? 1 : 0;
    const numOfDataColumns = Object.keys(firstElement).length
    const numOfHeaderColumns = headers.length
    const numOfColumns = (numOfHeaderColumns || numOfDataColumns) + includedIndex;
    const numOfRows = data.length;
    const numOfChildren = (numOfColumns * (numOfRows + 1))
    return cy.wrap($container).children().should('have.length', numOfChildren)
  }
  const shouldContainData = ({
    $container,
    data
  }: {
    $container: JQuery<HTMLElement>;
    data: DataObj[];
    headers?: TableConfigHeader[];
    includeIndex?: boolean;
  }) =>
    data.reduce((tests, blob) => {
      const keys = Object.keys(blob)
      return keys.reduce((acc, key) => {
        const val: any = blob[key];
        return acc.and("contain", `${key}`).and("contain", val);
      }, tests);
    }, cy.wrap($container).should('have.css', 'display', 'grid'));

  beforeEach(() => {
    // for integration tests
    cy.visit('https://naivetable.untra.io/#/test')
    // for local development
    // cy.visit("http://localhost:3000/#/test");
  });

  context("test1: It should be able to render a variety of data types", () => {
    it("should contain all of the data values", () => {
      cy.get(".test1").as('test1')
      cy.get('@test1')
        .then(($container) => shouldContainData({ $container, data: varietyofDataTypesData }))

      cy.get('@test1')
        .then(($container) => shouldContainChildren({ $container, data: varietyofDataTypesData }))

    });
  });
  context("test2: It should be able to render an index left adjacent of the data", () => {
    it("should contain all of the data values", () => {
      cy.get(".test2").as('test2')
      cy.get('@test2')
        .then(($container) => shouldContainData({ $container, data: nameData, includeIndex: true }))
      cy.get('@test2')
        .then(($container) => shouldContainChildren({ $container, data: nameData, includeIndex: true }))

    });
  });
  context("test3: It should be able to render a table with custom headers", () => {
    it("should contain all of the data values", () => {
      cy.get(".test3").as('test3')
      cy.get('@test3')
        .then(($container) => shouldContainData({ $container, data: nameData, headers: nameHeaders }))
      cy.get('@test3')
        .then(($container) => shouldContainChildren({ $container, data: nameData, headers: nameHeaders }))

    });
  });
  context("test4: It should be able to render individual styling on each header", () => {
    it("should contain all of the data values", () => {
      cy.get(".test4").as('test4')
      cy.get('@test4')
        .then(($container) => shouldContainData({ $container, data: nameData, headers: styledHeaders }))
      cy.get('@test4')
        .then(($container) => shouldContainChildren({ $container, data: nameData, headers: styledHeaders }))
    });
  });
  context.skip("test5: It should be able to render individual styling for the table", () => {
    it("should contain all of the data values", () => {
      cy.get(".test5").as('test5')
      cy.get('@test5')
        .then(($container) => shouldContainData({ $container, data: nameData }))
      cy.get('@test5')
        .then(($container) => shouldContainChildren({ $container, data: nameData }))
    });
  });
  context.skip("test6: It should be able to render individual styling for each cell", () => {
    it("should contain all of the data values", () => {
      cy.get(".test6").as('test6')
      cy.get('@test6')
        .then(($container) => shouldContainData({ $container, data: nameData }))
      cy.get('@test6')
        .then(($container) => shouldContainChildren({ $container, data: nameData }))
    });
  });
  context.skip("test7: It should be able to display sortable columns", () => {
    it("should contain all of the data values", () => {
      cy.get(".test7").as('test7')
      cy.get('@test7')
        .then(($container) => shouldContainData({ $container, data: nameData }))
      cy.get('@test7')
        .then(($container) => shouldContainChildren({ $container, data: nameData }))
    });
  });
  context.skip("test8: It should display sorted column data sorted correctly", () => {
    it("should contain all of the data values", () => {
      cy.get(".test8").as('test8')
      cy.get('@test8')
        .then(($container) => shouldContainData({ $container, data: nameData }))
      cy.get('@test8')
        .then(($container) => shouldContainChildren({ $container, data: nameData }))
    });
  });
  context("test9: It should be able to render empty data", () => {
    it("should contain all of the data values", () => {
      const data: any[] = []
      cy.get(".test9").as('test9')
      cy.get('@test9')
        .then(($container) => shouldContainData({ $container, data }))
      cy.get('@test9')
        .then(($container) => shouldContainChildren({ $container, data }))
    });
  });
  context("test10: It should be able to render a data of one", () => {
    it("should contain all of the data values", () => {
      const data = [{ of: "one" }]
      cy.get(".test10").as('test10')
      cy.get('@test10')
        .then(($container) => shouldContainData({ $container, data }))
      cy.get('@test10')
        .then(($container) => shouldContainChildren({ $container, data }))

    });

  });
});

