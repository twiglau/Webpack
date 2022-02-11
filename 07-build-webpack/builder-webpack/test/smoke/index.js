const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: 10000
})
// 先进入到 template 目录中
process.chdir(path.join(__dirname, 'template'));
// 清除 dist 目录
rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod')

    // webpack 运行 prod 配置
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));
        console.log('Webpack build sucess, begin run test.');

        mocha.addFile(__dirname, 'html-test.js')
        mocha.addFile(__dirname, 'css-js-test.js')

        mocha.run();
    })
})