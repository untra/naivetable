import * as _ from "lodash";
import * as React from "react";
const indexDataKey = "'index'";

export enum sortDir {
  asc = "asc",
  dsc = "dsc"
}

type sortDirection = sortDir | boolean;

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

const cssSortStyle: React.CSSProperties = {
  border: "solid black",
  borderWidth: "0 3px 3px 0",
  display: "inline-block",
  padding: "3px",
  float: "right"
};

const cssSortAsc: React.CSSProperties = {
  ...cssSortStyle,
  transform: "rotate(-135deg)"
};

const cssSortDsc: React.CSSProperties = {
  ...cssSortStyle,
  transform: "rotate(45deg)"
};

const cssSortable: React.CSSProperties = {
  ...cssSortStyle,
  borderWidth: "0px 3px 0px 0px",
  padding: "12px"
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
  sortedData?: DataObj[];
  headers?: TableConfigHeader[];
  includeIndex?: boolean;
  tableStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

interface TableConfigState {
  data: DataObj[];
  headers: TableConfigHeader[];
  includeIndex: boolean;
  tableStyle: React.CSSProperties;
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
  headers.reduce((acc, header) => `${acc} ${header.width || "auto"} `, "");

class NaiveTable extends React.Component<NaiveTableProps, NaiveTableState> {
  constructor(props: TableConfigProps) {
    super(props);
    // passed in options shadow the default options
    const includeIndex = props.includeIndex || false;
    const cellStyle = { ...defaultCellStyle, ...props.cellStyle };
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
      tableStyle
    };
  }

  public render() {
    const processSort = (data: DataObj[], headers: TableConfigHeader[]) => {
      const sortFn = (acc: DataObj[], header: TableConfigHeader): DataObj[] => {
        const { sort, dataKey } = header;
        if (sort === sortDir.asc) {
          return _.sortBy(acc, [dataKey || ""]);
        }
        if (sort === sortDir.dsc) {
          return _.sortBy(acc, [dataKey || ""]);
        }
        return acc;
      };
      return headers.reduce(sortFn, data);
    };
    const { headers, data, tableStyle, cellStyle } = this.state;
    // the gridStyle is injected into the table dynamically
    const gridTemplateColumns = headerColumnWidths(headers);
    const gridStyle = { ...tableStyle, gridTemplateColumns };

    const renderHeader = (header: TableConfigHeader, index: number) => {
      const { sort, label } = header;
      const arrow =
        sort === sortDir.asc ? (
          <i style={cssSortAsc} />
        ) : sort === sortDir.dsc ? (
          <i style={cssSortDsc} />
        ) : sort === true ? (
          <i style={cssSortable} />
        ) : null;
      return (
        <span key={index} style={cellStyle}>
          {label} {arrow}
        </span>
      );
    };

    const renderDataRow = (dataObj: DataObj, indexr: number) => (
      header: TableConfigHeader,
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
          indexr + 1
        : // otherwise supply the row data at the given dataKey
          // emphasize: we want return 'undefined' here if undefined
          dataObj[dataKey];
      return (
        <span key={index} style={cellStyle}>
          {renderRow(dataVal)}
        </span>
      );
    };

    const renderDataRows = (tableHeaders: TableConfigHeader[]) => (
      tableData: DataObj,
      indexr: number
    ) => tableHeaders.map(renderDataRow(tableData, indexr));

    const sortedData = processSort(data, headers);
    console.log("render");
    const renderTable = (
      <div style={gridStyle}>
        {headers.map(renderHeader)}
        {sortedData.map(renderDataRows(headers))}
      </div>
    );
    return <div>{renderTable}</div>;
  }
}

export default NaiveTable;
