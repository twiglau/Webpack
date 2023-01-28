# 入口文件解析
* 之前编写入口文件的规则是这样的: './src/index.js', 但是如果我们的配置文件所在的位置变成了 config 目录, 我们是否应该变成 '../src/index.js'呢? 
> 如果我们这样编写, 会发现是报错的, 依然要写成 ./src/index.js;
> 这是因为入口文件其实是和另一个属性有关的: context;
* context的作用是用于解析入口(entry point) 和加载器(loader);
> 官方说法: 默认是当前路径(但是经过测试, 默认应该是webpack的启动目录)
> 另外推荐在配置中传入一个值;
```
// context是配置文件所在目录
module.exports = {
    context: path.resolve(__dirname, "./"),
    entry: "../src/index.js"
}
```  