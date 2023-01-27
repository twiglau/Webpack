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