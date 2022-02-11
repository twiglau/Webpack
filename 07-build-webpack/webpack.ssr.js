'use strict';
const path = require('path')
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index-server\.js/);
            const pageName = match && match[1];
            if (pageName) {
                entry[pageName] = entryFile;
                htmlWebpackPlugins.push(
                    new HtmlWebpackPlugin({
                        inlineSource: '.css$',
                        template: path.join(__dirname, `src/${pageName}/index.html`),
                        filename: `${pageName}.html`,
                        chunks: ['vendors', pageName],
                        inject: true,
                        minify: {
                            html5: true,
                            collapseWhitespace: true,
                            preserveLineBreaks: false,
                            minifyCSS: true,
                            minifyJS: true,
                            removeComments: false
                        }
                    })
                );

            }
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    // entry: './src/index.js', // 单入口
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        // filename: 'bundle.js' // 单入口
        filename: '[name]-server.js',
        libraryTarget: 'umd'
    },
    mode: 'production', // none 默认不开启 tree-shaking, production - 开启 tree-shaking
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 与 style-loader 互斥
                    // 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    // 最近两个版本, 使用人数量 > 1% , 兼容 ios7
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                // use: 'file-loader'
                use: [
                    {
                        // loader: 'url-loader',
                        // options: {
                        //     limit: 10240
                        // }
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|svg|otf)$/,
                use: [
                    {
                        // loader: 'url-loader',
                        // options: {
                        //     limit: 10240
                        // }
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /.css$/,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js',
                    global: 'ReactDOM'
                },
            ]
        })
    ].concat(htmlWebpackPlugins),
    // optimization: {
    //     splitChunks: {
    //         minSize: 0, // 分离公共文件时,需要设置
    //         cacheGroups: {
    //             commons: {
    //                 // 1. 分离第三方包 chunk 的名字 vendors,需要添加到 chunks里面
    //                 // test: /(react|react-dom)/,
    //                 // name: 'vendors',
    //                 // chunks: 'all',

    //                 // 2. 分离公共文件
    //                 name: 'commons',
    //                 chunks: 'all',
    //                 minChunks: 2, //至少引用两次
    //             }
    //         }
    //     }
    // }
}