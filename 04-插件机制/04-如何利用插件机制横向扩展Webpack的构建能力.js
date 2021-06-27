/**
 * Webpack插件机制的目的是为了增强Webpack在项目自动化构建方面的能力.通过上一将的介绍,
 * Loader就是负责完成项目中各种各样资源模块的加载,从而实现整体项目的模块化,而Plugin则是
 * 用来解决项目中除了资源模块打包以外的其他自动化工作,所以说Plugin的能力范围更广,用于自然
 * 也就更多.
 * 
 * 以下几种常见的应用场景:
 * >实现自动在打包之前出清dist目录(上次的打包结果);
 * >自动生成应用所需要的HTML文件;
 * >根据不同环境为代码注入类似API地址这种可能变化的部分;
 * >拷贝不需要参与打包的资源文件导输出目录;
 * >压缩Webpack打包完成后输出的文件;
 * >自动发布打包结果到服务器实现自动部署;
 * 总之,有了Plugin的Webpack几乎"无所不能",借助插件,我们就可以轻松实现前端工程化中绝大多数经常用到的功能.
 * 接下来,通过一些常用插件的使用,具体聊聊Webpack的插件机制,最后在通过开发一个自己的插件,去理解插件的工作
 * 原理.
 */

/**
 * 一,体验插件机制
 * 1.自动清除输出目录的插件
 * 通过之前的尝试,会发现,Webpack每次打包接结果都是直接覆盖到dist目录,而在打包之前,dist目录中就可能已经存入
 * 了一些在上一次打包操作时遗留的文件,当我们再次打包是,只能覆盖掉同名文件,而那些已经移除的资源文件就会一直累积
 * 在里面,最终导致部署上线时出现多余文件.
 * 
 * 更为合理的做法就是在每次完整打包之前,自动清理dist目录,这样每次打包过后,dist目录中就只会存在哪些必要的文件.
 * 
 * clean-webpack-plugin这个插件就很好的实现了这一需求,它是一个第三方npm包
 * > npm install clean-webpack-plugin --save-dev
 * 
 * 安装过后,回到webpack配置文件中,导入clean-webpack-plugin插件,这个插件模块导出了一个叫做CleanWebpackPlugin
 * 成员,需先把它解构出来,如下:
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * 回到配置对象中,添加一个plugins属性,这个属性就是专门用来配置插件的地方,它是一个数组,添加一个插件就是在这个数组中
 * 添加一个元素.
 * 
 * //  ./webpack.config.js
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * module.exports = {
 *    entry: './src/main.js',
 *    output: {
 *       filename: 'bundle.js'
 *    },
 *    plugins: [
 *       new CleanWebpackPlugin()
 *    ]
 * }
 * 
 * 完成以上,可以测试clean-webpack-plugin插件的效果.
 * 一般来说,当我们有了某个自动化的需求过后,可以先去找到一个合适的插件,然后安装这个插件,最后将它配置到Webpack配置对象的
 * plugins数组中,这个过程唯一有可能不一样的地方就是,有的插件可能需要有一些配置参数.
 */

/**
 * 二,用于生成HTML的插件
 * 除了自动清理dist目录,还有一个非常常见的需求,就是自动生成使用打包结果的HTML,所谓使用打包结果指的是
 * 在HTML中自欧东注入Webpack打包生成的bundle.
 * 
 * 在使用接下来这个插件之前,我们的HTML文件一般都是通过硬编码的方式,单独存放在项目根目录下的,这种方式有两个问题:
 * > 项目发布时,我们需要同时发布根目录下的HTML文件和dist目录中所有的打包结果,非常麻烦,而且上线过后还要确保HTML
 * 代码中的资源文件路径是正确的.
 * >如果打包结果输出的目录或者文件名称发生变化,那HTML代码中所对应的script标签也需要我们手动修改路径.
 * 
 * 解决以上这两个问题最好的办法就是让Webpack再打包的同时,自动生成对应的HTML文件,让HTML文件也参与到整个项目的构建
 * 过程. 这样的话,在构建过程中,Webpack就可以自动将打包的bundle文件引入到页面中.
 * 
 * 相比与之前写死HTML文件的方式,自动生成HTML的优势在于:
 * > HTML也输出到dist目录中了,上线时我们只需要把dist目录发布出去就可以了;
 * > HTML中的script标签是自动引入的,所以可以确保资源文件的路径是正常的.
 * 
 * 具体的实现方式就需要借助于html-webpack-plugin插件来实现,这个插件也是一个第三方的npm模块,需要单独安装这个模块,如下:
 * > npm install html-webpack-plugin --save-dev
 * 安装完成过后,回到配置文件,载入这个模块,不同于clean-webpack-plugin, html-webpack-plugin插件默认导出的就是插件类型,
 * 不需要再结构内部成员,如下:
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * 有了这个类型过后,回到配置对象的plugins属性中,同样需要添加一下这个类型的实例对象,完成这个插件的使用,如下:
 * 
 * //  ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * module.exports = {
 *     entry: './src/main.js',
 *     output: {
 *        filename: 'bundle.js'
 *     },
 *     plugins: [
 *         new CleanWebpackPlugin(),
 *         new HtmlWebpackPlugin()
 *     ]
 * }
 * 
 * 最后会到终端,再次运行打包命令,此时打包过程中就会自动生成一个index.html文件导dist目录.
 * 至此,Webpack就可以动态生成应用所需的HTML文件了,但是这里仍然存在一些需要改进的地方:
 * > 对于生成的HTML文件,页面title必须要修改;
 * > 很多时候还需要我们自定义页面的一些meta标签和一些基础的DOM结构
 * 
 * 也就是说,还需要我们能够充分自定义这个插件最终输出的HTML文件.
 * 如果只是简单的自定义,可以通过修改HtmlWebpackPlugin的参数来实现.
 * 回到Webpack的配置文件中,这里我们给HtmlWebpackPlugin构造函数传入一个对象参数,用于指定配置选项.其中,title属性设置的是
 * HTML的标题,我们把它设置为 Webpack Plugin Simple. meta属性需要以对象的形式设置页面中的元数据标签,这里我们尝试为页面
 * 添加一个 viewport 设置,如下:
 * 
 * //  ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * module.exports = {
 *    entry: './src/main.js',
 *    output: {
 *        filename:'bundle.js'
 *    },
 *    plugins: [
 *       new CleanWebpackPlugin(),
 *       new HtmlWebpackPlugin({
 *          title: 'Webpack Plugin Sample',
 *          meta: {
 *             viewport: 'width=device-width'
 *          }
 *       })
 *    ]
 * }
 * 
 * 完成以后回到命令行终端,再次打包,查看HTML文件.
 * 
 * 这里在src目录下新建一个index.html文件作为HTML文件的模板,然后根据我们的需要在这个文件中添加相应
 * 的元素. 对于模板中动态的内容,可以使用Lodash模板语法输出,模板中可以通过htmlWebpackPlugin.options
 * 访问这个插件的配置数据,例如这里输出配置中的title属性,如下:
 * 
 * 有了模板文件后,回到配置文件中,通过HtmlWebpackPlugin的template属性指定所使用的模板,如下:
 * // ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * module.exports = {
 *     entry: './src/main.js',
 *     output: {
 *        filename: 'bundle.js'
 *     },
 *     plugins: [
 *        new CleanWebpackPlugin(),
 *        new HtmlWebpackPlugin({
 *            title: 'Webpack Test',
 *            template:'./src/index.html'
 *        })
 *     ]
 * }
 * 
 * 完成以后回到命令行终端,打包命令,再来看下生成的HTMl文件,此时HTML中就都是根据模板生成的内容了.
 * 至此,你应该了解如何通过html-webpack-plugin自定义输出HTML文件内容.
 * 
 * 关于html-webpack-plugin插件,除了自定义输出文件的内容,同属输出多个HTML文件也是一个非常常见的需求,除非我们的应用
 * 是一个单页应用程序,否则一定需要输出多个HTML文件.
 * 
 * 如果需要同时输出多个HTML文件,其实也非常简单,我们回到配置文件中,这里通过HtmlWebpackPlugin创建的对象就是用于生成
 * index.html的,那我们完全可以在创建一个新的实例对象,用于创建额外的HTML文件.
 * 
 * 例如,这里再来添加一个HtmlWebpackPlugin实例用于创建一个about.html的页面文件,需要通过filename指定输出文件名,这个属性
 * 的默认值是index.html,把它设置为about.html,如下:
 * 
 * // ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * module.exports = {
 *     entry: './src/main.js',
 *     output: {
 *       filename: 'bundle.js'
 *     },
 *     plugins: [
 *        new CleanWebpackPlugin(),
 *        //用于生成 index.html
 *        new HtmlWebpackPlugin({
 *             title: 'Webpack Plugin Sample',
 *             template:'./src/index.html'
 *        }),
 *        //用于生成 about.html
 *        new HtmlWebpackPlugin({
 *             filename:'about.html'
 *        })
 *     ]
 * }
 * 
 * 完成以后再次回到命令行终端,运行打包命令,此时dist目录中就同时生成了 index.html 和 about.html两个页面
 * 文件.
 */

/**
 * 三,用于复制文件的插件
 * 在项目中一般还有一些不需要参与构建的静态文件,那它们最终也需要发布到线上,如网站的favicon,robots.txt等.
 * 一般建议,把这类文件统一放在项目根目录下的public或者static目录汇总,希望Webpack在打包时一并将这个目录下
 * 所有的文件复制到输出目录.
 * 
 * 对于这种需求,可以使用copy-webpack-plugin插件来帮我们实现
 * 同理,需要先安装下copy-webpack-plugin插件,安装完成后,回到配置文件,导入这个插件类型.然后同样在plugins属性
 * 中添加一个这个类型的实例,如下:
 * 
 * //  ./webpack.config.js
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * const CopyWebpackPlugin = require('copy-webpack-plugin')
 * const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 * 
 * module.exports = {
 *      entry: './src/main.js',
 *      output: {
 *          filename: 'bundle.js'
 *      },
 *      plugins: [
 *          new CleanWebpackPlugin(),
 *          new HtmlWebpackPlugin({
 *              title: 'Webpack Plugin Sample',
 *              template: './src/index.html'
 *          }),
 *          new CopyWebpackPlugin({
 *              patterns: ['public'] //需要拷贝的目录或路径通配符
 *          })
 *      ]
 * }
 * 
 * 这个插件类型的构造函数需要我们传入一个字符串数组,用于指定需要拷贝的文件路径. 它可以是一个通配符,
 * 也可以是一个目录或者文件的相对路径. 这里传入的是public目录,表示将这个目录下所有文件全部拷贝到
 * 输出目录中,当然了,你还可以在这个数组中继续添加其他路径,这样它在工作时可以同时拷贝.
 * 
 * 配置完成以后回到命令行终端,再次运行Webpack,此时public目录下的文件就会同时拷贝到输出目录中.
 * 至此,我们简单了解了几个非常常用的插件,这里的重点是,你不仅要学会使用这几个插件的使用,还要能够总结
 * 出大多数插件在使用上的共性.
 */

/**
 * 四,开发一个插件
 * Webpack的插件机制就是我们在软件开发中最常见的钩子机制.
 * 具体有哪些预先定义好的钩子,可参考官方文档API:
 * > Compiler Hooks;--> https://webpack.js.org/api/compiler-hooks/
 * > Compilation Hooks;--> https://webpack.js.org/api/compilation-hooks/
 * > JavascriptParser Hooks;--> https://webpack.js.org/api/parser/
 * 
 * 接下来,我们开开发一个自己的插件,看看具体如何往这些钩子上挂载任务.
 * 
 * 这里,开发一个插件,能够自动清除Webpack打包结果中的注释,这样一来,我们的bundle.js将更容易阅读,
 * 如下.
 * 那这里我们同样在项目根目录下添加一个单独的JS文件.
 * 04-webpack-plugins
 *    ----public
 *      ------favicon.ico
 *    ----src
 *      ----main.js
 *    ----package.json
 *    ----remove-comments-plugin.js
 *    ----webpack.config.js
 * 
 * Webpack要求我们的插件必须是一个函数或是一个包含apply方法的对象,一般我们都会定义一个类型,在这个类型中定义apply
 * 方法,然后在使用时,再通过这个类型来创建一个实例对象去使用这个插件.
 * 
 * 这里定义一个RemoveCommentsPlugin类型,然后在这个类型中定义一个apply方法,这个方法会在Webpack启动时被调用,它接
 * 收一个compiler对象参数,这个对象是Webpack工作过程中最核心的对象,里面包含了此次构建的所有配置信息,我们就是通过这
 * 个对象去注册钩子函数,具体如下:
 * 
 * // ./remove-comments-plugin.js
 * class RemoveCommentsPlugin {
 *    apply(compiler) {
 *       console.log('RemoveCommentsPlugin 启动)
 *       //compiler => 包含了我们此次构建的所有配置信息
 *    }
 * }
 * 知道这些后,还需要明确我们这个任务的执行时机,也就是到底应该把这个任务挂载到按个钩子上?
 * 需求是删除bundle.js中的注释,也就是说只有当Webpack需要生成的bundle.js文件内容明确过后才可能实施.
 * 根据API文档中,找到一个叫做emit的钩子,这个钩子会在Webpack即将向输出目录输出文件时执行,非常符合我们的
 * 需求.
 * 
 * 回到代码,通过compiler对象的hooks属性访问到emit钩子,再通过tap方法注册一个钩子函数,这个方法接受两个
 * 参数:
 * > 第一个是插件的名称,我们这里的插件名称是RemoveCommentsPlugin;
 * > 第二个是要挂载到这个钩子上的函数;
 * 
 * 根据API文档中的提示,这里我们在这个函数中接收一个compilation对象参数,这个对象可以理解为此次运行打包的上下文,所有
 * 打包过程中产生的结果,都会放到这个对象中.
 * 
 * 我们可以使用这个对象中的assets属性获取即将写入输出目录的资源文件信息,它是一个对象,我们这里通过for in 去遍历这个对象,
 * 其中键就是每个文件的名称,我们尝试把它打印出来,如下:
 * 
 * //  ./remove-comments-plugin.js
 * class RemoveCommentsPlugin {
 *     apply (compiler) {
 *         compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
 *              // compilation ,可以理解为此次打包的上下文
 *              for(const name in compilation.assets) {
 *                   console.log(name) //输出文件名称
 *              }
 *         })
 *     }
 * }
 * 
 * 完成以后,将这个插件应用到Webpack的配置中,然后回到命令行重新打包,此时打包过程就会打印我们输出的文件名称,如下:
 * 
 * 再回到代码中,来打印一些每个资源文件的内容,文件内容需要通过遍历的值对象中的source方法获取,如下:
 * // ./remove-comments-plugin.js
 * class RemoveCommentsPlugin {
 *    apply(compiler) {
 *        compiler.hooks.emit.tap('RemoveCommentsPlugin',compilation => {
 *             for(const name in compilation.assets) {
 *                 console.log(compilation.assets[name].source())
 *             }
 *        })
 *    }
 * }
 * 回到命令行,再次打包,此时输出的文件内容也可以正常被打印
 * 能够拿到文件名和文件内容后,回到代码,这里需要先判断文件名是不是以.js结尾,因为Webpack打包还有可能输出别的文件,而
 * 我们需求只需要处理JS文件
 * 
 * 那如果是JS文件,将文件内容得到,再通过正则替换的方式移除掉代码中的注释,最后覆盖掉compilation.assets中对应的对象,在覆盖掉
 * compilation.assets中对应的对象,在覆盖的对象中,同样暴露一个source方法用来返回新的内容,另外还需要在暴露一个size方法,用来返回
 * 内容大小,这是Webpack内部要求的格式,如下:
 * class RemoveCommentsPlugin {
 *     apply(compiler) {
 *         compiler.hooks.emit.tap('RemoveCommentsPlugin',compilation => {
 *              for(const name in compilation.assets) {
 *                    if(name.endsWith('.js')) {
 *                        const contents = compilation.assets[name].source()
 *                        const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
                            compilation.assets[name] = {
                                source: () => noComments,
                                size: () => noComments.length
                            }
 *    
 *                     }
 *              }
 *         })
 *     }
 * }
 */