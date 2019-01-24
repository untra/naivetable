import * as React from "react";
const indexDataKey = "'index'";

enum sortDir {
  asc,
  dsc
}

type sortDirection = sortDir | boolean;

const defaultTableStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "",
  borderTop: "1px solid black",
  borderRight: "1px solid black"
};

const arrowascEnabled: React.CSSProperties = {
  width: 0,
  height: 0,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: "5px solid black"
};

const arrowdscEnabled: React.CSSProperties = {
  width: 0,
  height: 0,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: "5px solid #000"
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
  [index: string]: any;
}

interface TableConfigHeader {
  // this is the string label for the table header
  label: string;
  // this is the dataKey that is referenced on the data object when displaying this row
  // if set to '' (empty string) the whole data object will be sent to the render function
  dataKey?: string;
  // a provided width, that defaults to 'auto'
  width?: string;
  // an optional render function, that defaults to a naive rendering function
  render?: (data: any) => JSX.Element;
  // sortability: typed true, false, 'asc' or 'dsc'
  // true - enable the ability to sort this header
  // asc & dsc - sort the header this
  sort?: sortDirection;
}

const defaultRenderFunc = (data: any) => <span>{`${data}`}</span>;

const defaultHeaders: TableConfigHeader = {
  dataKey: "",
  label: "",
  width: "1fr",
  render: defaultRenderFunc,
  sort: false
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
/**
 * The css to render the 'grid' value is calculted here.
 * For example, three default headers should return '1fr 1fr 1fr'
 * @param {TableConfigHeader[]} headers
 */
const headerColumnWidths = (headers: TableConfigHeader[]) =>
  headers.reduce((acc, header) => `${acc} ${header.width} `, "");

class NaiveTable extends React.Component<NaiveTableProps, NaiveTableState> {
  constructor(props: TableConfigProps) {
    super(props);
    // passed in options shadow the default options
    const includeIndex = props.includeIndex || false;
    const cellStyle = { ...defaultCellStyle, ...props.cellStyle };
    const headerStyle = { ...defaultHeaderStyle, ...props.headerStyle };
    const tableStyle = { ...defaultTableStyle, ...props.tableStyle };

    // data must be provided. Otherwise if its falsey, it defaults to empty array (no data)
    // TODO: check that data.length < 1000, and error otherwise
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

    const renderHeader = (header: TableConfigHeader, index: number) => {
      const { sort, label } = header;
      const arrow =
        sort === sortDir.asc
          ? "▼"
          : sort === sortDir.dsc
          ? "▲"
          : sort === true
          ? "⇕"
          : "";
      return (
        <span key={index} style={headerStyle}>
          {label} {arrow}
        </span>
      );
    };
    const renderDataRow = (header: TableConfigHeader) => (
      dataObj: DataObj,
      index: number
    ) => {
      const { dataKey, render } = header;
      // if the user specified a render function, use that
      const renderRow = render || defaultRenderFunc;
      // if a datakey isn't provided
      const dataVal: any = !dataKey
        ? // supply the entire data blob
          data
        : // otherwise if the key is the special 'index' dataKey
        dataKey === indexDataKey
        ? // supply the offset row index
          index + 1
        : // otherwise supply the row data at the given dataKey
          // emphasize: we want return 'undefined' here if undefined
          dataObj[dataKey];
      return (
        <div key={index} style={cellStyle}>
          {renderRow(dataVal)}
        </div>
      );
    };

    const renderSortArrows = (sort: sortDirection = false) => {
      const enabledColor = "8px solid black";
      const disabledColor = "8px solid gray";
      // Intentional misnomer here: borderBottom and borderTop are css properties
      // arrowTop should get borderBottom, and arrowBottom should get borderTop
      const borderBottom = sort === sortDir.asc ? enabledColor : disabledColor;
      const borderTop = sort === sortDir.dsc ? enabledColor : disabledColor;
      const arrowTop = <div style={{ ...arrowascEnabled, borderBottom }} />;
      const arrowBottom = <div style={{ ...arrowascEnabled, borderTop }} />;
      return (
        <span>
          {!!sort ? arrowTop : null}
          {!!sort ? arrowBottom : null}
        </span>
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
