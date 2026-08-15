import React from "react";
// tslint:disable-next-line: no-implicit-dependencies
import Highlight from "react-highlight";
// tslint:disable-next-line: no-implicit-dependencies
import { Link } from "react-router-dom";
import packageJSON from '../../package.json'
import wwords from "../content/home-content.json";
import { DataObj, NaiveTable } from "../NaiveTable";
const words: { [index: string]: { [index: string]: string } } = wwords

type SupportedLangs = keyof typeof words;
const version = packageJSON.version

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
  private readonly randomFilenames = ['copy', 'new-hot-startup', 'foobarbaz', 'blockchainz', 'stuff', 'wack-wack-wack', '1']
  private randomFilename = this.randomFilenames[0]
  constructor(props: HomeScreenProps) {
    super(props);
    const rand = Math.floor(Math.random() * this.randomFilenames.length)
    this.randomFilename = this.randomFilenames[rand] || this.randomFilename
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
          <h1><span role="img" aria-label="Bento">🍱</span> NaiveTable</h1>
          <h2>
            a dumb, simple, naive {`Array<T>`} data table component for{" "}
            <a href="https://reactjs.org/">React</a> <a href="https://reactjs.org/docs/hooks-intro.html/">(Hooks)</a></h2>

          <span>
            <h3>
              v{version} -{" "}
              <Link to="/test">Tests</Link>-{" "}
              <a href="https://github.com/untra/naivetable">Github</a> -{" "}
              <a href="https://www.npmjs.com/package/@untra/naivetable">NPM</a> -{" "}
              <a href="https://dashboard.cypress.io/#/projects/wrytfx/runs">Cypress</a> -{" "}
              <a href="https://naiveparallel.untra.io">
                <span role="img" aria-label="Razor">🪒</span> NaiveParallel
              </a>
            </h3>
          </span>
          <hr />
          <div style={{
            padding: '50px',
            color: '#454545',
            textAlign: 'center'
          }}>
            <h4>
              <strong>NaiveTable</strong> {W("i1")} <br />{"(typescript type "}
              <code>{"Array<T> of {[index: string]: any}"}</code>
              {")"}<br />


              {W("i2a")}
              <code>{" Array<T> "}</code>
              {W("i2b")}<br />
              {W("i2c")}<br/><br/>
              <code>{`<NaiveTable data={data} />`}</code>
            </h4>
          </div>
          <Highlight className="tsx">{
            `// react-app-${this.randomFilename}.tsx
import React from "react";
import { NaiveTable } from "@untra/naivetable";
// ${W("h0a")}
const data = [${JSON.stringify(randomData[0], null, 2)}, ...];
// ${W("h0b")}
<NaiveTable data={data} />`}
          </Highlight>
          <NaiveTable data={randomData} />
          <p>
            Need the same data as a chart instead of a table? Try{" "}
            <a href="https://naiveparallel.untra.io">
              <span role="img" aria-label="Razor">🪒</span> naiveparallel
            </a>.
          </p>
        </div>
      </div>
    );
  }
}
