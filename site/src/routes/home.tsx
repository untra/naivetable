import { NaiveTable, DataObj } from "@untra/naivetable";
import React from "react";
import Highlight from "react-highlight";
import { Link } from "react-router-dom";
import words from "../content/home-content.json";

type SupportedLangs = keyof typeof words;
const version = "0.0.9h";

const blamDataRows = (headers: string[], nToGen: number) => {
  let rows: DataObj[] = [];
  for (let index = 0; index < nToGen; index++) {
    const row: DataObj = {};
    headers.forEach(header => {
      row[header] = Math.random();
    });
    rows = [...rows, row];
  }
  return rows;
};

const randomData = blamDataRows(["foo", "bar", "baz"], 5);
// These are the supported languages
const DEFAULT_LANG = "en";
interface HomeScreenProps {
  lang: SupportedLangs;
}

export default class Home extends React.Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props);
    const { lang } = props;
  }

  public render() {
    // this is the word render function
    // it will display the text content in the given language or in english
    // the red X means there is missing text content
    const W = (input: string) => {
      const display = words[DEFAULT_LANG][input] || "";
      return `${display}` || "❌";
      // return this.theseWords[input] || this.defaultWords[input] || "❌";
    };
    return (
      <div className="page-content">
        <div className="wrapper">
          <h1>🍱 NaiveTable</h1>
          <h2>
            {W("w1")} {W("w2")} {W("w3")}{" "}
            <a href="https://reactjs.org/">React</a> {`Array<T>`} {W("w7")}
            {W("w4")}
          </h2>

          <span>
            <h4>
              v{version} -{" "}
              <a href="https://naivetable.untra.io/docs">Documentation</a> -{" "}
              <Link to="/test">Tests</Link>-{" "}
              <a href="https://github.com/untra/naivetable">Github</a> -{" "}
              <a href="https://www.npmjs.com/package/@untra/naivetable">NPM</a>
            </h4>
          </span>
          <hr />
          <div>
            <strong>NaiveTable</strong> {W("i1")} {"(typescript type "}
            <code>{"Array<T> of {[index: string]: any}"}</code>
            {")."}
          </div>
          <div>
            {W("i2a")}
            <code>{" Array<T> "}</code>
            {W("i2b")}
          </div>
          <Highlight className="tsx">{`const data = [${JSON.stringify(randomData[0], null, 2)}]
// ${W("h0")}
<NaiveTable data={data} />`}
          </Highlight>
          <NaiveTable data={randomData} />
        </div>
      </div>
    );
  }
}
