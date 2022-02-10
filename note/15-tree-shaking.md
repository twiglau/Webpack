# tree shaking(摇树优化)  
* 概念: 1个模块可能有多个方法,只要其中的某个方法使用到了,则整个文件都会被打到 bundle 里面去, tree shaking 就是只把用到的方法打入 bundle, 没用到的方法会在 uglify 阶段被檫除掉.  
* 使用: webpack 默认支持, 在 .babelrc 里设置 modules: false 即可  
* 要求: 必须是 ES6 的语法, CJS 的方式不支持  

# 原理 DCE(Elimination)  
* 代码不会被执行,不可到达  
* 代码执行的结果不会被用到  
* 代码只会影响死变量 (只写不读)  

# Tree-shaking 原理  
* 利用 ES6 模块的特点: 
> tree-shaking 最本质的是需要对模块代码进行静态分析,因此,在编译阶段是否有用到,是需要确定下来的,不能在代码运行时,再去分析那些代码没有用到.  
> 在分析到那些代码没有用到时,做些标记,注释,在uglify阶段,删除无用代码
> 只能作为模块顶层的语句出现  
> import 的模块名只能是字符串常量  
> import binding  是 immutable 的  

* 代码檫除:  uglify阶段删除无用代码  
