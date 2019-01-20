import React from "react";
import { render } from "react-dom";

import NaiveTable from "./NaiveTable";

const data = [
  {
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
  }
];

class App extends React.Component<{}> {
  constructor(props: object) {
    super(props);
    this.state = {};
  }
  public render() {
    return <NaiveTable data={data} />;
  }
}

render(<App />, document.getElementById("root"));
