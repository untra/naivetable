import React from "react";
import { render } from "react-dom";

import { NaiveTable } from "naive-table";
import "react-table/react-table.css";

interface TableConfigOptions {}

interface TableConfigHeaders {}

interface TableConfigSettings {
  options: TableConfigOptions;
  headers: TableConfigHeaders;
}

type AppProps = TableConfigSettings;

class App extends React.Component<AppProps> {
  constructor(props: TableConfigSettings) {
    super(props);
    this.state = {
      data: makeData()
    };
  }
  public render() {
    return <span>fdsafdsafsda</span>;
  }
}

render(<NaiveTable />, document.getElementById("root"));
