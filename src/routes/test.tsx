/***
 * Naivetable Tests
 * MIT License
 * Made with 💙 by @untra
 * ---
 * tslint:disable-next-line: no-implicit-dependencies
 */
import React from "react";
import varietyofDataTypesData from "../content/varietyOfTypesData.json"
// import { NaiveTable, TableConfigHeader } from "@untra/naivetable"
import { NaiveTable, TableConfigHeader } from "../NaiveTable";

// Hi friend, thanks for reading my naivetable tests!
// maybe you're on this github page?
const thisGithubPage =
  "https://github.com/untra/naivetable/blob/master/src/routes/test.tsx";
// if you are, then I want to know you are a talented and skilled engineer,
// and it would certainly be a pleasure to shake your hand one day,
// and tell you personally _just how cool you are_

// as part of reading this, you may also want to check out that cypress page:
const thatCypressPage = "https://dashboard.cypress.io/#/projects/wrytfx/runs";

const nameData = [
  { a: "alex", b: 12, c: 82.56 },
  { a: "brock", b: 17, c: 93.33 },
  { a: "charlie", b: 16, c: 48.65 }
];

const nameHeaders = [
  // change the rendered header text with the 'label' parameter
  { label: "name", dataKey: "a" },
  // individually style each header cell with the 'style' parameter
  { label: "age", dataKey: "b", style: { backgroundColor: "pink" } },
  // provide a 'render' function to control how dataCells render for the column
  {
    label: "grade status",
    dataKey: "c",
    render: (val: number) => (
      <h2>{`${val > 50 ? "✅passing" : "❌failing"} the class`}</h2>
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
const styledHeaders: TableConfigHeader[] = [
  { label: "name", dataKey: "a", style: { backgroundColor: "red" } },
  { label: "age", dataKey: "b", style: { backgroundColor: "green" } },
  { label: "mana", dataKey: "c", style: { backgroundColor: "blue" } },
  {
    label: "missing",
    dataKey: "",
    style: { backgroundColor: "yellow", opacity: 0.5 }
  },
  {
    label: "stretch index",
    dataKey: "'index'",
    style: {
      backgroundColor: "red",
      transform: "scale(2, 0.5)",
      color: "white"
    }
  },
  {
    label: "flip index",
    dataKey: "'index'",
    style: {
      backgroundColor: "yellow",
      transform: "rotate(0.5turn)",
      color: "white"
    }
  },
  {
    label: "skew index",
    dataKey: "'index'",
    style: {
      backgroundColor: "green",
      transform: "skew(30deg, 20deg)",
      color: "white"
    }
  },
  {
    label: "shift index",
    dataKey: "'index'",
    style: {
      backgroundColor: "cyan",
      transform: "translate(120px, 50%)",
      color: "black"
    }
  },
  {
    label: "keanu index",
    dataKey: "'index'",
    style: {
      backgroundColor: "blue",
      transform: "matrix(1, 2, 3, 4, 5, 6)",
      color: "black"
    }
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
          View this page and tests at <a href={thisGithubPage}>Github.com</a>{" "}
          and view the test results at <a href={thatCypressPage}>Cypress.io</a>
        </h3>
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
          It should be able to render a variety of different javascript data
          types
        </h4>
        <NaiveTable className={'test1'} data={varietyofDataTypesData} />
        <h4>It should be able to render an index left adjacent of the data</h4>
        <NaiveTable className={'test2'} data={nameData} includeIndex={true} />
        <h4>It should be able to render a table with custom headers</h4>
        <NaiveTable className={'test3'} data={nameData} headers={nameHeaders} />
        <h4>It should be able to render individual styling on each header</h4>
        <NaiveTable className={'test4'} data={nameData} headers={styledHeaders} />
        <h4>It should be able to render individual styling for the table</h4>
        {"TODO"}
        <h4>It should be able to render individual styling for each cell</h4>
        {"TODO"}
        <h4>It should be able to display sortable columns</h4>
        {"TODO"}
        <h4>It should display sorted column data sorted correctly</h4>
        {"TODO"}
        <h4>It should be able to render empty data</h4>
        <NaiveTable className={'test5'} data={[]} />
        <h4>It should be able to render a data of one</h4>
        <NaiveTable className={'test6'} data={[{ of: "one" }]} />
      </div>
    );
  }
}
