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
const tableStyle = {
    display: "grid",
    gridTemplateColumns: "",
    borderTop: "1px solid black",
    borderRight: "1px solid black"
};
const cellStyle = {
    padding: "8px 4px",
    borderLeft: "1px solid black",
    borderBottom: "1px solid black"
};
const headerStyle = Object.assign({}, cellStyle, { fontWeight: "bold" });
const defaultOptions = {
    includeIndex: false,
    tableStyle,
    headerStyle,
    cellStyle
};
const defaultRenderFunc = (data) => React.createElement("span", null, `${data}`);
const defaultHeaders = {
    dataKey: "",
    label: "",
    width: "1fr",
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
const headerColumnWidths = (headers) => headers.reduce((acc, header) => `${acc} ${header.width} `, "");
class NaiveTable extends React.Component {
    constructor(props) {
        super(props);
        // passed in options shadow the default options
        const options = Object.assign({}, defaultOptions, props.options);
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
    render() {
        const { options, headers, data } = this.state;
        // the gridStyle is injected into the table dynamically
        const gridTemplateColumns = headerColumnWidths(headers);
        const gridStyle = Object.assign({}, options.tableStyle, { gridTemplateColumns });
        const renderHeader = (header, index) => (React.createElement("span", { key: index, style: options.headerStyle }, header.label));
        const renderDataRow = (header) => (dataObj, index) => {
            const render = header.render || defaultRenderFunc;
            const dataVal = header.dataKey ? dataObj[header.dataKey] : data;
            return (React.createElement("div", { key: index, style: options.cellStyle }, render(dataVal)));
        };
        const renderDataBody = (tableData) => (tableHeader, indexr) => React.createElement("div", { key: indexr }, tableData.map(renderDataRow(tableHeader)));
        // todo: sort data if approps
        const renderHeaders = (React.createElement("div", { style: gridStyle }, headers.map(renderHeader)));
        const renderBody = (React.createElement("div", { style: gridStyle }, headers.map(renderDataBody(data))));
        return (React.createElement("div", null,
            renderHeaders,
            renderBody));
    }
}
exports.default = NaiveTable;
