'use strict';

const path = require('path')
module.exports = {
    // entry: './src/index.js', // 单入口
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        // filename: 'bundle.js' // 单入口
        filename: '[name].js'
    },
    mode: 'production'
}