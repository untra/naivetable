import React from "react";
import {
  render
} from "react-dom";

import NaiveTable, {
  sortDir
} from "./NaiveTable";

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

const bigdata = blamDataRows(["foo", "bar", "baz"], 500);
const hheaders = [{
    label: "foo",
    dataKey: "foo",
    width: '3fr'
  },
  {
    label: "bar",
    dataKey: "bar",
    style: { backgroundColor: "pink" }
  },
  {
    label: "baz",
    dataKey: "baz",
    render: (val: number) => <h1>{`${val > 0.5} : ${val}`}</h1>
  }
];
// const data = blamDataRows(["foo", "bar", "baz"], 2000);
const data = [{
    foo: 1,
    bar: 2,
    baz: 3
  },
  {
    foo: 4,
    bar: 5,
    baz: 6
  },
  {
    foo: 7,
    bar: 8,
    baz: 9
  },
  {
    foo: "a",
    bar: "b",
    baz: "c"
  }
];

class App extends React.Component < {} > {
  constructor(props: object) {
    super(props);
    this.state = {};
  }

  public render() {
    return <NaiveTable data = {
      bigdata
    }
    includeIndex = {
      true
    }
    headers = {
      []
    }
    />;
  }
}

render( < App  /> , document.getElementById("root"));