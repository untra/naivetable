// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// from: https://github.com/cypress-io/cypress/issues/1859#issuecomment-476457189
const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on, config) => {
    `${config} is not used`
    const options = browserify.defaultOptions
    options.browserifyOptions.extensions.push('.ts', '.tsx')
    const babelifyConfig = options.browserifyOptions.transform[1][1]
    babelifyConfig.presets.push(require.resolve('@babel/preset-typescript'))
    babelifyConfig.extensions = ['.js', '.jsx', '.ts', '.tsx']

    on('file:preprocessor', browserify(options))
}
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// const wp = require('@cypress/webpack-preprocessor')

// module.exports = (on) => {
//     // `on` is used to hook into various events Cypress emits
//     // `config` is the resolved Cypress config
//     const options = {
//         webpackOptions: {
//             resolve: {
//                 extensions: ['.ts', '.tsx', '.js']
//             },
//             module: {
//                 rules: [
//                     {
//                         test: /\.tsx?$/,
//                         exclude: /node_modules/,
//                         loader: 'ts-loader',
//                         options: { transpileOnly: true }
//                     }
//                 ]
//             }
//         }
//     }
//     on('file:preprocessor', wp(options))
// }
