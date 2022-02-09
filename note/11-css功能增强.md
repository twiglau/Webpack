# CSS3 的属性需要前缀
* IE Trident(-ms) Geko(-moz) Webkit(-webkit) Presto(-o)

# PostCSS 插件 autoprefixer 自动补齐 CSS3 前缀  
* 使用 autoprefixer 插件  
> autoprefixer 是 CSS 的一个后置处理器,与 less , sass 不同[它们是预处理器]  
> 预处理器是在打包前处理,处理好后,再进行后置处理  
> 通常和 postcss-loader[功能: 样式补全功能, css-module功能, style-lint 功能 等] 一块使用  

* 根据 Can I Use [规则] (https://caniuse.com/)  

# 移动端CSS px自动转换成rem  
> rem 是什么?  
>> W3C 对rem 的定义: font-size of the root element  
>> rem 和 px 的对比:  
>>> .rem 是相对单位  
>>> .px 是绝对单位  

> 使用 px2rem-loader  
> 页面渲染时计算根元素的 font-size 值  
>> 可以使用手淘的 [lib-flexible](https://github.com/amfe/lib-flexible) 库  

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            }
        ]
    }
};
```