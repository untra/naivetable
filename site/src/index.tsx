import { DataObj, NaiveTable, NaiveTableProps } from "@untra/naivetable";
import React from "react";
import { render } from "react-dom";

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

const bigdata = blamDataRows(["foo", "bar", "baz"], 10);

class App extends React.Component {
  constructor(props: NaiveTableProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <div>
        <h1>NaiveTable</h1>
        <h2>{`Dumb Simple Naive React Array<T> Table`}</h2>
        <span>Click to view the <a href="https://naivetable.untra.io/docs">docs</a></span>
        <NaiveTable data={bigdata} includeIndex={true} />
    </div>
  }
}

render(<App />, document.getElementById("root"));
