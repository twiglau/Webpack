const path = require('path');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.config');
module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        // contentBase: "./public",
        static: {
            directory: path.join(__dirname, 'res')
        },
        hot: true,
        // host: `0.0.0.0`,
        port: 7777,
        open: true,
        proxy: {
            // "/api":"http://localhost:8888"
            "/api": {
                target: "http://localhost:8888",
                pathRewrite: {
                    "^/api": ""
                },
                secure: false, //默认情况下不接受HTTPS且证书无效的后端服务器.
                changeOrigin: true
            }
        }
    }
});