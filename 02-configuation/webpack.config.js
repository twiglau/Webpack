
const path = require('path')
//一定记得运行 Webpack 前先注释掉这里.
// import { Configuration } from 'webpack'

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'output')
    },
    mode:'none'
}

module.exports = config