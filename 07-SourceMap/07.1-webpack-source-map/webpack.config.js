const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    mode:'none',
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'output')
    },
    module:{
        rules:[
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/.png$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit:10 * 1024 //10KB
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'Webpack Tutorials',
            meta:{
                viewport:'width=device-width'
            },
            template:'./src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns:['public'] //需要拷贝的目录或者路径通配符
        })
    ]
}

module.exports = config