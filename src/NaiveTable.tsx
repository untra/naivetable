interface TableConfigOptions {
  sizing?: "grid" | "flex";
}
const defaultOptions: TableConfigOptions = { sizing: "grid" };

interface DataObj {
  [index: string]: unknown;
}

interface TableConfigHeader {
  // this is the string label for the table header
  label: string;
  // this is the dataKey that is referenced on the data object when displaying this row
  // if set to '' (empty string) the whole data object will be sent to the render function
  dataKey?: string;
  style?: React.CSSProperties;
  render?: (data: unknown, styles: React.CSSProperties) => JSX.Element;
}
const defaultStyle: React.CSSProperties = {
  backgroundColor: "#eee",
  color: "#111"
};
const defaultRenderFunc = (data: unknown, styles: React.CSSProperties) => (
  <p style={styles}>{`${data}`}</p>
);

const defaultHeaders: TableConfigHeader = {
  dataKey: "",
  label: "",
  render: defaultRenderFunc,
  style: defaultStyle
};

interface TableConfigProps {
  options?: TableConfigOptions;
  headers?: TableConfigHeader[];
  data: DataObj[];
}

interface TableConfigState {
  options: TableConfigOptions;
  headers: TableConfigHeader[];
  data: DataObj[];
}

type NaiveTableProps = TableConfigProps;

type NaiveTableState = TableConfigState;

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

class NaiveTable extends React.Component<NaiveTableProps, NaiveTableState> {
  constructor(props: TableConfigProps) {
    super(props);
    // passed in options shadow the default options
    const options = { ...defaultOptions, ...props.options };
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
  public render() {
    const { options, headers, data } = this.state;
    const renderHeader = (header: TableConfigHeader, index: number) => (
      <th key={index}>{header.label}</th>
    );
    const renderDataRow = (dataObj: DataObj) => (
      header: TableConfigHeader,
      index: number
    ) => {
      const render = header.render || defaultRenderFunc;
      const style = header.style || defaultStyle;
      const dataVal: any = header.dataKey ? dataObj[header.dataKey] : data;
      return <td key={index}>{render(dataVal, style)}</td>;
    };

    const renderDataBody = (tableHeaders: TableConfigHeader[]) => (
      dataObj: DataObj,
      indexr: number
    ) => (
      <tr key={indexr}>{() => tableHeaders.forEach(renderDataRow(dataObj))}</tr>
    );

    // todo: sort data if approps
    const renderHeaders = <tr>{() => headers.forEach(renderHeader)}</tr>;
    const renderBody = <div>{() => data.forEach(renderDataBody(headers))}</div>;
    return (
      <table>
        {renderHeaders}
        {renderBody}
      </table>
    );
  }
}
