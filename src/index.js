"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const NaiveTable_1 = __importDefault(require("./NaiveTable"));
const data = [
    {
        foo: 1,
        bar: 2,
        baz: 3
    },
    {
        foo: 4,
        bar: 5,
        baz: 6
    },
    {
        foo: 7,
        bar: 8,
        baz: 9
    },
    {
        foo: "alpha",
        bar: "beta",
        baz: "gamma"
    }
];
class App extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return react_1.default.createElement(NaiveTable_1.default, { data: data });
    }
}
react_dom_1.render(react_1.default.createElement(App, null), document.getElementById("root"));
