import * as React from "react";
const indexDataKey = "'index'";

const defaultTableStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "",
  borderTop: "1px solid black",
  borderRight: "1px solid black"
};
const defaultCellStyle: React.CSSProperties = {
  padding: "8px 4px",
  borderLeft: "1px solid black",
  borderBottom: "1px solid black"
};
const defaultHeaderStyle: React.CSSProperties = {
  ...defaultCellStyle,
  fontWeight: "bold"
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
  data: DataObj[];
  headers?: TableConfigHeader[];
  includeIndex?: boolean;
  tableStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

interface TableConfigState {
  data: DataObj[];
  headers: TableConfigHeader[];
  includeIndex: boolean;
  tableStyle: React.CSSProperties;
  headerStyle: React.CSSProperties;
  cellStyle: React.CSSProperties;
}

type NaiveTableProps = TableConfigProps;

type NaiveTableState = TableConfigState;

const indexHeader: TableConfigHeader = {
  dataKey: indexDataKey,
  label: "#",
  width: "auto",
  render: defaultRenderFunc
};

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
    const includeIndex = props.includeIndex || true;
    const cellStyle = { ...defaultCellStyle, ...props.cellStyle };
    const headerStyle = { ...defaultHeaderStyle, ...props.headerStyle };
    const tableStyle = { ...defaultTableStyle, ...props.tableStyle };

    // data must be provided. Otherwise if its falsey, it defaults to empty array (no data)
    const data = props.data || [];
    // if headers are not defined, infer from data keys
    const incIndexHeader: TableConfigHeader[] = includeIndex
      ? [indexHeader]
      : [];
    const incHeaders = props.headers
      ? props.headers
      : inferHeadersFromData(data);
    const headers = [...incIndexHeader, ...incHeaders];

    this.state = {
      headers,
      data,
      includeIndex,
      cellStyle,
      headerStyle,
      tableStyle
    };
  }

  public render() {
    const { headers, data, tableStyle, headerStyle, cellStyle } = this.state;
    // the gridStyle is injected into the table dynamically
    const gridTemplateColumns = headerColumnWidths(headers);
    const gridStyle = { ...tableStyle, gridTemplateColumns };
    const renderHeader = (header: TableConfigHeader, index: number) => (
      <span key={index} style={headerStyle}>
        {header.label}
      </span>
    );
    const renderDataRow = (header: TableConfigHeader) => (
      dataObj: DataObj,
      index: number
    ) => {
      const { dataKey } = header;
      const render = header.render || defaultRenderFunc;
      // if a datakey isn't provided
      const dataVal: any = !dataKey
        ? // supply the entire data blob
          data
        : // otherwise if the key is the special 'index' dataKey
        dataKey === indexDataKey
        ? // supply the offset row index
          index + 1
        : // otherwise supply the row data at the given dataKey
          dataObj[dataKey];
      return (
        <div key={index} style={cellStyle}>
          {render(dataVal)}
        </div>
      );
    };

    const renderDataBody = (tableData: DataObj[]) => (
      tableHeader: TableConfigHeader,
      indexr: number
    ) => <div key={indexr}>{tableData.map(renderDataRow(tableHeader))}</div>;

    const renderBody = (
      <div style={gridStyle}>
        {headers.map(renderHeader)}
        {headers.map(renderDataBody(data))}
      </div>
    );
    return <div>{renderBody}</div>;
  }
}

export default NaiveTable;
