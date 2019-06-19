/***
 * Naivetable Tests
 * MIT License
 * Made with 💙 by @untra
 * ---
 * tslint:disable-next-line: no-implicit-dependencies
 */
import React from "react";
import llanowarDataJSON from "../content/fixtures/llanowar.json";
import nameDataJSON from "../content/fixtures/nameData.json";
import styledHeadersJSON from "../content/fixtures/styledHeaders.json";
import varietyofDataTypesDataJSON from "../content/fixtures/varietyOfTypesData.json";
import { DataObj, NaiveTable, TableConfigHeader } from "../NaiveTable";

// Hi friend 👋 thanks for reading my naivetable tests!
// maybe you're on this github page?

const thisGithubPage =
  "https://github.com/untra/naivetable/blob/master/src/routes/test.tsx";

// If you are, then I want to know you are a talented and skilled engineer,
// and it would certainly be a pleasure to shake your hand one day,
// and tell you personally _just how cool you are_

// While you're here you may also want to check out that cypress page:
const thatCypressPage = "https://dashboard.cypress.io/#/projects/wrytfx/runs";

// redefine the data fixtures to accomodate prefered typings

const llanowarData: DataObj[] = llanowarDataJSON;

const varietyofDataTypesData: DataObj[] = varietyofDataTypesDataJSON;

const styledHeaders: TableConfigHeader[] = styledHeadersJSON;

const nameData: DataObj[] = nameDataJSON;

// the secret sauce to display no headers and custom render:
// use css and `dsiplay: none` for the header style
const mtgHeaders: TableConfigHeader[] = [{
  label: "",
  dataKey: "",
  style: { display: 'none'},
  render: (val : any) => {
    const { image_uris, name } = val
    return (<img width={250} height={345} alt={name} src={`${image_uris ? image_uris.png : ''}`} />)
  }
},{
  label: "",
  dataKey: "",
  style: { display: 'none'},
  render: (val : any) => {
    const { name, mana_cost, type_line, oracle_text, power, toughness, flavor_text } = val
    return (<div>
      <h4>{name} {mana_cost}</h4>
      <p>{type_line}</p>
      <p>{oracle_text}</p>
      <p>{flavor_text}</p>
      <strong>{power}/{toughness}</strong>
    </div>)
  }
}]

// complex headers with custom rendering
export const nameHeaders = [
  // change the rendered header text with the 'label' parameter
  { label: "name", dataKey: "a" },
  // individually style each header cell with the 'style' parameter
  { label: "age", dataKey: "b", style: { backgroundColor: "pink" } },
  // provide a 'render' function to control how dataCells render for the column
  {
    label: "grade status",
    dataKey: "c",
    render: (val: number) => (
      <h2>{`${val > 50 ? "✅passing" : "❌failing"} the class: ${val}`}</h2>
    )
  },
  // use the 'dataKey' to control the input to the render function
  // provide an empty string to instead call render with the entire dataObject provided
  {
    label: "assessment",
    dataKey: "",
    render: (val: any) => (
      <h4>{`${JSON.stringify(val.a)} is ${val.c > 90 ? "really" : ""} ${
        val.c > 50 ? "smart" : "dumb"
      }`}</h4>
    )
  },
  // you can have more headers than keys in your dataObjects, btw ;)
  // you can also control the 'width' of the column (pass in 'fr' , defaults to 'auto')
  {
    label: "comment",
    dataKey: "",
    render: () =>
      "Lorem Ipsum this is the same comment rendered over and over again why won't @LILBTHEBASEDGOD tweet about about me?",
    width: "4fr"
  }
];

export default class Test extends React.Component {
  public render() {
    return (
      <div className="wrapper">
        <h1>
          <span role="img" aria-label="Bento">
            🍱
          </span>{" "}
          NaiveTable
        </h1>
        <h2>Cypress Tests and React Hooks demo</h2>
        <h3>
          View this page and tests at <a href={thisGithubPage}>Github.com</a>
        </h3>
        <h3>
        View the test results at <a href={thatCypressPage}>Cypress.io</a></h3>
        <p>
          This page is a demonstration of the NaiveTable component used in a
          variety of ways:
        </p>
        <ul>
          <li>It is the selection and input to a variety of cypress tests.</li>
          <li>
            View the chrome console to see statistics and reports of how the
            examples render.
          </li>
          <li>
            This is also a demonstration of the power of react-hooks, a
            functional and clean approach to writing react components.
          </li>
        </ul>
        <h4>
          #1 It should be able to render a variety of different javascript data
          types
        </h4>
        <NaiveTable className={"test1"} data={varietyofDataTypesData} />
        <h4>#2 It should be able to render an index left adjacent of the data</h4>
        <NaiveTable className={"test2"} data={nameData} includeIndex={true} />
        <h4>#3 It should be able to render a table with custom headers</h4>
        <NaiveTable className={"test3"} data={nameData} headers={nameHeaders} />
        <h4>#4 It should be able to render individual styling on each header</h4>
        <NaiveTable
          className={"test4"}
          data={nameData}
          headers={styledHeaders}
        />
        <h4>#5 It should be able to render individual styling for the table</h4>
        {"TODO"}
        <h4>#6 It should be able to render individual styling for each cell</h4>
        {"TODO"}
        <h4>#7 It should be able to display sortable columns</h4>
        {"TODO"}
        <h4>#8 It should display sorted column data sorted correctly</h4>
        {"TODO"}
        <h4>#9 It should be able to render empty data</h4>
        <NaiveTable className={"test9"} data={[]} />
        <h4>#10 It should be able to render a data of one</h4>
        <NaiveTable className={"test10"} data={[{ of: "one" }]} />
        <h4>#11 You don't have to render any headers at</h4>
        <NaiveTable className={"test11"} data={nameData} headers={false} />
        <h4>#12 You can render a Magic The Gathering card</h4>
        <NaiveTable className={"test11"} data={llanowarData} headers={mtgHeaders} />
      </div>
    );
  }
}
