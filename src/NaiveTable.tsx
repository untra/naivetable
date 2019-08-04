import React, { useState } from "react";
const indexDataKey = "'index'";

type compareFn = (a: any, b: any) => number;
type sortDirection = "asc" | "dsc" | boolean | compareFn;

const defaultComparefn: compareFn = (a: any, b: any) => {
  return `${a}`.localeCompare(`${b}`);
};

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
  position: "relative",
  backgroundColor: "lightgray",
  fontWeight: "bold"
};

const cssSortStyle: React.CSSProperties = {
  border: "3px solid black",
  borderWidth: "0 2px 2px 0",
  position: "absolute",
  padding: "5px 3px 3px 5px",
  top: 6,
  right: 6,
  opacity: 0.5
};

const cssSortSelected: React.CSSProperties = {
  opacity: 1.0
}

const cssSortAsc: React.CSSProperties = {
  ...cssSortStyle,
  transform: "rotate(-135deg)"
};

const cssSortDsc: React.CSSProperties = {
  ...cssSortStyle,
  transform: "rotate(45deg)",
  top: 12
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
  headers?: TableConfigHeader[] | false;
  includeIndex?: boolean;
  tableStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  className?: string;
}

interface TableConfigState {
  sortIndex?: number;
  sortDir: "asc" | "dsc";
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
const processSort = (data: DataObj[], headers: TableConfigHeader[], sortDir: "asc" | "dsc", sortIndex: number | undefined) => {
  if (sortIndex === undefined) {
    return data
  }
  const header = headers[sortIndex]
  const { sort, dataKey } = header;
  const comparison = (typeof sort === "function") ? sort : defaultComparefn
  const key = dataKey || "";
  const sortFn = (a: DataObj, b: DataObj): number => {
    if (sortDir === "asc") {
      return comparison(a[key], b[key]);
    }
    else {
      return -comparison(a[key], b[key]);
    }
  };
  return data.sort(sortFn)
};

const inferInitialSort = (headers: TableConfigHeader[]): [("asc" | "dsc")?, number?] => {
  let currentIndex = -1
  const getSort = (header: TableConfigHeader) => (header.sort === true && "asc") || (header.sort === "asc" && "asc") || (header.sort === "dsc" && "dsc") || undefined
  const getIndex = (header: TableConfigHeader) => header.sort ? currentIndex : undefined
  return headers.reduce(([dir, index], header) => {
    currentIndex += 1
    return [dir || getSort(header), index || getIndex(header)]
  }, [undefined as "asc" | "dsc" | undefined, undefined as number | undefined])
}

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
  const [sortDirr, sortIndex] = inferInitialSort(headers)
  const sortDir = sortDirr || "asc"
  return {
    headers,
    includeIndex,
    cellStyle,
    tableStyle,
    sortDir,
    sortIndex
  };
};

/**
 * NaiveTable - a dumb simple naive React data table component
 * @param {NaiveTableProps} props
 * @returns
 */
export const NaiveTable: React.FC<NaiveTableProps> = (
  props: NaiveTableProps
) => {
  const initState = buildInititalState(props);
  // whether the headers should be rendered at all
  const shouldRenderHeaders = props.headers === false ? false : true
  // whether the data rows should be rendered
  const shouldRenderDatarows = true
  // useState hook - rule of thumb is to call the useState hook early and once during execution
  const [state, setState] = useState(initState);
  // destructure the properties from state
  const { headers, tableStyle, cellStyle, sortIndex, sortDir } = state;
  // infers the grid widths of the headers (even if not rendering headers we need this)
  const gridTemplateColumns = headerColumnWidths(headers);
  // the gridStyle is injected into the table dynamically
  const gridStyle = { ...tableStyle, gridTemplateColumns };
  // renderHeader will create a <span> for the given header at the designated index
  const renderHeader = (header: TableConfigHeader, index: number) => {
    const { sort, label, style } = header;
    const headerStyle = { ...defaultHeaderStyle, ...cellStyle, ...style };
    const indexSelected = sortIndex === index
    const cssSortSelectedAsc = indexSelected && sortDir === "dsc" ? cssSortSelected : {}
    const cssSortSelectedDsc = indexSelected && sortDir === "asc" ? cssSortSelected : {}
    const upArrow =
      sort ? (
        <i style={{...cssSortAsc, ...cssSortSelectedAsc}} />
      ) : null
    const downArrow =
      sort ? (
        <i style={{...cssSortDsc, ...cssSortSelectedDsc}} />
      ) : null
    // change creates the function called when a header sort is toggled
    const change = (index: number) => () => {
      const dir = (sortIndex === index && sortDir === "asc") ? "dsc" : "asc"
      setState({ ...state, headers, sortIndex: index, sortDir: dir });
    };
    // if sort is not enabled, clicking should noop, else invoke change
    const onClick = !sort ? () => null : change(index);
    // here is the assembled header rendering
    return (
      <span key={index} style={headerStyle} onClick={onClick}>
        {label} {upArrow} {downArrow}
      </span>
    );
  };
  // renderDataRow will create the <span> with the given data at the designated index,
  // using the provided header
  const renderDataRow = (dataObj: DataObj, rowIndex: number) => (
    header: TableConfigHeader,
    index: number
  ) => {
    const { dataKey, render } = header;
    // if a data render function was specified, use that
    const renderCell = render || defaultRenderFunc;
    // if a datakey isn't provided
    const dataVal: any = !dataKey
      ? // supply the current row dataObject
      dataObj
      : // otherwise if the key is the special 'index' dataKey
      dataKey === indexDataKey
        ? // supply the offset row index
        rowIndex + 1
        : // otherwise supply the row data at the given dataKey
        // emphasize: we do want return 'undefined' here if undefined
        dataObj[dataKey];
    return (
      <span key={index} style={cellStyle}>
        {/* extra spacing after rendering the cell */}
        {renderCell(dataVal)}{" "}
      </span>
    );
  };

  const renderDataRows = (tableHeaders: TableConfigHeader[]) => (
    tableData: DataObj,
    indexr: number
  ) => tableHeaders.map(renderDataRow(tableData, indexr));

  const renderedHeaders = shouldRenderHeaders ? headers.map(renderHeader) : null
  const renderedRows = shouldRenderDatarows ? processSort(props.data, headers, sortDir, sortIndex).map(renderDataRows(headers)) : null

  return (
    <div className={props.className || ""} style={gridStyle}>
      {renderedHeaders}
      {renderedRows}
    </div>
  );
};
