import React from "react";
/**
 * sortDir - which direction the table should sort in
 * @export
 * @enum {string}
 */
export declare enum sortDir {
    asc = "asc",
    dsc = "dsc"
}
declare type sortDirection = sortDir | boolean;
/**
 * DataObj - any object that is string indexed.
 * @export
 * @interface DataObj
 */
export interface DataObj {
    [index: string]: any;
}
/**
 * TableConfigHeader - proprties of a NaiveTable header
 * @export
 * @interface TableConfigHeader
 */
export interface TableConfigHeader {
    label: string;
    dataKey?: string;
    width?: string;
    render?: (data: any) => JSX.Element;
    sort?: sortDirection;
    style?: React.CSSProperties;
}
/**
 * TableConfigProps - properties of a NaiveTable Component.
 * Only data is required.
 * @export
 * @interface TableConfigProps
 */
export interface TableConfigProps {
    data: DataObj[];
    sortedData?: DataObj[];
    headers?: TableConfigHeader[];
    includeIndex?: boolean;
    tableStyle?: React.CSSProperties;
    cellStyle?: React.CSSProperties;
}
export declare type NaiveTableProps = TableConfigProps;
/**
 * NaiveTable
 * @param {NaiveTableProps} props
 * @returns
 */
export declare function NaiveTable(props: NaiveTableProps): JSX.Element;
export {};
