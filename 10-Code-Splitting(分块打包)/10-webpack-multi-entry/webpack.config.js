const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
/**
 * @type {webpack.Configuration}
 */
const config = {
    mode:'none',
    entry: {
        index:'./src/index.js',
        album:'./src/album.js'
    },
    output: {
        filename:'[name].bundle.js'
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Multi Entry',
            template:'./src/album.html',
            filename:'album.html',
            chunks:['album']
        }),
        new HtmlWebpackPlugin({
            title:'Multi Entry',
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index']
        })
    ]
}

module.exports = config