'use strict';
const webpack = require('webpack')
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
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                // use: 'file-loader'
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|svg|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        // 启用这个插件以使 webpack 将变化通知到 WDS,
        // 这个插件会自动启用 --hot 标志
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        // 热加载失败后不刷新,如果实现了客户端接口,开启它就比较合适
        // hotOnly: true,
        // 如果出现错误时, 你仍然希望它刷新,请设置: 
        hot: true
    }
}