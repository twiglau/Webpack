# file-loader 
* 要处理jpg, png 等格式的图片, 我们也需要有对应的 loader: file-loader 
> file-loader的作用就是帮助我们处理 import/require() 方式引入的一个文件资源, 并且会将它放到我们输出的文件夹中;
> 可以指定其修改名字和文件夹

# 文件的命令规则 
* 有时候我们处理后的 文件名称 按照一定的规则进行显示;
> 比如保留原来的 文件名, 扩展名, 同时为了防止重复, 包含一个 hash值 等;
* 这个时候我们可以使用`PlaceHolders`来完成, webpack给我们提供了大量的PlaceHolders来显示不同的内容;
> https://webpack.js.org/loaders/file-loader/#placeholders
> 可以查看自己需要的placeholder;

* 最常用的placeholder:
> [ext]: 处理文件的扩展名;
> [name]: 处理文件的名称;
> [hash]: 文件的内容, 使用MD4的散列函数处理, 生成的一个128位的hash值(32个十六进制);
> [contentHash]: 在file-loader中和[hash]结果是一致的(在webpack的一些其他地方不一样, 后面会讲到);
> [hash:<length>]: 截图hash的长度,默认32个字符太长了;
> [path]: 文件相对于webpack配置文件的路径;

# url-loader 
* url-loader和file-loader的工作方式是相似的, 但是可以将较小的文件, 转成 `base64的URI`.

# asset module type  
* 我们当前使用的webpack版本是webpack5:
> 在webpack5之前, 加载这些资源我们需要 使用一些 loader, 比如 raw-loader, url-loader, file-loader;
> 在webpack5开始, 我们可以直接使用 `资源模块类型(asset module type)`, 来替代上面的这些loader;
* 资源模块类型(asset module type), 通过添加4种新的模块类型, 来替换所有这些 loader;
> `asset/resource` 发送一个单独的文件并导出URL. 之前通过使用 `file-loader` 实现;
> `asset/inline` 导出一个资源的 data URI. 之前通过使用 `url-loader` 实现;
> `asset/source` 导出资源的源代码. 之前通过使用 `raw-loader` 实现;
> `asset` 在导出一个 data URI 和 发送一个单独的文件之间自动选择. 之前通过使用 `url-loader`, 并且配置资源体积限制实现;