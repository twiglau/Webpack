# 搭建本地服务器?  
* 目前我们开发的代码, 为了运行需要有两个操作:  
> 操作一: `npm run build`, 编译相关的代码;  
> 操作二: 通过`live server` 或者直接通过浏览器, 打开 `index.html` 代码, 查看效果;  

* 这个过程经常操作会影响我们的开发效率, 我们希望可以做到, 当`文件发生变化`时, 可以`自动的完成 编译和展示`;  
* 为了完成自动编译, webpack提供了几种可选的方式:  
> webpack watch mode;  
> webpack-dev-server(常用);
> webpack-dev-middleware;

# webpack watch  
* webpack给我们提供了 `watch模式`;
> 在该模式下, webpack依赖图中的所有文件, 只要有一个`发生了更新`, 那么代码将`被重新编译`;  
> 我们`不需要手动`去运行 npm run build 指令了;

* 如何开启watch呢? 两种方式:  
> 方式一: 在导出的配置中, 添加 `watch: true`;
> 方式二: 在启动webpack的命令中, 添加 `--watch的标识`;

# webpack-dev-server  

* 上面的方式 可以监听到文件的变化, 但是事实上他本身`没有自动刷新浏览器的功能的`;
> 当然, 目前我们可以在VSCode中使用 live-server 来完成这样的功能;  
> 但是, 我们希望在 `不使用live-server`的情况下, 可以具备 `live reloading (实时重新加载)` 的功能;
* 安装 webpack-dev-server  
`npm install webpack-dev-server -D`  
* `修改配置文件`, 告知 dev server, 从什么位置查找文件;  
```

devServer: {
    // 如果一些资源从webpack打包后的资源中没有加载到,会从contentBase里面加载
    // webpack5 已废弃
    contentBase: "./build",
    static: {
        directory: path.join(__dirname, 'public')
    }
}

target: "web"

"serve": "webpack serve --config wk.config.js"

```  
* webpack-dev-server 在编译之后`不会写入到任何输出文件`, 而是将 bundle 文件 `保留在内存` 中: 
> 事实上 webpack-dev-server使用了一个库叫 memfs(memory-fs webpack自己写的)


# 认识模块热替换(HMR) 
* 什么是HMR呢?  
> HMR的全称是 `Hot Module Replacement`, 翻译为 `模块热替换`;
> 模块热替换是指在 应用程序运行过程中, `替换, 添加, 删除模块`, 而 `无需重新刷新整个页面`;

* 开启HMR 
```
devServer: {
    hot: true
}
```  
> 浏览器可以看到如下结果:  
```
[HMR] Waiting for update signal from WDS...
[WDS] HOt Module Replacement enabled.
[WDS] Live Reloading enabled.
```  
> 但是会发现, 当我们修改了某一个模块的代码时, 依然是刷新的整个页面:  
>> 这是因为我们需要去`指定那些模块发生更新`时, 进行HMR:
```
if(module.hot) {
    module.hot.accept("./util.js", () => {
        console.log("util 更新了");
    })
}
```   

* 框架的HMR  
> 有一个问题: 在开发其他项目时, 我们是否需要经常手动去写入 module.hot.accept 相关的API呢?  
>> 比如 `开发Vue, React项目`, 我们`修改了组件`, 希望`进行热更新`, 这个时候 `应该如何去操作`呢?
>> 事实上社区已经针对这些有很成熟的解决方案了; 
>> 比如vue开发中, 我们使用 `vue-loader`, 此loader支持vue组件的HMR, 提供开箱即用的体验;  
>> 比如react开发中, 有`React Hot Loader`, 实时调整react组件(目前React官方已经弃用了, 改成使用react-refresh);

* HMR的原理

* 那么HMR的原理是什么呢? 如何可以做到只更新一个模块中的内容呢?  
> webpack-dev-server 会创建两个服务: 提供`静态资源的服务(express)` 和 `Socket服务(net.Socket)`;  
> express server负责直接提供`静态资源的服务`(打包后的资源直接被浏览器请求和解析);

* HMR Socket Server, 是一个socket的长连接:
> 长连接有一个最好的好处是`建立连接后双方可以通信`(服务器可以直接发送文件到客户端);
> 当服务器`监听到对应的模块发生变化`时,会生成`两个文件.json(manifest文件)`和`.js文件(update chunk)`;
> 通过长连接, 可以直接`将这两个文件主动发送给客户端`(浏览器);
> 浏览器`拿到两个新的文件`后, 通过HMR runtime机制, `加载这两个文件`, 并且`针对修改的模块进行更新`;  
 ```
                        webpack-dev-server                                        浏览器
                    |---------------------------|                     |----------------------------|
                    |   -------------------     |                     | |----------------------|   |   
                    |  |    HMR Server     |    |                     | | |------------------| |   |
                       |    -----------    |                            | |  |------------|  | |
                       |     | json文件 |   |      <----------------->   | |  | json文件   |  |
                       |     |  js文件  |   |                            | |  |  js文件    |  |
                       |     -----------   |                            | |  |------------|  |  |
                       |--------------------                            | |                  |  |
源代码                                                                   | |    HMR runtime   |  |
main.js                          |                                        |------------------|  |
style.less  ------------> webpack compiler                              |                       |
                                 |                                      |                       |
                                                                        |                       |
                        |-------------------|                           
                        |   |-----------|   |   
                        |   | bundle.js | <-|---------------->          
                        |   |-----------|   |  
                        |                   |                           |   |--------------|    | 
                        |  express server   |                           |   | bundle.js    |    |
                        |-------------------|                           |   |--------------|    |
                                                                        |                       |
                                                                        |     index.html        |
                                                                        |-----------------------|
                                                                      |------------------------------|  
 ```           


 # hotOnly, host 配置 
 * host设置主机地址:
 > 默认值是localhost;
 > 如果希望其他地方也可以访问, 可以设置为 0.0.0.0;
 * localhost 和 0.0.0.0 的区别: 
 > localhost: 本质上是一个域名, 通常情况下回被解析成 127.0.0.1;
 > 127.0.0.1: 回环地址(Loop Back Address), 表达的意思其实是 我们主机自己发出去的包, 直接被自己接收;
 >> 正常的数据库包经常 应用层 - 传输层 - 数据链路层 - 物理层;
 >> 而回环地址, 是在网路层直接就被获取到了, 是不会经常数据链路层和物理层的;
 >> 比如我们监听 127.0.0.1时, 在同一个网段下的主机中, 通过ip地址是不能访问的;
 > 0.0.0.0: 监听IPV4上所有的地址, 再根据端口找到不同的应用程序;
 >> 比如我们监听 0.0.0.0时, 在同一个网段下的主机中, 通过ip地址是可以访问的;     

 # port, open, compress  
 * port 设置监听的端口, 默认情况下是8080
 * open 是否打开浏览器:
 > 默认值是false, 设置为true会打开浏览器;
 > 也可以设置为类似于 Google Chrome 等值;
 * compress 是否为静态文件开启 gzip compression:
 > 默认值是false, 可以设置为true;

 # historyApiFallback  
 * historyApiFallback是开发中一个非常常见的属性, 它主要的作用是解决SPA页面在路由跳转之后, 进行页面刷新时, 返回404的错误.

 # resolve模块解析 
 * resolve用于设置模块如何被解析:
 > 在开发中我们会有各种各样的模块依赖, 这些模块可能来自于自己编写的代码, 也可能来自第三方库;
 > resolve可以帮助webpack从每个require/import语句中, 找到需要引入到合适的模块代码;
 > webpack使用 `enhanced-resolve` 来解析文件路径;

 * webpack能解析三种文件路径:  
 > 绝对路径
 >> 由于已经获得文件的绝对路径, 因此不需要再做进一步解析;
 > 相对路径
 >> 在这种情况下, 使用 import 或 require 的资源文件所处的目录, 被认为是上下文目录;
 >> 在import/require 中给定的相对路径, 会拼接次上下文路径, 来生成模块的绝对路径;
 > 模块路径
 >> 在 resolve.modules 中指定的所有目录检索模块;
 >>> 默认值是 ['node_modules'], 所以默认会从 node_modules中查找文件;
 >> 我们可以通过设置别名的方式来替换初识模块路径, 具体后面讲解 alias 的配置;

 * 文件还是文件夹
 > 如果是一个文件:
 >> 如果文件具有扩展名, 则直接打包文件;
 >> 否则, 将使用 resolve.extensions选项作为文件扩展名解析;
 > 如果是一个文件夹:
 >> 会在文件夹中根据 resolve.mainFiles配置选项中指定的文件顺序查找;
 >>> resolve.mainFiles的默认值是 ['index'];
 >>> 再根据 resolve.extensions 来解析扩展名;

 * extensions和alias配置 
 > extensions是解析到文件时自动添加扩展名:
 >> 默认值是 [".wasm", ".mjs", ".js", ".json"]
 >> 所以如果我们代码中想要添加加载 .vue 或者 jsx 或者 ts 等文件时, 我们必须自己写上扩展名;

 # 如何区分开发环境