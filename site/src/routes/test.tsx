import { NaiveTable } from "@untra/naivetable";
import React from "react";

const fooData = [
    {foo: 1, bar: "2", baz: 3.1, etc: true },
    {foo: 4, bar: "5", baz: 6.2, etc: false },
    {foo: 7, bar: "6", baz: 9.3, etc: null },
    {foo: 10, bar: "11", baz: 12.4, etc: undefined }
]

const nameData = [
    { a: 'alex', b: 12, c: 82.56 },
    { a: 'brock', b: 17, c: 93.33 },
    { a: 'charlie', b: 16, c: 48.65 }
]

const nameHeaders = [
    // change the rendered header text with the 'label' parameter
    { label: 'name', dataKey: 'a' },
    // individually style each header cell with the 'style' parameter
    { label: 'age', dataKey: 'b', style: { backgroundColor: "pink" } },
    // provide a 'render' function to control how dataCells render for the column
    { label: 'grade status', dataKey: 'c', render: (val: number) => <h2>{
        `${val > 50 ? '✅passing' : '❌failing'} the class`
    }</h2> },
    // use the 'dataKey' to control the input to the render function
    // provide an empty string to instead call render with the entire dataObject provided
    { label: 'assessment', dataKey: '', render: (val : any) => <h4>{
        `${JSON.stringify(val.a)} is ${val.c > 90 ? 'really' : ''} ${val.c > 50 ? 'smart' : 'dumb'}`
    }</h4> },
    // you can have more headers than keys in your dataObjects, btw ;)
    // you can also control the 'width' of the column (pass in 'fr' , defaults to 'auto')
    { label: 'comment', dataKey: '', render: () => 'I like you 💙', width: '4fr' }
]

export default class Test extends React.Component {
  public render() {
    return (
      <div className="wrapper">
        <h4>It should be able to render a variety of data types</h4>
        <NaiveTable data={fooData}/>
        <h4>It should be able to render an index left adjacent of the data</h4>
        <NaiveTable data={fooData} includeIndex={true} />
        <h4>It should be able to render a table with custom headers</h4>
        <NaiveTable data={nameData} headers={nameHeaders} includeIndex={true} />
        <h4>It should be able to render individual styling on each header</h4>
        {'TODO'}
        <h4>It should be able to render individual styling for the table</h4>
        {'TODO'}
        <h4>It should be able to render individual styling for each cell</h4>
        {'TODO'}
        <h4>It should be able to display sortable columns</h4>
        {'TODO'}
        <h4>It should display sorted column data sorted correctly</h4>
        {'TODO'}
        <h4>It should be able to render empty data</h4>
        <NaiveTable data={[]}/>
        <h4>It should be able to render a data of one</h4>
        <NaiveTable data={[{of:"one"}]}/>
      </div>
    );
  }
}
