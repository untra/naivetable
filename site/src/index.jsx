import React from 'react'
import {
    render
} from 'react-dom'
import * as NaiveTable from '@untra/naivetable'

const blamDataRows = (headers, nToGen) => {
    let rows = []
    for (let index = 0; index < nToGen; index++) {
        const row = {}
        headers.forEach(header => {
            row[header] = Math.random()
        })
        rows = [...rows, row]
    }
    return rows
}

const bigdata = blamDataRows(['foo', 'bar', 'baz'], 500)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <NaiveTable data = {
            bigdata
        }
        includeIndex = {
            true
        }
        headers = {
            []
        }
        />
    }
}

render( <App /> , document.getElementById('root'))