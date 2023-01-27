# css-loader 的使用
* `loader`是什么?   
1. loader 可以用于对 模块的源代码 进行转换;
2. 我们可以 `将css文件也看成是一个模块`, 我们是 `通过import来加载这个模块`的;
3. 在加载这个模块时, `webpack其实并不知道如何对其进行加载`, 我们必须制定对应的 loader 来完成这个功能;

# 我们需要一个什么样的 loader?
1. 对于加载css文件来说, 我们需要一个可以读取 css 文件的 loader;
2. 这个 loader 最常用的是 css-loader;
* 如何使用这个loader来加载css文件呢? 有三种方式:
> 内联方式;
> CLI方式(webpack5中不再使用);
> 配置方式;

* loader配置方式
> 配置方式表示的意思是在我们的webpack.config.js文件中写明配置信息;
> module.rules中允许我们配置多个loader(因为我们也会继续使用其他的loader,来完成其他文件的加载);
> 这种方式可以更好的表示 loader 的配置, 也方便后期的维护, 同时也让你对各个Loader有一个全局的概览;

* module.rules的配置如下:
> rules属性对应的值是一个数组: [Rule]
> 数组中存放的是一个个的Rule, Rule是一个对象, 对象中可以设置多个属性:
>> test属性: 用于对 resource(资源)进行匹配的, 通常会设置成正则表达式;
>> use属性: 对应的值时一个数组: [UseEntry]
>>> UseEntry是一个对象, 可以通过对象的属性来设置一些其他属性
1. loader: 必须有一个 loader属性, 对应的值是一个字符串;
2. options: 可选的属性, 值是一个字符串或者对象, 值会被传入到loader中;
3. query: 目前已经使用 options 来替代;
>>> 传递字符串(如: use: ['style-loader']) 是 loader 属性的简写方式 (如: `use:[{loader: 'style-loader'}]`);
>> loader属性: `Rule.use:[{loader}]` 的简写.

# style-loader  
* 我们已经通过 css-loader 来加载 css 文件了
> 但是你会发现这个 css 在我们的代码中并`没有生效(页面没有效果)`.
* 这是为什么呢?
> 因为css-loader只是`负责将.css文件进行解析`, 并不会将解析之后的`css插入到页面`中;
> 如果我们希望再完成`插入style的操作`, 那么我们还需要另外一个loader,就是`style-loader`;
* 注意: 因为loader的执行顺序是从右向左(或者说从下到上, 或者说从后到前的), 所以我们需要将 style-loader 写到 css-loader 的前面;

# 如何处理 less 文件?
* 安装less包
`npm install less -D`
* 测试less转换css - 单个文件
`npx lessc ./test.less demo.css`
* 但是在项目中我们会编写大量的css, 它们如何可以自动转换呢?
> 这个时候我们就可以使用 less-loader, 来自动使用 less 工具转换 less 到 css;
`npm install less-loader -D`
> 配置webpack.config.js   

# 认识PostCSS?  

* 什么是PostCSS呢?
1. PostCSS 是一个通过JavaScript来转换样式的工具;
2. 这个工具可以帮助我们进行一些CSS的转换和适配, 比如自动添加浏览器前缀, css样式的重置;
3. 但是实现这些功能, 我们需要借助与PostCSS对应的插件;

* 如何使用PostCSS呢?主要就是两个步骤:
1. 第一步: 查找PostCSS在构建工具中的扩展, 比如webpack中的postcss-loader;
2. 第二步: 选择可以添加你需要的PostCSS相关的插件;

* 命令行使用postcss
1. 当然, 我们能不能也直接在终端使用PostCSS呢?
> 也是可以的, 但是我们需要单独安装一个工具 postcss-cli;
2. 安装它们: postcss, postcss-cli
`npm install postcss postcss-cli -D`

* 插件autoprefixer
1. 因为我们需要添加前缀, 所以要安装autoprefixer;
`npm install autoprefixer -D`  
2. 直接使用postcss工具, 并且制定使用autoprefixer;  
`npx postcss --use autoprefixer -o end.css ./src/css/style.css`  

* 真实开发中我们必然不会直接使用命令行工具来对css进行处理, 而是可以借助工具:
> 在webpack中使用postcss就是使用postcss-loader来处理的;
> 安装postcss-loader: `npm install postcss-loader -D`  
> 我们修改加载css的loader: (配置文件已经过多, 给出一部分) 
>> 注意: 因为postcss需要有对应的插件才会起效果, 所以我们需要配置它的plugin;  
```
{
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [
                require('autoprefixer')
            ]
        }
    }
}
```

* 单独的postcss配置文件
> 当然, 我们也可以将这些配置信息放到一个单独的文件中进行处理:
> 在根目录下创建postcss.config.js   
```
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```  

* postcss-preset-env  
1. 事实上, 在配置postcss-loader时, 我们配置插件并不需要使用autoprefixer.
2. 我们可以使用另外一个插件: `postcss-preset-env` 
> postcss-preset-env也是一个postcss的插件;
> 它可以帮助我们将一些现代的CSS特性,转成大多数浏览器认识的CSS,并且会根据目标浏览器或者运行时环境添加所需的polyfill;  
> 页包括会自动帮助我们添加autoprefixer(所以相当于已经内置了autoprefixer)


