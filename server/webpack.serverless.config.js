'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const babelRcPath = path.resolve(__dirname, '.babelrc')

const babelRc = JSON.parse(fs.readFileSync(babelRcPath))

module.exports = {
    devtool: 'source-map',
    entry: {
        './server/html': './server/html.js',
        './server/robots': './server/robots.js',
        './server/favicon': './server/favicon.js',
        './server/api': './server/api.js',
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    externals: [
        'aws-sdk',
        // require('webpack-node-externals')() // This is commented out so that you can easily uncomment it for local debugging
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: Object.assign({
                    babelrc: false,
                    cacheDirectory: true,
                }, babelRc),
                include: __dirname,
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=./[path][name].[ext]',
            },
        ],
    },
    plugins: [
    ],
    resolve: {
        extensions: ['', '.json', '.js', '.jsx'],
        alias: {
            // These shims are needed for bunyan
            'dtrace-provider': 'nope-sorry',
            mv: 'nope-sorry',
            'source-map-support': 'nope-sorry',
        },
    },
}
