const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
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
        filename:'[name].bundle.js',
        path:path.join(__dirname,'output')
    },
    optimization: {
        splitChunks: {
            //自动提取所有公共模块到单独 bundle
            chunks:'all'
        }
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
        new CleanWebpackPlugin(),
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