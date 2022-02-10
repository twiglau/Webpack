const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * @type { import('webpack').Configuration}
 */
const config = {
    mode:'none',
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'output')
    },
    devServer:{
        contentBase:'./public',
        proxy: {
            '/api/*':{
                // http://localhost:8080/api/users -> https://api.github.com/api/users
                target:'https://api.github.com',
                // http://localhost:8080/api/users -> https://api.github.com/users
                pathRewrite:{
                    '^/api':''
                },
                //不能使用 localhost:8080 作为请求 Github 的主机名
                changeOrigin:true
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(jpeg|png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10 * 1024
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        //用于生成 index.html
        new HtmlWebpackPlugin({
            title:'Webpack Tutorials',
            meta: {
                viewport:'width=device-width'
            },
            template:'./src/index.html'
        }),
        // new CopyWebpackPlugin({
        //     patterns:['public'] //需要拷贝的目录或者路径通配符
        // })
    ]
}

module.exports = config