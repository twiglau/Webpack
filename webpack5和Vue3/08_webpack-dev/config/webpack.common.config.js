// const { Module } = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
module.exports = {
    target: "web",
    //No need to use the 'serve' command together with '{ watch: true }' configuration, it does not make sense.
    // watch: true, // webpack-cli 功能
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "bundle.js"
    },
    resolve: {
        // modules: ["node_modules"],
        extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
        alias: {
            "@": path.resolve(__dirname,"../src"),
            "js": path.resolve(__dirname, "../src/js")
        }
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
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                type: "asset",
                generator: {
                    filename:"img/[name]_[hash:6][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024
                    }
                }
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg|webp)$/,
            //     // type: "asset/resource",
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 esModule: false,
            //                 outputPath:"img",
            //                 name:"[name]_[hash:6].[ext]"
            //             }
            //         }
            //     ],
            //     type:"javascript/auto",
            // },
            // {
            //     test: /\.(jpe?g|png|gif|svg|webp)$/,
            //     // type: "asset/resource",
            //     // 默认情况下,对所有图片进行base64编码
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 esModule: false,
            //                 outputPath:"img",
            //                 limit: 100 * 1024,
            //                 name:"[name]_[hash:6].[ext]"
            //             }
            //         }
            //     ],
            //     type:"javascript/auto",
            // },
            {
                test: /\.(eot|ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "font/[name]_[hash:6][ext]"
                }
            },
            // {
            //     test: /\.(eot|ttf|woff2?)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 esModule:false,
            //                 // outputPath:"font",
            //                 name:"font/[name]_[hash:6].[ext]"
            //             }
            //         }
            //     ],
            //     type: "javascript/auto"
            // }
            // {
            //     test: /\.js$/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 // plugins: [
            //                 //     "@babel/plugin-transform-arrow-functions",
            //                 //     "@babel/plugin-transform-block-scoping",
            //                 // ]
            //                 presets: [
            //                     "@babel/preset-env",
            //                     // "@babel/preset-react",
            //                     // "@babel/preset-ts"
            //                 ]
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "🙂",
            template:"./public/index.html",
        }),
        new DefinePlugin({
            BASE_URL: "'./'",
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin(),
    ]
}