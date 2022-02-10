const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemoveCommentsPlugin = require('./remove-comments-plugin')
/**
 * @type {import('webpack').Configuration}
 */

const config = {
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'output')
    },
    mode:'none',
    plugins:[
        new CopyWebpackPlugin({
            patterns:['public']
        }),
        new RemoveCommentsPlugin()
    ]
}

module.exports = config