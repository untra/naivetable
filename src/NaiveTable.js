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
const defaultOptions = { sizing: "grid" };
const defaultStyle = {
    backgroundColor: "#eee",
    color: "#111"
};
const defaultRenderFunc = (data, styles) => (React.createElement("p", { style: styles }, `${data}`));
const defaultHeaders = {
    dataKey: "",
    label: "",
    render: defaultRenderFunc,
    style: defaultStyle
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
        const renderHeader = (header, index) => (React.createElement("div", { key: index }, header.label));
        const renderDataRow = (dataObj) => (header, index) => {
            const render = header.render || defaultRenderFunc;
            const style = header.style || defaultStyle;
            const dataVal = header.dataKey ? dataObj[header.dataKey] : data;
            return React.createElement("div", { key: index }, render(dataVal, style));
        };
        const renderDataBody = (tableHeaders) => (dataObj, indexr) => React.createElement("div", { key: indexr }, tableHeaders.map(renderDataRow(dataObj)));
        // todo: sort data if approps
        const renderHeaders = React.createElement("div", null, headers.map(renderHeader));
        const renderBody = React.createElement("div", null, data.map(renderDataBody(headers)));
        return (React.createElement("div", null,
            renderHeaders,
            renderBody));
    }
}
exports.default = NaiveTable;
