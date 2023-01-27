# webpack  
1. 模块化的方式开发;
2. 高级特性来加快我们开发效率或者安全性, 比如通过 ES6+, TypeScript开发脚本逻辑, 通过sass, less 等方式来编写 css 样式代码;
3. 开发过程, 实时监听文件的变化来反映到浏览器上, 提高开发的效率;
4. 开发完成后还需要将代码进行压缩, 合并以及其他相关的优化;
> 打包bundler: webpack可以将帮助我们进行打包, 所以它是一个打包工具;
> 静态的static: 这样表述的原因是我们最终可以将代码打包成最终的静态资源(部署到静态服务器);
> 模块化module: webpack默认支持各种模块化开发, ES Module, CommonJS, AMD等;
> 现代的modern: 正式因为现代前端开发面临各种各样的问题,才催生了webpack的出现和发现;

# Vue项目加载的文件有哪些?  
1. JS的打包:
> 将ES6转换成ES5的语法;
> TypeScript的处理,将其转换成JavaScript;
2. Css的处理:
> CSS文件模块的加载,提取;
> Less,Sass等预处理器的处理;
3. 资源文件img, font:
> 图片img文件的加载;
> 字体font文件的加载;
4. HTML资源的处理:
> 打包HTML资源文件;
5. 处理vue项目的SFC文件.vue文件;

# Webpack的安装
* webpack的安装目前分为两个: webpack, webpack-cli  
* 关系呢?
> 执行webpack命令,会执行node_modules下的.bin目录下的webpack;
> webpack在执行时是依赖webpack-cli的,如果没有安装就会报错;
> 而webpack-cli中代码执行时,才是真正利用webpack进行编译和打包的过程;
> 所以在安装webpack时,我们需要同时安装webpack-cli(第三方的脚手架事实上没有使用webpack-cli的, 二十类似于自己的vue-service-cli的东西)

# Webpack命令
* webpack执行命令  
`npx webpack --entry ./src/main.js --output-path ./build`
`pwd 命令: 查看当前目录的绝对路径`
`lau.config.js: webpack --config lau.config.js 如果不是默认webpack.config.js, 需要增加配置文件指定名称`

# Webpack的依赖图
* webpack到底是如何对我们的项目进行打包的呢?  
> 事实上webpack在处理应用程序时, 它会根据命令或者配置文件找到入口文件;
> 从入口开始,会生成一个 `依赖关系图`, 这个 `依赖关系图` 会包含应用程序中所需的所需的所有模块(比如.js文件, css文件, 图片, 字体等);
> 然后遍历图结构, 打包一个个模块(根据文件的不同使用不同的loader来解析);
