
const path = require('path');
const webpack = require('webpack');
const wepback = require('webpack')
module.exports = {
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[hash].dll.js',
        path: path.join(__dirname, 'build/library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, 'build/library/[name].json'),
        })
    ]
}