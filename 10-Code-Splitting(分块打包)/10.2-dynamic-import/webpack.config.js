const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const config = {
    mode:'none',
    entry:{
        main:'./src/index.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.join(__dirname,'output')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'Dynamic import',
            template:'./src/index.html',
            filename:'index.html'
        })
    ]
}

module.exports = config