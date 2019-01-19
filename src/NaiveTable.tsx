interface TableConfigOptions {
  sizing?: "grid" | "flex";
}
const defaultOptions: TableConfigOptions = { sizing: "grid" };

interface TableConfigHeader {
  label: string;
  dataKey?: string;
  style?: React.CSSProperties;
  render?: (data: unknown, styles: React.CSSProperties) => JSX.Element;
}
const defaultStyle: React.CSSProperties = {
  backgroundColor: "#eee",
  color: "#111"
};

const defaultHeaders: TableConfigHeader = {
  dataKey: "",
  label: "",
  render: (data: unknown, styles: React.CSSProperties) => (
    <p style={styles}>{`${data}`}</p>
  ),
  style: defaultStyle
};

interface TableConfigProps {
  options?: TableConfigOptions;
  headers?: TableConfigHeader[];
  data: object[];
}

interface TableConfigState {
  options: TableConfigOptions;
  headers: TableConfigHeader[];
  data: object[];
}

type NaiveTableProps = TableConfigProps;

type NaiveTableState = TableConfigState;

const inferHeadersFromData = (data: object[]): TableConfigHeader[] => {
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
    const options = { ...defaultOptions, ...props.options };
    const data = props.data || [];
    const headers = props.headers ? props.headers : inferHeadersFromData(data);

    // if headers are not defined, infer from data keys
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
    const renderHeaders = <div>{headers.forEach(renderHeader)}</div>;
    const renderBody = renderHeaders;
    return (
      <table>
        {renderHeaders}
        {renderBody}
      </table>
    );
  }
}
