// const { Module } = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 正则表达式
                // 1. loader 的写法(语法糖)
                // loader: "css-loader"

                // 2. 完整的写法
                use: [
                    // {loader: "css-loader"}
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 require('autoprefixer')
                    //             ]
                    //         }
                    //     }
                    // },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }
}