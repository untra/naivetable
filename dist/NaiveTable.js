"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const indexDataKey = "'index'";
/**
 * sortDir - which direction the table should sort in
 * @export
 * @enum {string}
 */
var sortDir;
(function (sortDir) {
    sortDir["asc"] = "asc";
    sortDir["dsc"] = "dsc";
})(sortDir = exports.sortDir || (exports.sortDir = {}));
const defaultTableStyle = {
    display: "grid",
    gridTemplateColumns: "",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black"
};
const defaultCellStyle = {
    padding: "8px 4px",
    borderBottom: "1px solid black",
    borderTop: "1px solid black"
};
const defaultHeaderStyle = {
    backgroundColor: "rgb(220,220,220)",
    fontWeight: "bold"
};
const cssSortStyle = {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    float: "right"
};
const cssSortAsc = Object.assign({}, cssSortStyle, { transform: "rotate(-135deg)" });
const cssSortDsc = Object.assign({}, cssSortStyle, { transform: "rotate(45deg)" });
const cssSortable = Object.assign({}, cssSortStyle, { borderWidth: "0px 3px 0px 0px", padding: "12px" });
const defaultRenderFunc = (data) => react_1.default.createElement("span", null, `${data}`);
const defaultHeaders = {
    dataKey: "",
    label: "",
    width: "auto",
    render: defaultRenderFunc,
    sort: false
};
const indexHeader = {
    dataKey: indexDataKey,
    label: "#",
    width: "auto",
    render: defaultRenderFunc
};
const inferHeadersFromData = (data) => {
    const paragon = data[0];
    if (paragon) {
        return Object.keys(paragon).map(key => {
            const header = Object.assign({}, defaultHeaders, { dataKey: key, label: key });
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
const headerColumnWidths = (headers) => headers.reduce((acc, header) => `${acc} ${header.width || "auto"} `, "");
/**
 * Creates the initial NaiveTable state from the initial props
 * @param {NaiveTableProps} props
 * @returns {TableConfigState}
 */
const buildInititalState = (props) => {
    // passed in options shadow the default options
    const includeIndex = props.includeIndex || false;
    const cellStyle = Object.assign({}, defaultCellStyle, props.cellStyle);
    const tableStyle = Object.assign({}, defaultTableStyle, props.tableStyle);
    // data must be provided. Otherwise if its falsey, it defaults to empty array (no data)
    // TODO: check that data.length < 1000, and error otherwise
    const data = props.data || [];
    // if headers are not defined, infer from data keys
    const incIndexHeader = includeIndex ? [indexHeader] : [];
    const incHeaders = props.headers ? props.headers : inferHeadersFromData(data);
    const headers = [...incIndexHeader, ...incHeaders];
    return {
        headers,
        data,
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
function NaiveTable(props) {
    const initState = buildInititalState(props);
    const [state, setState] = react_1.useState(initState);
    // processSort will sort provided data according to the provided headers
    const processSort = (data, headers) => {
        const sortFn = (acc, header) => {
            const { sort, dataKey } = header;
            const key = dataKey || '';
            if (sort === sortDir.asc) {
                return acc.sort((a, b) => (a[key] > b[key] ? 1 : -1));
            }
            if (sort === sortDir.dsc) {
                return acc.sort((a, b) => (a[key] < b[key] ? 1 : -1));
            }
            return acc;
        };
        return headers.reduce(sortFn, data);
    };
    const { headers, data, tableStyle, cellStyle } = state;
    // the gridStyle is injected into the table dynamically
    const gridTemplateColumns = headerColumnWidths(headers);
    const gridStyle = Object.assign({}, tableStyle, { gridTemplateColumns });
    // toggleHeader will sort the data by the header sort at the given index
    const toggleHeader = (index) => {
        const updatedHeaders = [...headers];
        const toggledHeader = updatedHeaders[index];
        const sortedDirection = toggledHeader.sort;
        const sort = sortedDirection === sortDir.asc ? sortDir.dsc : sortDir.asc;
        const updatedHeader = Object.assign({}, toggledHeader, { sort });
        updatedHeaders[index] = updatedHeader;
        return updatedHeaders;
    };
    // renderHeader will render the given header at the designated index
    const renderHeader = (header, index) => {
        const { sort, label, style } = header;
        const headerStyle = Object.assign({}, defaultHeaderStyle, cellStyle, style);
        const arrow = sort === sortDir.asc ? (react_1.default.createElement("i", { style: cssSortAsc })) : sort === sortDir.dsc ? (react_1.default.createElement("i", { style: cssSortDsc })) : sort === true ? (react_1.default.createElement("i", { style: cssSortable })) : null;
        // change creates the function called when a header sort is toggled
        const change = (index) => () => {
            const headers = toggleHeader(index);
            setState(Object.assign({}, state, { headers }));
        };
        // if sort is not enabled, clicking should noop, else invoke change
        const onClick = !sort ? () => null : change(index);
        // here is the assembled header rendering
        return (react_1.default.createElement("span", { key: index, style: headerStyle, onClick: onClick },
            label,
            " ",
            arrow));
    };
    // renderDataRow will render the given data at the designated index
    const renderDataRow = (dataObj, indexr) => (header, index) => {
        const { dataKey, render } = header;
        // if the user specified a render function, use that
        const renderRow = render || defaultRenderFunc;
        // if a datakey isn't provided
        const dataVal = !dataKey
            ? // supply the entire data blob
                data
            : // otherwise if the key is the special 'index' dataKey
                dataKey === indexDataKey
                    ? // supply the offset row index
                        indexr + 1
                    : // otherwise supply the row data at the given dataKey
                        // emphasize: we want return 'undefined' here if undefined
                        dataObj[dataKey];
        return (react_1.default.createElement("span", { key: index, style: cellStyle }, renderRow(dataVal)));
    };
    const renderDataRows = (tableHeaders) => (tableData, indexr) => tableHeaders.map(renderDataRow(tableData, indexr));
    // JIT before we render anything at all we sort our data
    const sortedData = processSort(data, headers);
    // this our rendered data
    const renderTable = (react_1.default.createElement("div", { style: gridStyle },
        headers.map(renderHeader),
        sortedData.map(renderDataRows(headers))));
    return react_1.default.createElement("div", null, renderTable);
}
exports.NaiveTable = NaiveTable;
