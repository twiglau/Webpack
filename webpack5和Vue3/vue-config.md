# Vue 打包后不同版本解析  
* vue(.runtime).global(.prod).js:  
> 通过浏览器中的 <script src="..." /> 直接使用;
> 我们之前通过CDN引入和下载的Vue版本就是这个版本;
> 会暴露一个全局的Vue来使用;

* `vue(.runtime).esm-browser(.prod).js`:  
> 用于通过原生ES模块导入使用(在浏览器中通过 <script type="module" /> 来使用).  

* `vue(.runtime).esm-bundler.js`:  
> 用于 webpack, rollup 和 parcel 等构建工具;  
> 构建工具中默认是 `vue.runtime.esm-bundler.js`;  
> 如果我们需要解析模板 template, 那么需要手动指定 `vue.esm-bundler.js`;

* `vue.cjs(.prod).js`:  
> 服务器端渲染使用;  
> 通过require()在Node.js中使用;  

# 运行时 + 编译器 vs 运行时   

* 在Vue的开发过程中我们有三种方式来编写DOM元素:  
> 方式一: `template模板`的方式(之前经常使用的方式);
> 方式二: `render函数`的方式, 使用h函数来编写渲染的内容;
> 方式三: 通过`.vue文件`中的template来编写模板;  

* 它们的模板分别是如何处理的呢?  
> 方式二中的h函数可以直接返回一个 `虚拟节点`, 也就是 `Vnode节点`;
> 方式一和方式三的template都需要有`特定的代码` 来对其进行解析:  
>> 方式三.vue文件中的template可以通过在 `vue-loader` 对其进行编译和处理;  
>> 方式一中的 template 我们必须要 `通过源码中一部分代码` 来进行编译;  

* 所以, Vue在让我们选择版本的时候分为 运行时 + 编译器 vs 仅运行时  
> `运行时 + 编译器` 包含了对 template 模板的编译代码, 更加完整, 但是也更大一些;  
> `仅运行时` 没有包含对 template 版本的编译代码, 相对更小一些;  


# VSCode对SFC文件的支持
* 在前面我们提到过, 真实开发中多数情况下我们都是使用SFC(single-file components(单文件组件)).  
> VScode对SFC的支持:  
>> 插件一: Vetur, 从Vue2开发就一直在使用的VScode支持Vue的插件;
>> 插件二: Volar, 官方推荐的插件(后续会基于Volar开发官方的VScode插件);

# Vue GlobalFeatureFlags 的配置
> `__VUE_OPTIONS_API__`: vue2 options 的支持
> `__VUE_PROD_DEVTOOLS__`: false