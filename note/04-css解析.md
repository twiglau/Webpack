# 解析CSS
1. css-loader 用于加载 .css 文件, 并且转换成 commonjs 对象,插入到 js 代码当中  
2. style-loader 将样式通过 <style> 标签插入到 head 中

```
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            test: /\.css$/,
            use: [
                // loader 是链式调用的
                'style-loader',
                'css-loader'
            ]
        ]
    }
}
```
# 解析 Less 和 SaSS
> less-loader 用于将 less 转换成 css

```
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```