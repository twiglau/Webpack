/**
 * 如何提高开发效率呢?先对一个较为理想的开发环境做出设想:
 * >首先,它必须能够使用HTTP服务运行而不是文件形式预览,这样的话,一来更接近生产环境状态,二来项目可能
 *  需要使用AJAX之类的API,以文件形式访问会产生诸多问题.
 * >其次,在修改完代码过后,Webpack能够自动完成创建,然后浏览器可以即时显示最新的运行结果,这样就大大减少了
 *  了开发过程中额外的重复操作,同时也会让我们更加专注,效率自然得到提升.
 * >最后,还需要能提供Source Map 支持,这样一来,运行过程中出现的错误就可以快速定位到源代码中的位置,而
 *  不是打包后结果中的位置,更便于我们快速定位错误,调试应用.
 * 
 * 主题: 学习如何增强使用Webpack的开发体验
 */

/**
 * 一,Webpack自动编译
 * 如果每次修改完代码,都是通过命令行手动重复运行Webpack命令,从而得到最新的打包结果,那么这样的操作过程根本
 * 没有任何开发体验可言.
 * 
 * 针对上述这个问题,可以使用Webpack CLI提供的另外一种watch工作模式来解决.
 * 在这种模式下,Webpack完成初次构建过后,项目中的源文件被监视,一旦发生任何改动,Webpack都会自动重新
 * 运行打包任务.
 * 
 * 具体的用法也非常简单,就是子启动Webpack时,添加一个 --watch 的CLI参数,这样的话,Webpack就会以监视
 * 模式启动运行. 在打包完成过后,CLI不会立即退出,它会等待文件变化再次工作,直到手动结束它或是出现不可控
 * 的异常.如下命令:
 * >>>>> npx webpack --watch
 * 
 * 
 * 在watch模式下我们就需专注编码,不必再去手动完成编译工作,相比于原始手动操作的方式,有明显进步.
 * 我们还可以再开启另外一个命令性终端,同时以HTTP形式运行我们的应用,然后打开浏览器去预览应用.
 * 
 * 我们还可以再开启另外一个命令行终端,同时以HTTP形式运行我们的应用,然后打开浏览器去预览应用.
 * 我们可以将浏览器移至屏幕的左侧,然后将编辑器移至右侧,此时我们尝试修改源代码,保存过后,以watch模式
 * 工作的Webpack就会自动重新打包,然后我们就可以在浏览器中 "主动刷新" 页面查看最新的结果,如下:
 * >>>>> npx serve dist(output)
 * 
 * 那此时我们的开发体验就是: 修改代码 -> Webpack自动打包 -> 手动舒心浏览器 -> 预览运行结果.
 * 
 * 注意:
 * 这里使用的静态文件服务器是一个npm模块,叫做 serve.
 * 
 * 此时距离我们目标状态还差一点,如果浏览器能够在Webpack打包过后自动刷新,那么开发体验
 * 将会更好一些.
 * 如果你已经了解一个叫作 BrowserSync工具,链接:https://www.browsersync.io/
 * 你应该知道BrowserSync就可以帮我们实现文件变化过后浏览器自动刷新的功能.
 * 
 * 所以,我们就可以使用 BrowserSync 工具替换 serve 工具,启动 HTTP 服务,这里还需要同时监听dist目录下文件的变化,如下:
 * 
 * > 可以先通过 npm 全局安装 browser-sync 模块, 然后再使用这个模块
 * > npm install browser-sync --global
 * > browser-sync dist --watch
 * 
 * > 或者也可以使用 npx 直接使用远端模块
 * > npx browser-sync dist --watch
 * 
 * 启动过后,回到编辑器,然后尝试修改源文件,保存完成以后浏览器就会自动刷新,显示最新结果.
 * 它的原理就是Webpack监视源代码变化,自动打包源代码到dist中,而dist中文件的变化又被
 * BrowserSync监听了,从而实现自动编译并且自动刷新浏览器的功能,整个过程由两个工具分别
 * 监视不同的内容.
 * 
 * 这种watch模式 + BrowserSync 虽然也实现了我们的需求,但是这种方法有很多弊端:
 * > 操作繁琐,我们需要同时使用两个工具,那么需要了解的内容就会更多,学习成本大大提高;
 * > 效率低下,因为整个过程中,Webpack会将文件写入磁盘, BrowserSync 再进行读取,过程
 *   中涉及大量磁盘读写操作,必然会导致效率低下.
 * 
 */

/**
 * 二, Webpack Dev Server
 * webpack-dev-server 同样也是一个独立的 npm 模块,所以需要通过 npm 将 webpack-dev-server
 * 作为项目的开发依赖安装. 安装完成后,这个模块为我们提供了一个叫做 webpack-dev-server 的 CLI 
 * 程序,我们同样可以直接通过 npx 直接去运行这个 CLI, 或者把它定义到 npm scripts 中,如下:
 * 
 * > 安装 webpack-dev-server
 * > npm install webpack-dev-server --save-dev
 * > 运行 webpack-dev-server
 * > npx webpack serve
 * 
 * 运行webpack-dev-server 这个命令时,它内部会启动一个 HTTP Sever,为打包的结果提供静态文件服务,并且
 * 自动使用 Webpack 打包我们的应用, 然后监听源代码的变化,一旦文件发生变化,它会立即重新打包.
 */

/**
 * 三,配置选项
 * Webpack配置对象中可以有一个叫做 devServer 的属性,专门用来为 webpack-dev-server 提供配置,如下:
 * 
 * // ./webpack.config.js
 * const path = require('path')
 * 
 * module.exports = {
 *     // ...
 *     devServer: {
 *        contentBase: path.join(__dirname,'dist'),
 *        compress:true,
 *        port:9000
 *        //....
 *        // 详细配置文档 https://webpack.js.org/configuration/dev-server/
 *     }
 * }
 */

/**
 * 四, 静态资源访问
 * webpack-dev-server 默认会将构建结果和输出文件全部作为开发服务器的资源文件,也就是说,只要通过 Webpack打包
 * 能够输出的文件都可以直接被访问到, 但是如果你还有一些没有参与打包的静态文件也需要作为开发服务器的资源被访问,
 * 那你就需要额外通过配置"告诉" webpack-dev-server.
 * 
 * 具体的方法就是在 webpack-dev-server 的配置对象中添加一个对应的配置. 我们回到配置文件中,找到 devServer
 * 属性,它的类型是一个对象,我们可以通过这个 devServer 对象的 contentBase 属性指定额外的静态资源路径.
 * 这个contentBase 属性可以是一个字符串或者数组,也就是说你可以配置一个或者多个路径,如下配置:
 * 
 * //  ./webpack.config.js
 * module.exports = {
 *     // ...
 *     devServer: {
 *        contentBase: 'public'
 *     }
 * }
 * 
 * 我们这里将这个路径设置为项目中的 public 目录,可能有人会有疑问,之前我们在使用插件的时候已经将这个目录通过
 * copy-webpack-plugin 输出到了输出目录,按照刚刚的说法,所有输出的文件都可以直接被serve,也就是能直接访问
 * 到,按道理应该不需要作为开发服务器的静态资源路径了
 * 
 * 确实是这样的,而且如果你能想到这一点,也就证明你真正理解了webpack-dev-server的文件造价规则.
 * 
 * 但是在实际使用Webpack时,我们一般都会把 copy-webpack-plugin 这种插件留在上线前的那一次打包中使用,而开发过程
 * 中一般不会用它,因为在开发过程中,我们会频繁重复执行打包任务,结社这个目录下需要拷贝的文件比较多,如果每次都需要执行
 * 这个插件,那打包过程开销就会比较大,每次构建的速度也就自然会降低.
 * 
 * 这个我们先移除 CopyWebpackPlugin,确保这里的打包不会输出public目录中的静态资源文件,然后会到命令行再次执行
 * > npx webpack serve
 * 启动过后,我们打开浏览器,这里我们访问的页面文件和bundle.js文件均来自于打包结果. 我们再尝试访问 favicon.ico,
 * 因为这个文件已经没有参与打包了,所以这个文件必然来源于 contentBase中配置的目录了.
 */

/**
 * 五,Proxy代理
 * 由于webpack-dev-server是一个本地开发服务器,所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上,而后端
 * 服务又是运行在另外一个地址上. 但是最终上线过后,我们的应用一般又会和后端服务部署到同源地址下.
 * 
 * 那这样就会出现一个非常常见的问题:
 * 在实际生产环境中能够直接访问的API,回到我们的开发环境后,再次访问这些API就会产生跨域请求问题.
 * 
 * 可能有人会说,我们可以用跨域资源共享(CORS)解决这个问题,确实如此,如果我们请求的后端API支持CORS,那这个问题就不成立了,
 * 但是并不是每种情况下服务端的API都支持CORS. 如果前后端应用是同源部署,也就是 协议/域名/端口 一致,那这种情况下,根本
 * 没有必要开启 CORS, 所以跨域请求的问题仍然是不可避免的.
 * 
 * 那解决这种开发阶段跨域请求问题最好的办法,就是在开发服务器中配置一个后端API的代理服务,也就是把后端服务代理到本地的开发
 * 服务地址.
 * 
 * webpack-dev-server就支持直接通过配置的方式,添加代理服务. 接下来,来看下具体用法.
 * 
 * 这里我们假定Github的API就是我们应用的后端服务,那我们的目标就是将 Github API 代理到本地开发服务器中.
 * 
 * Github API 的 Endpoint 都是在跟目录下,也就是说不通的 Endpoint 只是 URL 中的路径部分不通,例如:
 * https://api.github.com/users 和 https://api.github.com/events
 * 
 * 知道API地址的规则过后,我们回到配置文件中,在devServer配置属性中添加一个proxy属性,这个属性需要是一个对象,对象中的每个
 * 属性就是一个代理规则配置.
 * 
 * 属性的名称是需要被代理的请求路径前缀,一般为了辨别,我都会设置为 /api, 值是所对应的代理规则配置,我们将代理目标地址设置Wie:
 * https://api.github.com, 如下:
 * 
 * //   ./webpack.config.js
 * module.exports = {
 *    // ...
 *    devServer: {
 *       proxy: {
 *          '/api': {
 *             target: 'https://api.github.com'
 *           }
 *       }
 *    }
 * }
 * 
 * 那此时我们请求 http://localhost:8080/api/users, 就相当于请求了
 *              http://api.github.com/api/users
 * 而我们真正希望请求的地址是 https://api.github.com/uses, 所以对于代理路径开头的 /api 我们要重写掉.我们可以添加一个
 * pathRewrite 属性来实现代理路径重写,重写规则就是把路径中开头的 /api 替换为空, pathRewrite 最终会以正则的方式来替换
 * 请求路径.
 * 
 * //   ./webpack.config.js
 * module.exports = {
 *    // ...
 *    devServer: {
 *       proxy: {
 *         '/api': {
 *            target: 'https://api.github.com',
 *            pathRewrite: {
 *               '^/api': '' // 替换掉dialing地址中的 /api
 *            }
 *          }
 *       }
 *    }
 * }
 * 
 * 除此之外,我们还需设置一个 changeOrigin 属性为 true. 这是因为默认代理服务器会以我们实际在浏览器中请求的主机名,也就是
 * localhost:8080 作为代理请求中的主机名. 而一般服务器需要根据请求的主机名判断是哪个网站的请求,那localhost:8080这个主机名,
 * 对于Github的服务器来说,肯定无法正常请求所以需要修改.
 * 
 */