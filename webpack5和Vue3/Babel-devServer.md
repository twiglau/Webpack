# Babel
* Babel是一个工具链, 主要用于旧的浏览器或者环境中将 ECMAScript 2015+代码转换为向后兼容版本的 JavaScript;
> 包括: 语法转换, 源代码转换 等;

* babel本身可以作为 一个独立的工具(和postcss 一样), 不和webpack等构建工具配置来单独使用.
> `@babel/core`: babel的核心代码, 必须安装;
> `@babel/cli`: 可以让我们在命令行使用babel;

* 测试转换:
> 命令: `npx babel demo.js --out-dir dist` `npx babel demo.js --out-file test.js` 

* 插件使用
> 如需要转换箭头函数, 那么我们就可以使用 `箭头函数转换相关的插件`:  
`npm install @babel/plugin-transform-arrow-functions -D`  
`npx babel demo.js --out-file test.js --plugins=@babel/plugin-transform-arrow-functions`  
`npm install @babel/plugin-transform-block-scoping`  

* Babel的预设preset  
> 但是如果要转换的内容过多, 一个个设置是比较麻烦的, 我们可以使用预设(preset): 
> 安装 `@babel/preset-env` 预设: `npm install @babel/preset-env`  
> 使用预设:  
`npx babel demo.js --out-file test.js --presets=@babel/preset-env`  

# Babel的底层原理
* babel是如何做到将我们的一段代码(ES6, TypeScript, React)转成另外一段代码(ES5)的呢?  
> 从一种源代码(原生语言) 转换成 另一种源代码(目标语言), 这是什么的工作? 
> 就是 编译器, 事实上我们可以将babel看成就是一个编译器.  
> Babel编译器的作用就是将我们的源代码, 转换成浏览器可以直接识别的 另外一段源代码;

* Babel也拥有编译器的工作流程:  
> 解析阶段(Parsing)
> 转换阶段(Transformation)
> 生成阶段(Code Generation)
> https://github.com/jamiebuilds/the-super-tiny-compiler

* 编译器执行原理
> 原生代码 -> 解析(Parsing) -> 转换(Transformation) -> 代码生成(Code Generation) -> 目标源代码  
> 原生源代码 -> 词法分析(Lexical Analysis) -> tokens数组 -> 语法分析(syntactic analysis)(也成为Parsing) -> AST抽象语法树
> -> 遍历(Traversal) -> 访问(Visitor) -> 应用插件(Plugin) -> 新的AST(新的抽象语法树) -> 目标源代码  

# babel-loader  
* 在实际开发中, 我们通常会在构建工具中通过配置 babel 来对其进行使用的, 比如在webpack中. 
> 那么我们就需要去安装相关的依赖: 
> 如果之前已经安装了@babel/core, 那么这里不需要再次安装: `npm install babel-loader @babel/core`  
> 我们可以设置一个规则, 在加载js文件时, 使用我们的babel:  
```
module: {
    rules: [
        {
            test: /\.m?js$/,
            use: {
                loader: "babel-loader"
            }
        }
    ]
}
```  

* babel-preset  
> 如果我们一个个去安装使用插件, 那么需要手动来管理大量的babel插件, 我们可以直接给webpack提供一个preset, webpack会根据我们的预设来加载对应的插件列表, 并且将其传递给babel.
> 比如常见的预设有三个:  
> env  
> react  
> TypeScript  

# Babel的配置文件  
* 像之前一样, 我们可以将babel的配置信息放到一个独立的文件中, babel给我们提供了两种配置文件的编写:  
> babel.config.json (或者 .js, .cjs, .mjs) 文件;
> .babelrc.json (或者 .babelrc, .js, .cjs, .mjs) 文件;   

* 它们两个有什么区别呢? 目前很多的项目都采用了多包管理的方式(babel本身, element-plus, umi等);  
> .babelrc.json: 早期使用较多的配置方式, 但是对于配置 Monorepos 项目是比较麻烦的;
> babel.config.json(babel7): 可以直接作用于 Monorepos 项目的子包, 更加推荐;  
