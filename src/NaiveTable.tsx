import React, { useState } from "react";
const indexDataKey = "'index'";

/**
 * sortDir - which direction the table should sort in
 * @export
 * @enum {string}
 */
export enum sortDir {
  asc = "asc",
  dsc = "dsc"
}
type compareFn = ((a: any, b: any) => number)
type sortDirection = sortDir | boolean | compareFn ;

const defaultComparefn : compareFn = (a: any, b: any) => {
  return `${a}`.localeCompare(`${b}`)
}

const defaultTableStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "",
  borderTop: "1px solid black",
  borderRight: "1px solid black",
  borderLeft: "1px solid black",
  borderBottom: "1px solid black"
};

const defaultCellStyle: React.CSSProperties = {
  padding: "8px 4px",
  borderBottom: "1px solid black",
  borderTop: "1px solid black"
};

const defaultHeaderStyle: React.CSSProperties = {
  backgroundColor: "rgb(220,220,220)",
  fontWeight: "bold"
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

/**
 * DataObj - any object that is string indexed.
 * @export
 * @interface DataObj
 */
export interface DataObj {
  [index: string]: any;
}

/**
 * TableConfigHeader - proprties of a NaiveTable header
 * @export
 * @interface TableConfigHeader
 */
export interface TableConfigHeader {
  // this is the string label for the table header
  label: string;
  // this is the dataKey that is referenced on the data object when displaying this row
  // if set to '' (empty string) the whole data object will be sent to the render function
  dataKey?: string;
  // a provided width, that defaults to 'auto'
  width?: string;
  // an optional render function, that defaults to a naive rendering function
  render?: (data: any) => JSX.Element | string;
  // sortability: typed true, false, 'asc' or 'dsc'
  // true - enable the ability to sort this header
  // asc & dsc - sort the header this
  sort?: sortDirection;
  // style: any specific styling that should be used when rendering the header
  style?: React.CSSProperties;
}

const defaultRenderFunc = (data: any) => <span>{`${data}`}</span>;

const defaultHeaders: TableConfigHeader = {
  dataKey: "",
  label: "",
  width: "auto",
  render: defaultRenderFunc,
  sort: false
};

/**
 * TableConfigProps - properties of a NaiveTable Component.
 * Only data is required.
 * @export
 * @interface TableConfigProps
 */
export interface TableConfigProps {
  data: DataObj[];
  headers?: TableConfigHeader[];
  includeIndex?: boolean;
  tableStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

interface TableConfigState {
  sortedData: DataObj[];
  sortIndex?: number
  sortDir?: sortDir
  headers: TableConfigHeader[];
  includeIndex: boolean;
  tableStyle: React.CSSProperties;
  cellStyle: React.CSSProperties;
}

export type NaiveTableProps = TableConfigProps;

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

// processSort will sort provided data according to the provided headers
const processSort = (data: DataObj[], headers: TableConfigHeader[]) => {
  const sortFn = (acc: DataObj[], header: TableConfigHeader): DataObj[] => {
    const { sort, dataKey } = header;
    const key = dataKey || ''
    if (sort === sortDir.asc) {
      return acc.sort((a,b) => defaultComparefn(a[key] , b[key]));
    }
    if (sort === sortDir.dsc) {
      return acc.sort((a,b) => -defaultComparefn(a[key] , b[key]));
    }
    if(typeof sort === 'function' ){
      return acc.sort((a,b) => sort(a,b))
    }
    return acc;
  };
  return headers.reduce(sortFn, data);
};

/**
 * Creates the initial NaiveTable state from the initial props
 * @param {NaiveTableProps} props
 * @returns {TableConfigState}
 */
const buildInititalState = (props: NaiveTableProps): TableConfigState => {
  // passed in options shadow the default options
  const includeIndex = props.includeIndex || false;
  const cellStyle = { ...defaultCellStyle, ...props.cellStyle };
  const tableStyle = { ...defaultTableStyle, ...props.tableStyle };
  // data must be provided. Otherwise if its falsey, it defaults to empty array (no data)
  // TODO: check that data.length < 1000, and error otherwise
  const data = props.data || [];
  // if headers are not defined, infer from data keys
  const incIndexHeader: TableConfigHeader[] = includeIndex ? [indexHeader] : [];
  const incHeaders = props.headers ? props.headers : inferHeadersFromData(data);
  const headers = [...incIndexHeader, ...incHeaders];
  const sortedData = processSort(data, headers)
  return {
    headers,
    sortedData,
    includeIndex,
    cellStyle,
    tableStyle
  };
};


/**
 * NaiveTable
 * @param {NaiveTableProps} props
 * @returns
 */
export function NaiveTable(props: NaiveTableProps) {
  const initState = buildInititalState(props);
  // useState hook
  const [state, setState] = useState(initState);
  // destructure from state
  const { headers, sortedData, tableStyle, cellStyle } = state;
  // the gridStyle is injected into the table dynamically
  const gridTemplateColumns = headerColumnWidths(headers);
  const gridStyle = { ...tableStyle, gridTemplateColumns };
  // toggleHeader will sort the data by the header sort at the given index
  const toggleHeader = (index: number) => {
    const updatedHeaders = [...headers];
    const toggledHeader = updatedHeaders[index];
    const sortedDirection = toggledHeader.sort;
    const sort = sortedDirection === sortDir.asc ? sortDir.dsc : sortDir.asc;
    const updatedHeader = { ...toggledHeader, sort };
    updatedHeaders[index] = updatedHeader;
    return updatedHeaders;
  };
  // renderHeader will render the given header at the designated index
  const renderHeader = (header: TableConfigHeader, index: number) => {
    const { sort, label, style } = header;
    const headerStyle = { ...defaultHeaderStyle, ...cellStyle, ...style };
    const arrow =
      sort === sortDir.asc ? (
        <i style={cssSortAsc} />
      ) : sort === sortDir.dsc ? (
        <i style={cssSortDsc} />
      ) : sort === true ? (
        <i style={cssSortable} />
      ) : null;
    // change creates the function called when a header sort is toggled
    const change = (index: number) => () => {
      const headers = toggleHeader(index);
      setState({ ...state, headers });
    };
    // if sort is not enabled, clicking should noop, else invoke change
    const onClick = !sort ? () => null : change(index);
    // here is the assembled header rendering
    return (
      <span key={index} style={headerStyle} onClick={onClick}>
        {label} {arrow}
      </span>
    );
  };
  // renderDataRow will render the given data at the designated index
  const renderDataRow = (dataObj: DataObj, indexr: number) => (
    header: TableConfigHeader,
    index: number
  ) => {
    const { dataKey, render } = header;
    // if the user specified a render function, use that
    const renderRow = render || defaultRenderFunc;
    // if a datakey isn't provided
    const dataVal: any = !dataKey
      ? // supply the current row dataObject
        dataObj
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
  // this our rendered data
  const renderTable = (
    <div style={gridStyle}>
      {headers.map(renderHeader)}
      {sortedData.map(renderDataRows(headers))}
    </div>
  );
  return <div>{renderTable}</div>;
}
