# NaiveTable

![NaiveTable](https://untra.io/img/logo-slim.png)

**NaiveTable** is a straightforward React `^16.8.5` functional module that can be used to quickly render a table from an array of objects.

It turns a JSON array of objects (typescript type `Array<T>` of `type DataObject = { [index: string]: any;}`) into a rendered `<span>` table.

## Usage

### Just feed it consistent `Array<T>` of data

```ts
const data = [
    { a: 'alex', b: 12, c: 82.56 },
    { a: 'brock', b: 17, c: 93.33 },
    { a: 'charlie', b: 16, c: 48.65 }
]
...
// if you need a rendered table of data RIGHT NOW
// NaiveTable just infers the headers 'a', 'b', and 'c'
// this is the most straightforward way to use NaiveTable
<NaiveTable data={data} />
```

### Provide headers for more granular control

```ts
const headers = [
    // change the rendered header text with the 'label' parameter
    { label: 'name', dataKey: 'a' },
    // individually style each header cell with the 'style' parameter
    { label: 'age', dataKey: 'b', style: { backgroundColor: "pink" } },
    // provide a 'render' function to control how dataCells render for the column
    { label: 'grade status', dataKey: 'c', render: (val: number) => <h2>{
        `${val > 50 ? 'passing' : 'failing'} the class`
    }</h2> },
    // use the 'dataKey' to control the input to the render function
    // provide an empty string to instead call render with the entire dataObject provided
    { label: 'assessment', dataKey: '', render: (val : any) => <h4>{
        `${val.a} is ${val.c > 90 ? 'really' : ''} ${val.c > 50 ? 'smart' : 'dumb'}`
    }</h4> },
    // you can have more headers than keys in your dataObjects, btw ;)
    // you can also control the 'width' of the column (pass in 'fr' , defaults to 'auto')
    { label: 'comment', dataKey: '', render: () => 'I like you', width: '4fr' }
]
...
// if you want to specifically define the header rendering of the table
<NaiveTable data={data} headers={headers} />
// if you want an index count column before rendering your headers
<NaiveTable data={data} headers={headers} includeIndex={true} />
```

### Style the table, and make it easily fit into your app

```ts
const tableStyle : React.CSSProperties = { ... }
const cellStyle  : React.CSSProperties = { ... }
...
// each header cell can be styled individually
<NaiveTable data={data} headers={headers} />
// provide css styles for the entire wrapping table
<NaiveTable data={data} tableStyle={tableStyle} />
// provide css styes for all cells in the table
<NaiveTable data={data} cellStyle={cellStyle} />
```

## Design

NaiveTable uses react 16.8.5 and hooks to create a straightforward functional JSX.Element react component.

Despite not being written with classes, I kept the [**SOLID principles**](https://en.wikipedia.org/wiki/SOLID) in mind while designing this package:

_Single Responsibility:_ This package does one thing, and does it well.

_Open / Close :_ The rendering and behavior of NaiveTable columns can be extended, and the code is open source.

_Liskov Substitution:_ By rendering arbitrary `DataObjects`, and accepting anonymous functions to return their JSX.Elements allow for "subtype" correctness.

_Interface Segregation:_ Inputs to the function are minimized to tolerate a bare-minimum, and accept more features as desired.

_Dependency Inversion:_ Concrete details such as `data` and `headers` are input into higher-level abstractions.

## Limitations

* _It's super dumb._ NaiveTable will render data naively (duh) by using a series of nested divs, and as such is not the most effective solution with large amounts of data. While NaiveTable will render more than a thousand rows with ease, more than a hundred and I would recommend a more dynamic table solution with virtual scroll.

* _It wants consistency._ NaiveTable likes structured  `Array<T>` of `{ [index: string]: any;}` data shapes. While this should be most use cases, this means unstructured data may not be render consistently.

* _It will reasonably assume what you meant._ NaiveTable's creator has made some assumptions about what you want the component to behave like, such as default rendering `any` data values into `<p></p>` tags, defaulting column widths to `auto`, etc. It is not magic, just trying its best to please.

# Copyright
Copyright (c) Samuel Volin 2019. License: MIT