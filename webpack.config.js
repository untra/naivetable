const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    context: __dirname,
    entry: './dist',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.html']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: 'index.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: {
            chunks: false
        }
    },
    // node: {
    //     console: true,
    //     fs: "empty",
    //     net: "empty",
    //     tls: "empty",
    //     "aws-sdk": "empty"
    // },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: [/node_modules/]
            },
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { loose: true, modules: false }],
                            '@babel/react'
                        ],
                        sourceType: 'unambiguous'
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    target: 'web',
    // target: 'node',
    plugins: [
        new HtmlWebPackPlugin({
            template: "./dist/index.html",
            filename: "index.html"
        })
    ],
}
