# 使用 source map  
> 作用: 通过 source map 定位到源代码  
>> [source map 科普文](http:///www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)  
> 开发环境开启,线上环境关闭  
>> 线上排查问题的时候可以将 sourcemap 上传到错误监控系统  

# source map 关键字  
* eval: 使用eval包裹模块代码  
* source map: 产生 .map 文件  
* cheap: 不包含列信息  
* inline: 将.map作为DataURI嵌入, 不单独生成 .map 文件  
* module: 包含loader 的 sourcemap  