const webpack = require('webpack')
const path = require('path')
/**
 * @type {webpack.Configuration}
 */
const config = {
    mode:'none',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
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
    optimization: {
        sideEffects:true,
        // 模块只导出被使用的成员
        // usedExports: true,
        // 尽可能合并每一个模块到一个函数中
        // concatenateModules: true,
        // 压缩输出结果
        // minimize: true,
    }
}

module.exports = config