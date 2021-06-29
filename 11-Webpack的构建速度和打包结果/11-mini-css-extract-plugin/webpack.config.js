const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const config = {
    mode:'none',
    entry:{
        main:'./src/index.js'
    },
    output: {
        filename:'[name].bundle.js',
        path:path.join(__dirname,'output')
    },
    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                parallel:true, //可省略,默认开启并行
                terserOptions:{
                    toplevel:true, //最高级别,删除无用代码
                    ie8:true,
                    safari10:true,
                }
            }),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    // 'style-loader', //将样式通过 style 标签注入
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Dynamic import',
            template:'./src/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}

module.exports = config