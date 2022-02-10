/**
 * 一, All in one 的弊端
 * 通过Webpack实现前端项目整体模块化的优势固然明显,但是它也会存在一些弊端:
 * 它最终会将我们所有的代码打包到一起. 试想一下,如果应用非常复杂,模块非常多,
 * 那么这种All in One 的方式就会导致打包的结果过大,甚至超过 4~5M.
 * 
 * 在绝大多数的情况下,应用刚开始工作时,并不是所有的模块都是必需的.如果这些
 * 模块全部被打包到一起,即便应用只需要一两个模块工作,也必须先把bundle.js整体
 * 加载进来,而且前端应用一般都是运行在浏览器端,这也意味着应用的响应速度会受到
 * 影响,也会浪费大量的流量和带宽.
 * 
 * 所以这种All in One 的方式并不合理,更为合理的方案是:
 * 把打包的结果按照一定的规则分离到多个bundle中,然后根据应用的运行需要按需加载.
 * 这样就可以降低启动成本,提高响应速度.
 * 
 * 可能你会联想到在开篇词中讲过,Webpack就是通过把项目中散落的模块打包到一起,从而
 * 提高加载效率,那么为什么这里又要分离?这不是自相矛盾吗?
 * 
 * 其实这并不矛盾,只是物极必反罢了. Web应用中的资源受环境所限,太大不行,太碎更
 * 不行. 因为我们开发过程中划分模块的颗粒度一般都会非常的细,很多时候一个模块只是
 * 提供了一个小工具函数,并不能形成一个完整的功能单元.
 * 
 * 如果我们不讲这些资源模块打包,直接按照开发过程中划分的模块颗粒度进行加载,那么运行
 * 一个小小的功能,就需要加载非常多的资源模块.
 * 
 * 再者,目前主流的 HTTP 1.1 本身就存在一些缺陷,如下;
 * > 同一个域名下的并行请求是有限制的;
 * > 每次请求本身会有一定的延迟;
 * > 每次请求除了传输内容,还有额外的请求头,大量请求的情况下,这些请求头加在一起也会浪费流量和带宽.
 * 
 * 综上所述,模块打包肯定是必要的,但当应用体积越来越大时,也要学会变通.
 */

/**
 * 二, Code Splitting
 * 为了解决打包结果过大导致的问题:
 * Webpack 设计了一种分包功能: Code Splitting(代码分割)
 * Code Splitting 通过把项目中的资源模块按照我们设计的规则打包到不同的bundle中,从而
 * 降低应用的启动成本,提高响应速度.
 * 
 * Webpack 实现分包的方式主要有两种:
 * > 根据业务不同配置多个打包入口,输出多个打包结果;
 * > 结合 ES Modules 的动态导入 (Dynamic Imports) 特性,按需加载模块.
 */

/**
 * 三, 多入口打包
 * 多入口打包一般适用于传统的多页应用程序,最常见的划分规则就是一个页面对应一个
 * 打包入口,对于不同页面间公用的部分,再提取到公共的结果中.
 * 
 * Webpack 配置多个入口打包的方式非常简单,如下:
 * .
 * -- dist
 * -- src
 *    --- common
 *      -- fetch.js
 *      -- global.css
 *    --- album.css
 *    --- album.html
 *    --- album.js
 *    --- index.css
 *    --- index.html
 *    --- index.js
 * -- package.json
 * -- webpack.config.js
 * 
 * 这个示例中有两个页面,分别是index和album,代码组织逻辑也很简单:
 * > index.js 负责实现index页面的功能逻辑;
 * > album.js 负责实现 album 页面功能逻辑;
 * > global.css 是公用的样式文件;
 * > fetch.js 是一个公用的模块,负责请求API;
 * 
 * 回到配置文件中,尝试为这个案例配置多个入口打包,如下:
 * 
 * // ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * module.exports = {
 *     entry: {
 *       index: './src/index.js',
 *       album: './src/album.js'
 *     },
 *     output: {
 *       filename:'[name].bundle.js'
 *     },
 *     // ...其他配置
 *     plugins: [
 *        new HtmlWebpackPlugin({
 *            title: 'Multi Entry',
 *            template: './src/index.html',
 *            filename: 'index.html'
 *        }),
 *        new HtmlWebpackPlugin({
 *            title: 'Multi Entry',
 *            template: './src/album.html',
 *            filename: '.album.html'
 *        })
 *     ]
 * }
 * 
 * 一般entry属性中只会配置一个打包入口,如果需要配置多个入口,可以把 entry 定义成一个对象.
 * 注意:
 * 这里entry是定义为对象而不是数组,如果是数组的话就是把多个文件打包到一起,还是一个入口.
 * 
 * 在这个对象中一个属性就是一个入口,属性名称就是这个入口的名称,值就是这个入口对应的文件路径.
 * 那这里配置的就是index和album页面所对应的JS文件路径.
 * 
 * 一旦入口配置为多入口形式,那输出文件名也小修改,因为两个入口就有两个打包结果,不能都叫做 bundle.js.
 * 可以在这里使用 [name] 这种占位符输出动态的文件名, [name]最终会被替换为入口的名称.
 * 
 * 除此之外,在配置中还通过 html-webpack-plugin 分别为 index 和 album 页面生成了对应的
 * HTML文件.
 * 
 * 完成配置之后,就可以打开命令行终端,运行Webpack打包,那此次打包会有两个入口. 打包完成后,找到
 * 输出目录,这里就能看到两个入口文件各自的打包结果,如下:
 * 
 * 10.1 示例图
 * 
 * 但是这里还有个小问题,我们打开任意一个输出的HMTL文件,如下:
 * 
 * 10.2 示例图
 * 
 * 就会发现 index 和 album 两个打包结果都被页面载入了,而我们希望的是每个页面只使用它对应的那个
 * 输出结果.
 * 
 * 所以这里还需要修改配置文件,回到配置文件中,找到输出HMTL的插件,默认这个插件会自动注入所有的打包结果,
 * 如果需要指定所使用的 bundle, 可以通过 HtmlWebpackPlugin 的 chunks 睡醒来设置.我们分别为两个
 * 页面配置使用不同的 chunk,如下:
 * 
 * TIPS: 每个打包入口都会形成一个独立的 chunk(块)
 * 
 * //  ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * module.exports = {
 *    entry: {
 *        index: './src/index.js',
 *        album: './src/album.js'
 *    },
 *    output: {
 *        filename:'[name].bundle.js', // [name] 是入口名称
 *    },
 *    // ...其他配置
 *    plugins: [
 *         new HtmlWebpackPlugin({
 *           title: 'Multi Entry',
 *           template: './src/index.html',
 *           filename: 'index.html',
 *           chunks: ['index'] //指定使用 index.bundle.js
 *         }),
 *         new HtmlWebpackPlugin({
 *            title: 'Multi Entry',
 *            template:'./src/album.html',
 *            filename: 'album.html',
 *            chunks:['album']  //指定使用 album.bundle.js
 *         })
 *    ]
 * }
 * 
 * 完成以后再次回到命令行终端,然后运行打包,打包结果如下:
 * 
 * 10.3 示例图
 * 
 * 这次打包的结果就完全正常了.
 * 以上就是配置多入口打包的方法,以及如何指定在HTML中注入的bundle.
 */

/**
 * 四, 提取公共模块
 * 多入口打包本身非常容易理解和使用,但是它也存在一个小问题,就是不同的入口中一定
 * 存在一些公共使用的模块,如果按照目前这种多入口打包的方式,就会出现多个打包结果
 * 中有相同的模块的情况.
 * 
 * 例如上述案例中, index入口和album入口中就共同使用了 global.css 和 fetch.js这
 * 两个公共的模块,这里是因为示例比较简单,所以重复的影响没有那么大,但是如果我们公共
 * 使用的是jQuery 或者 Vue.js 这些体积比较大的模块,那影响就会比较大,不利于公共
 * 模块的缓存.
 * 
 * 所以还需要把这些公共的模块提取到一个单独的bundle中,Webpack中实现公共模块提取非常
 * 简单,只需要在优化配置中开启splitChunks功能就可以了,配置如下:
 * 
 * //   ./webpack.config.js
 * module.exports = {
 *     entry: {
 *         index: './src/index.js',
 *         album: './src/album.js'
 *     },
 *     output: {
 *         filename: '[name].bundle.js' // [name] 是入口名称
 *     },
 *     optimization: {
 *         splitChunks: {
 *            //自动提取所有公共模块到单独 bundle
 *            chunks: 'all'
 *         }
 *     }
 *     // ...其他配置
 * }
 * 
 * 回到配置文件中,这里在 optimization 属性中添加 splitChunks属性,那这个
 * 属性的值是一个对象,这个对象需要配置一个 chunks 属性,这里将它设置为 all,
 * 表示所有公共模块都可以被提取.
 * 
 * 完成以后打开命令行终端,再次运行Webpack打包,如下:
 * 
 * 10.4 示例图
 * 
 * 此时在我们的dist 下就会额外生成一个JS文件,在这个文件中就是 index 和 album
 * 中公共的模块部分
 * 
 * 除此之外, splitChunks 还支持喝多高级的用法,可以实现各种各样的分包策略,这些可
 * 以在 文档(https://webpack.js.org/plugins/split-chunks-plugin/) 中找到对应的介绍.
 */

/**
 * 五, 动态导入
 * 除了多入口打包的方式,Code Splitting 更常见的实现方式还是结合ES Modules 的动态导入
 * 特性,从而实现按需加载.
 * 
 * 按需加载是开发浏览器应用中一个非常常见的需求,一般我们常说的按需加载值的是加载数据或者加载
 * 图片,但是我们这里所说的按需加载,指的是在应用运行过程中,需要某个资源模块时,才去加载这个
 * 模块. 这种方式极大地降低了应用启动时需要加载的资源体积,提高了应用的响应速度,同时也页节省
 * 了带宽和流量.
 * 
 * Webpack中支持使用动态导入的方式实现模块的按需加载,而且所有动态导入的模块都会被自动提取到
 * 单独的 bundle 中,从而实现分包.
 * 
 * 相比于多入口的方式,动态导入更为灵活,因为我们可以通过代码中的逻辑去控制需不需要加载某个
 * 模块,或者什么时候加载某个模块.而且我们分包目的中,很重要的一点就是让模块显现按需加载,从而
 * 提供应用的响应速度.
 * 
 * 接下来,具体来看如何使用动态导入特性,这里设计了一个发挥按需加载作用的场景,如下:
 * 
 * 10.5 示例图
 * 
 * 在这个应用的主题区域,如果访问的是首页,它显示的是一个文章列表,如果访问的是相册页,它显示的
 * 的就是相册列表.
 * 
 * 回到代码中,来看目前的实现方式,如下:
 * 
 * -- src
 *   -- album
 *     -- album.css
 *     -- album.js
 *   -- common
 *     -- fetch.js
 *     -- global.css
 *   -- posts
 *     -- posts.css
 *     -- posts.js
 *   -- index.html
 *   -- index.js
 * -- package.json
 * -- webpack.config.js
 * 
 * 文章列表对应的是这里的posts组件,而相册列表对应的是 album 组件,在打包入口(index.js)
 * 中同时导入了这两个模块,然后根据页面锚点的变化决定显示那个组件,核心代码如下:
 * 
 * //  ./src/index.js
 * import posts from './posts/posts'
 * import album from './album/album'
 * const update = () => {
 *    const hash = window.location.hash || '#posts'
 *    const mainElement = document.querySelector('.main')
 *    mainElement.innerHTML = ''
 *    if(hash === '#posts') {
 *       mainElement.appendChild(album())
 *    } else if(hash === '#album') {
 *       mainElement.appendChild(album())
 *    }
 * }
 * window.addEventListener('hashchange',update)
 * update()
 * 
 * 在这种情况下,就可能产生资源浪费. 假如:
 * 如果用户只需要访问其中一个页面,那么加载另外一个页面对应的组件就是浪费.
 * 
 * 如果采用动态导入的方式,就不会产生浪费的问题,因为所有的组件都是惰性加载,只有用到的时候
 * 才会去加载,具体如下:
 * 
 * //  ./src/index.js
 * // import posts from './posts/posts'
 * // import album from './album/album'
 * const update = () => {
 *    const hash = window.location.hash || '#posts'
 *    const mainElement = document.querySelector('.main')
 *    mainElement.innerHTML = ''
 *    if(hash === '#posts') {
 *       //mainElement.appendChild(posts())
 *       import('./posts/posts').then(({ default:posts }) =>{
 *          mainElement.appendChild(posts())
 *       })
 *    } else if (hash === '#album') {
 *       //mainElement.appendChild(album())
 *       import('./album/album').then(({default:album}) => {
 *          mainElement.appendChild(album())
 *       })
 *    }
 *  
 * }
 * window.addEventListener('hashchange',update)
 * update()
 * 
 * P.S. 为了动态导入模块,可以将import关键字作为函数调用. 当以这种方式使用时,import
 * 函数返回一个Promise对象. 这就是 ES Modules 标准中的 Dynamic Imports(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports).
 * 
 * 这里先移除 import 这种静态导入,然后在需要使用组件的地方通过import函数导入指定路径,
 * 那这个方法返回的是一个Promise. 在这个Promsie的then方法中我们能够拿到模块对象. 由于
 * 我们这里的posts 和 album 模块是以默认成员导出,所以我们需要解构对象中的default,先拿到
 * 导出成员,然后再正常使用这个导出成员.
 * 
 * 完成以后,Webpack Dev Server 自动重新打包,再次回到浏览器,此时应用仍然是可以正常工作的.
 * 
 * 那我们再回到命令性终端,重新运行打包,然后看看此时的打包结果具体是怎样的. 打包完成以后我们打开
 * dist目录,结果如下:
 * 
 * 10.6 示例图
 * 
 * 此时dist目录下就会额外多出三个JS文件,其中有两个文件是动态导入的模块,另外一个文件时动态导入
 * 模块中公共的模块,这三个文件就是有动态自动分包产生的.
 * 
 * 以上就是动态导入在Webpack中的使用,整个过程无需额外配置任何地方,只需要按照ES Modules动态
 * 导入的方式导入模块就可以了,Webpack内部会自动处理分包和按需加载.
 * 
 * 如果你使用的是Vue.js之类的SPA开发框架的话,那你项目中路由映射的组件就可以通过这种动态导入的
 * 方式实现按需加载,从而实现分包.
 * 
 */

/**
 * 六,魔法注释
 * 默认通过动态导入产生的bundle文件,它的name就是一个序号,这并没有什么不好,因为大多数
 * 时候,在生产环境中我们根本不用关心资源文件的名称.
 * 
 * 但是如果你还是需要给这些bundle命名的话,就可以使用Webpack所特有的魔法注释去实现,具体如下:
 * 
 * //魔法注释
 * /
 * 
 * */
 import(/** webpackChunkName:'posts' */'./posts/posts').then(({default:posts}) => {
     mainElement.appendElement(posts())
 })

 /**
  * 所谓魔法注释,就是在import函数的形式参数位置,添加一个行内注释,这个注释有一个特定的格式:
  * webpackChunkName:'', 这样就可以给分包的chunk起名字了.
  * 
  * 完成过后,再次打开命令行终端,运行Webpack打包,那此时我们生成bundle的name就会使用刚刚注释
  * 中提供的名称了,具体如下:
  * 
  * 10.7 示例图
  * 
  * 除此之外,魔法注释还有个特殊用途:
  * 如果你的chunkName相同的话,那相同的chunkName最终就会被打包到一起,例如:
  * 我们这里可以把这两个chunkName都设置为components,然后再次运行打包,那此时
  * 这两个模块都会被打包到一个文件中,具体操作如下:
  * 
  * 10.8 示例图
  * 
  * 借助这个特点,你就可以根据自己的时机情况,灵活组织动态加载模块了.
  */
 