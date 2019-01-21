import * as React from "react";

interface TableConfigOptions {
  includeIndex?: boolean;
  tableStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}
const tableStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "",
  borderTop: "1px solid black",
  borderRight: "1px solid black"
};
const cellStyle: React.CSSProperties = {
  padding: "8px 4px",
  borderLeft: "1px solid black",
  borderBottom: "1px solid black"
};
const headerStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: "bold"
};
const defaultOptions: TableConfigOptions = {
  includeIndex: false,
  tableStyle,
  headerStyle,
  cellStyle
};

interface DataObj {
  [index: string]: unknown;
}

interface TableConfigHeader {
  // this is the string label for the table header
  label: string;
  // this is the dataKey that is referenced on the data object when displaying this row
  // if set to '' (empty string) the whole data object will be sent to the render function
  dataKey?: string;
  width?: string;
  render?: (data: unknown) => JSX.Element;
}

const defaultRenderFunc = (data: unknown) => <span>{`${data}`}</span>;

const defaultHeaders: TableConfigHeader = {
  dataKey: "",
  label: "",
  width: "1fr",
  render: defaultRenderFunc
};

interface TableConfigProps {
  options?: TableConfigOptions;
  headers?: TableConfigHeader[];
  data: DataObj[];
}

interface TableConfigState {
  options: TableConfigOptions;
  headers: TableConfigHeader[];
  data: DataObj[];
}

type NaiveTableProps = TableConfigProps;

type NaiveTableState = TableConfigState;

const inferHeadersFromData = (data: DataObj[]): TableConfigHeader[] => {
  const paragon = data[0];
  if (paragon) {
    return Object.keys(paragon).map(key => {
      const header: TableConfigHeader = {
        ...defaultHeaders,
        dataKey: key,
        label: key
      };
      return header;
    });
  }
  return [];
};

const headerColumnWidths = (headers: TableConfigHeader[]) =>
  headers.reduce((acc, header) => `${acc} ${header.width} `, "");

class NaiveTable extends React.Component<NaiveTableProps, NaiveTableState> {
  constructor(props: TableConfigProps) {
    super(props);
    // passed in options shadow the default options
    const options = { ...defaultOptions, ...props.options };
    // data must be provided. Otherwise if its falsey, it defaults to empty array (no data)
    const data = props.data || [];
    // if headers are not defined, infer from data keys
    const headers = props.headers ? props.headers : inferHeadersFromData(data);

    this.state = {
      options,
      headers,
      data
    };
  }

  public render() {
    const { options, headers, data } = this.state;
    // the gridStyle is injected into the table dynamically
    const gridTemplateColumns = headerColumnWidths(headers);
    const gridStyle = { ...options.tableStyle, gridTemplateColumns };
    const renderHeader = (header: TableConfigHeader, index: number) => (
      <span key={index} style={options.headerStyle}>
        {header.label}
      </span>
    );
    const renderDataRow = (header: TableConfigHeader) => (
      dataObj: DataObj,
      index: number
    ) => {
      const render = header.render || defaultRenderFunc;
      const dataVal: any = header.dataKey ? dataObj[header.dataKey] : data;
      return (
        <div key={index} style={options.cellStyle}>
          {render(dataVal)}
        </div>
      );
    };

    const renderDataBody = (tableData: DataObj[]) => (
      tableHeader: TableConfigHeader,
      indexr: number
    ) => <div key={indexr}>{tableData.map(renderDataRow(tableHeader))}</div>;

    // todo: sort data if approps
    const renderHeaders = (
      <div style={gridStyle}>{headers.map(renderHeader)}</div>
    );
    const renderBody = (
      <div style={gridStyle}>{headers.map(renderDataBody(data))}</div>
    );
    return (
      <div>
        {renderHeaders}
        {renderBody}
      </div>
    );
  }
}

export default NaiveTable;
