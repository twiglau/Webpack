
# 原生浏览器
1. 浏览器支持 ES Module, 原生浏览器加载不能省略 math.js 后缀名
2. 某些文件是不识别的 (ts, vue)
3. 如果包过多, 网络请求  

`    import { sum } from './js/math.js'   `
`    import _ from '../node_modules/lodash-es/lodash.default.js'   `


# 使用vite:
1. 不用加文件后缀名
2. 可以直接导入第三方库使用
3. 对样式文件默认加载处理
4. 对vue的支持
> 1. Vue 3 单文件组件支持: `@vitejs/plugin-vue`
> 2. Vue 3 JSX 支持: `@vitejs/plugin-vue-jsx`
> 3. Vue 2 支持: `underfin/vite-plugin-vue2`

# vite 原理
1. 建立 本地服务器 Connect
2. 浏览器向服务器请求资源时, 对应的就是: `title.less mul.ts` 编写的文件
3. vite 把我们编写的代码做了一个转化,生成 新的文件 -命名相同,但里面的代码已经转化
4. 当浏览器真正请求这些资源时,vite对这些资源做了转发.给浏览器返回转发后的代码: es6 js 浏览器可以识别的代码
5. 对第三方库进行预打包 `node_modules/.vite/` 文件夹下面

# vite 命令
1. 打包: `npx vite build`
2. 打包后预览: `npx vite preview`

# ESBuild解析, 相对于Babel
1. 超快的构建速度, 并且不需要缓存;
2. 支持ES6和CommonJS的模块化;
3. 支持ES6的Tree Shaking;
4. 支持Go, JavaScript的API;
5. 支持TypeScript, JSX等语法编译;
6. 支持SourceMap;
7. 支持代码压缩;
8. 支持扩展其他插件;

# ESBuild为什么这么快?
1. 使用Go语言编写的, 可以直接转换成机器代码, 而无需经过字节码;
2. ESBuild可以充分利用CPU的多内核,尽可能让他们饱和运行;
3. ESBuild的所有内容都是从零开始编写的,而不是使用第三方,所以从一开始就可以考虑各种性能问题;