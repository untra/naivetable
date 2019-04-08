import { DataObj, NaiveTable } from "@untra/naivetable";
import React from "react";
const version = "0.0.9"

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
export default class Home extends React.Component {
    public render() {
      return (
        <div className="page-content">
          <div className="wrapper">
            <h1>🍱 NaiveTable</h1>
            <h2>dumb simple naive <a href="https://reactjs.org/">React</a> {`Array<T>`} data tables</h2>
            <span>
              <h3>v{version} - <a href="https://naivetable.untra.io/docs">Documentation</a> - <a href="https://github.com/untra/naivetable">Github</a> - <a href="https://www.npmjs.com/package/@untra/naivetable">NPM</a></h3>
            </span>
            <pre className="highlight">
            <code>{`
  const data = [${JSON.stringify(randomData[0])}...]
  ...
  <NaiveTable data={data} includeIndex={true} />
            `}</code>
            </pre>
            <NaiveTable data={randomData} includeIndex={true} />
          </div>
        </div>
      );
    }
  }