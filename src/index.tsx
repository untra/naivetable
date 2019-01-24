import React from "react";
import { render } from "react-dom";

import NaiveTable from "./NaiveTable";

interface DataObj {
  [index: string]: any;
}

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

const data = blamDataRows(["foo", "bar", "baz"], 2000);
const hheaders = [
  {
    label: "foo",
    dataKey: "foo",
    sort: true
  },
  {
    label: "bar",
    dataKey: "bar",
    sort: true
  },
  {
    label: "baz",
    dataKey: "baz",
    sort: true
  }
];

class App extends React.Component<{}> {
  constructor(props: object) {
    super(props);
    this.state = {};
  }
  public render() {
    return <NaiveTable data={data} includeIndex={true} headers={hheaders} />;
  }
}

render(<App />, document.getElementById("root"));
