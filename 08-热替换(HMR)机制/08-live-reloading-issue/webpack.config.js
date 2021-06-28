const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

/**
 * @type {webpack.Configuration}
 */

const config = {
    mode:'development',
    entry:'./src/main.js',
    output: {
        filename:'js/bundle.js'
    },
    devtool:'source-map',
    devServer:{
        //开启HMR特性,如果资源不支持 HMR 会 fallback 到 live reloading
        hot:true
        //只使用 HMR, 不会 fallback 到 live reloading
        //hotOnly: true

    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                use:'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Webpack Tutorial',
            template:'./src/index.html'
        }),
        //HMR 特性所需要的插件
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config