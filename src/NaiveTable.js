"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const indexDataKey = "'index'";
const defaultTableStyle = {
    display: "grid",
    gridTemplateColumns: "",
    borderTop: "1px solid black",
    borderRight: "1px solid black"
};
const defaultCellStyle = {
    padding: "8px 4px",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black"
};
const defaultRenderFunc = (data) => React.createElement("span", null, `${data}`);
const defaultHeaders = {
    dataKey: "",
    label: "",
    width: "1fr",
    render: defaultRenderFunc
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
 * For example, three headers
 *
 * @param {TableConfigHeader[]} headers
 */
const headerColumnWidths = (headers) => headers.reduce((acc, header) => `${acc} ${header.width} `, "");
class NaiveTable extends React.Component {
    constructor(props) {
        super(props);
        // passed in options shadow the default options
        const includeIndex = props.includeIndex || false;
        const cellStyle = Object.assign({}, defaultCellStyle, props.cellStyle);
        const tableStyle = Object.assign({}, defaultTableStyle, props.tableStyle);
        // data must be provided. Otherwise if its falsey, it defaults to empty array (no data)
        const data = props.data || [];
        // if headers are not defined, infer from data keys
        const incIndexHeader = includeIndex
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
    render() {
        const { headers, data, tableStyle, cellStyle } = this.state;
        // the gridStyle is injected into the table dynamically
        const gridTemplateColumns = headerColumnWidths(headers);
        const gridStyle = Object.assign({}, tableStyle, { gridTemplateColumns });
        const renderHeader = (header, index) => (React.createElement("span", { key: index, style: cellStyle },
            React.createElement("strong", null, header.label)));
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
            return (React.createElement("span", { key: index, style: cellStyle }, renderRow(dataVal)));
        };
        const renderDataRows = (tableHeaders) => (tableData, indexr) => {
            return tableHeaders.map(renderDataRow(tableData, indexr));
        };
        const renderBody = (React.createElement("div", { style: gridStyle },
            headers.map(renderHeader),
            data.map(renderDataRows(headers))));
        return React.createElement("div", null, renderBody);
    }
}
exports.default = NaiveTable;
