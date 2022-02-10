# webpack 除了可以用来打包应用, 也可以用来打包 js 库
* 实现一个大整数加法库的打包  
> 需要打包压缩版和非压缩版本  
> 支持 AMD/CJS/ESM 模块引入  

# 库的目录结构和打包要求  
* 打包输出的库名称: 
> 未压缩版 large-number.js
> 压缩版 large-number.min.js  
```
|-/dist
 | - large-number.js
 | - large-number.min.js  
|- webpack.config.js
|- package.json  
|- index.js
|- /src
 | - index.js
```  

# 支持的使用方式  
* 支持 ES module  
```
import * as largeNumber from 'large-number';
// ...
largeNumber.add('999','1');
```  

* 支持 CJS  
```
const largeNumbers = require('large-number');
// ...
largeNumber.add('999','1');
```  

* 支持 AMD  
```
require(['large-number'], function(large-number) {
    // ...
    largeNumber.add('999','1');
});
```

* 可以直接通过 script 引入  
```
<!doctype html>
<html>
...
<script src="https://unpkg.com/large-number"></script>
<script>
// ...
// Global variable  
largeNumber.add('999','1');
// Property in the window object  
window.largeNumber.add('999','1');
// ...
</script>
</html>
```

# 如何将库暴露出去?  
* library: 指定库的全局变量  
* librayTarget: 支持库引入的方式  
```
module.exports = {
    mode: "production",
    entry: {
        "large-number": "./src/index.js",
        "large-number.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        library: "largeNumber",
        libraryExport: "default",
        libraryTarget: "umd"
    }
};
```

# 如何只对 .min 压缩  
* 通过 include 设置只压缩 min.js 结尾的文件  
```
module.exports = {
    mode: "none",
    entry: {
        "large-number": "./src/index.js",
        "large-number.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        library: "largeNumber",
        libraryTarget: "umd"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            }),
        ],
    }
};
```

* 压缩插件: TerserPlugin 好处是可以压缩 ES6 语法, 在 webpack 的 mode production 模式下,会默认使用该插件   
* TerserWebpackPlugin 是基于 Uglify.js-Plugin 改造过来的,uglify-js-plugin3.0 版本也是支持 ES6 语法的压缩.  

# 设置入口文件  
* package.json 的 main 字段为 index.js  
```
if(process.env.NODE_ENV === "production") {
    module.exports = require("./dist/large-number.min.js");
} else {
    module.exports = require("./dist/large-number.js");
}
```

# 发布到 NPM  
```
npm publish  
```