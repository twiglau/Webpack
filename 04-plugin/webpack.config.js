const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
/**
 * @type  {import('webpack').Configuration}
 */
 const path = require('path')
 const config = {
     entry: './src/main.js',
     output:{
         filename:'bundle.js',
         path:path.join(__dirname,'output')
     },
     mode:'none',
     plugins:[
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
             title:'Webpack Plugin Sample',
             template:'./src/index.html',
             meta: {
                 viewport: 'width=device-width'
             }
         }),
         new HtmlWebpackPlugin({
             filename:'about.html'
         }),
         new CopyWebpackPlugin({
             patterns:['public'] //需要拷贝的目录或者路径通配符
         })
     ]
 }
 
 module.exports = config