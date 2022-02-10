/**
 * 目的: 通过开发一个Loader深入理解Webpack Loader机制的原理.
 * Webpack 想要实现的是整个前端项目的模块化,项目中的各种资源(包括CSS文件,图片等)都应该属于需要被管理的模块.
 * 换句话说,Webpack不仅是JavaScript模块打包工具,还是整个前端项目(前端工程)的模块打包工具,也就是说,可以通过
 * Webpack去管理前端项目的任意类型的资源文件.
 * 
 * Webpack实现不同种类资源模块加载的核心就是Loader.理解Loader机制?
 */

/**
 * 一,如何加载资源模块?
 * 尝试通过Webpack打包项目中的一个CSS文件,由此开始探索Webpack是如何加载资源模块的?
 * 如下实例:
 * 03-webpack-loader
 *    ----- src
 *        -----main.css
 *    ----- package.json
 *    ----- webpack.config.js
 * 
 * 你可能好奇: Webpack的打包入口不是应该是一个JS文件?这里为甚配置成了一个CSS文件?
 * 其实Webpack并没有强制要求我们必须以JS文件作为打包入口,只是在绝大多数情况下,会用JS文件作为
 * 打包入口,因为JS文件才是程序的逻辑入口,以JS入口作为入口相对更合理.
 * 
 * 配置完成过后回到命令行终端再次运行Webpack打包命令,此时你会发现命令行报出了一个模块解析错误
 * 错误信息大体意思是说,在解析模块过程中遇到了非法字符,而且错误出现的位置就是在我们的CSS文件中.
 * 出现这个错误的原因是因为 Webpack 内部默认只能够处理 JS 模块代码,也就是说在打包过程中,它默认把
 * 所有遇到的文件都当做JavaScript代码进行解析,但是此处我们让Webpack处理的是CSS代码,而CSS代码是不
 * 符合JavaScript语法的,所以自然会报出模块解析错误.
 * 
 * 这里有一个非常重要的提示:
 * You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. 
 * （我们需要用适当的加载器来处理这种文件类型，而当前并没有配置一个可以用来处理此文件的加载器）
 * 
 * 根据这个错误说明,发现Webpack 是用 Loader (加载器) 来处理每个模块的,而内部默认的Loader只能处理JS模块,
 * 如果需要加载其他类型的模块就需要配置不同的Loader. 
 * 如图 03.1示例图
 */

/**
 * 二,加载器的使用方式
 * 需要的是一个可以加载CSS模块的Loader,最常用到的是css-loader. 我们需要通过npm 先去安装这个Loader,然后在配置文件中添加对应的配置,
 * 具体操作和配置如下
 * > npm install css-loader --save-dev
 * 
 * // ./webpack.config.js
 * module.exports = {
 *     entry: './src/main.css',
 *     output: {
 *          filename:'bundle.js'
 *     },
 *     module: {
 *         rules: [
 *            {
 *               test:/\.css$/,
 *               use:'css-loader'
 *             }
 *         ]
 *     }
 * }
 * 在配置对象的 module 属性中添加一个rules数组. 这个数组就是我们针对资源模块的加载规则配置,其中的每个规则对象都需要设置
 * 两个属性:
 * >首先是test属性,它是一个正则表达式,用来匹配打包过程中所遇到文件路径,这个我们是以.css结尾;
 * >然后是use属性,它用来指定匹配到的文件需要使用的loader,这里用到的是css-loader.
 */

/**
 * 三,样式模块加载的问题?
 * 此时,如果你尝试在页面中使用这里输出的bundle.js文件,会发现刚刚的这个 main.css 模块并没有工作.
 * 解决方法是需要在额外添加一个 style-loader,样式就可以正常工作了.
 * 
 * 但是我们需要分析产生这个问题的真正原因,
 * 仔细阅读bundle.js文件,会发现css-loader的作用是将css模块转换为一个JS模块,具体的实现方法是将我们的CSS代码
 * push到一个数组中,这个数组是由css-loader内部的一个模块提供的,但是整个过程并没有任何地方使用到了这个数组.
 * 因此这里样式没有生效的原因是:
 * css-loader只会把CSS模块加载到JS代码中,而并不会使用这个模块.
 * 索引这里我们还需要在css-loader的基础上在使用一个style-loader,把css-loader转换后的结果通过style标签追加到
 * 页面上.
 * 
 * 安装完style-loader之后,我们将配置文件中的use属性修改为一个数组,将 style-loader也放进去.这里需要注意的是,一旦配置
 * 多个Loader,执行顺序是从后往前执行的,所以这里一定要将css-loader放在最后,因为必须要css-loader先把CSS代码转换为JS
 * 模块,才可以正常打包,具体配置如下:
 * 
 * // ./webpack.config.js
 * module.exports = {
 *    entry: './src/main.css',
 *    output: {
 *        filename:'bundle.js'
 *    },
 *    module: {
 *       rules: [
 *          {
 *             test: /\.css$/,
 *             //对同一个模块使用多个Loader,注意顺序
 *              use: [
 *                 'style-loader',
 *                 'css-loader'
 *              ]
 *          }
 *       ]
 *    }
 * }
 * 配置完成之后,再次回到命令行重新打包,此时bundle.js文件中会额外多出两个模块.
 * style-loader的作用总结:
 * 将css-loader中所加载到的所有样式模块,通过创建style标签的方式添加到页面上.
 */

/**
 * 四,通过JS加载资源模块?
 * 正如刚刚所提到的,一般Webpack打包的入口还是JavaScript,因为从某种程度上,打包入口就是应用的运行入口,而
 * 目前前端应用中的业务是由JS驱动的,所以更合理的做法还是把JS文件作为打包的入口,然后在JS代码中通过import语句
 * 去加载CSS文件.
 * 03-webpack-loader
 *   ----src
 *     -- style.css
 *     -- main.js
 *   ----package.json
 *   ----webpack.config.js
 * 
 * 即便是通过JS代码去加载的CSS模块,css-loader 和 style-loader 仍然可以正常工作. 因为Webpack在打包过程中会
 * 循环遍历每个模块,然后根据配置将每个遇到的模块交给对应的Loader去处理,最后再将处理完的结果打包到一起.
 */

/**
 * 五,为什么要在JS中加载其他资源?
 * Webpack为何要在JS中载入CSS呢?不是应该将样式和行为分离?
 * 其实Webpack不仅是建议我们在JavaScript中引入CSS,还会建议我们在代码中引入当前业务所需要的任意资源文件,因为真正需要
 * 这个资源的并不是整个应用,而是你此时正在编写的代码.
 * 
 * 假设:
 * 在开发页面上的某个局部功能是,需要用到一个样式模块和一个图片文件. 如果你还是将这些资源文件单独引入到HTML中,然后再到JS
 * 中添加对应的逻辑代码.试想一下,如果后期这个局部功能不用了,你就需要同时删除JS中的代码和HTML中的资源文件引入,也就是同时
 * 需要维护这两条线.而如果你遵照Webpack的这种设计,所有资源的加载都是由JS代码控制,后期也就只需要维护JS代码这一条线了.
 * 
 * 所以说,通过JavaScript代码去引入资源文件,或者说是建立JavaScript和资源文件的依赖关系,具有明显的优势,因为JavaScript代码
 * 本身负责完成整个应用的业务功能,放大来说就是驱动了整个前端应用,而JavaScript代码在实现业务功能的过程中需要用到 样式,图片
 * 等资源文件. 如果建立这种依赖关系:
 * > 一来逻辑上比较合理,因为JS确实需要这些资源文件配合才能实现整体功能;
 * > 二来配合Webpack这类工具的打包,能确保在上线时,资源不会缺失,而且都是必要的.
 */

/**
 * 六,开发一个Loader
 * Loader作为Webpack的核心机制,内部的工作原理却非常简单,接下来我们一起来开发一个自己的Loader,通过这个开发过程再来深入了解Loader
 * 的工作原理.
 * 
 * 需求:开发一个可以加载markdown文件的加载器,以便可以在代码中直接导入md文件.我们都应该知道markdown一般是需要转换为html之后再
 * 呈现到页面上的,所以我希望导入md文件后,直接得到markdown转换后的html字符串,如下图:
 * 03.2 所示
 * 由于这里需要直观地演示,就不再单独创建一个npm模块,而是直接在项目根目录下创建一个markdown-loader.js文件,完成后就可把这个模块发布到
 * npm上作为一个独立的模块使用.
 * 项目结果与核心代码如下:
 * 03-webpack-loader
 *   ------src
 *      ------about.md
 *      ------main.js
 *   -------package.json
 *   -------markdown-loader.js
 *   -------webpack.config.js
 * 
 * 每个Webpack的Loader都需要导出一个函数,这个函数就是我们这个Loader对资源的处理过程,它的输入就是加载到的资源文件内容,输出就是我们
 * 加工后的结果. 我们通过source参数接收输入,通过返回值输出.这里我们先尝试打印一下source,然后在函数的内部直接返回一个字符串hello loader~,
 * 具体如下:
 * 
 * // ./markdown-loader.js
 * module.exports = source => {
 *      //加载到的模块内容 => '# About \n\nthis is a markdown file.'
 *      console.log(source)
 *      //返回值就是最终被打包的内容
 *      return 'hello loader-'
 * }
 * 
 * 完成以后,我们回到Webpack配置文件中添加一个加载器规则,这里匹配到的扩展名是.md,使用的加载器就是我们刚刚编写的这个
 * markdown-loader.js模块,具体如下:
 * 
 * // ./webpack.config.js
 * module.exports = {
 *     entry: './src/main.js',
 *     output: {
 *         filename:'bundle.js'
 *     },
 *     module: {
 *        rules: [
 *           {
 *              test: /\.md$/,
 *              //直接使用相对路径
 *              use: './markdown-loader'
 *           }
 *        ]
 *     }
 * }
 * 
 * TIPS: 这里的use中不仅可以使用模块名称,还可以使用模块文件路径,这点与Node中的require函数是一样的.
 * 配置完成后,再次运行命令: npx webpack
 * 
 * 打包过程中命令行确实打印出来了我们所导入的Markdown文件内容,这就意味着Loader函数的参数确实是文件的
 * 内容.
 * 但同时也报出了一个解析错误:
 * You may need an additional loader to handle the result of these loaders.
 * 
 * 为甚么会出现以上的错误?
 * 其实Webpack加载资源文件的过程类似于一个工作管道,你可以在这个过程中依次使用多个Loader,但是最终这个管道
 * 结果过后的结果必须是一段标准的JS代码字符串.
 * 如图: 03.3 示例图
 * 所以我们这里才会出现上面提到的错误提示,那解决的办法也就很明显了:
 * >直接在这个Loader的最后返回一段JS代码字符串;
 * >在找一个合适的加载器,在后面接着处理我们这里得到的结果.
 * 
 * 1. 先来尝试第一种办法,回到 markdown-loader 中,我们将返回的字符串内容修改为
 * console.log('hello loader~'),然后再次运行打包,如下:
 * //  ./markdown-loader.js
 * module.exports = source => {
 *     //加载到的模块内容 => '#About\n\nthis is a markdown file.'
 *     console.log(source)
 *     //返回值就是最终被打包的内容
 *     return 'hello loader ~'
 *     
 *     return 'console.log("hello loader ~")'
 * }
 * 
 * 此时打包的结果,如下bundle_md.js.
 * 这个模块里面非常简单,就是把我们刚刚返回的字符串直接拼接到了该模块中,这也解释了刚刚Loader管道最后必须返回JS代码的原因,
 * 因为如果随便返回一个内容,放到这里语法就不通过了.
 */

/**
 * 七, 实现Loader的逻辑
 * 了解了Loader大致的工作机制后,再回到markdown-loader.js中,接着完成需求,这里需要安装一个能过将Markdown解析为HTML的模块,
 * 叫做marked.
 * 
 * 安装完成后,我们在markdown-loader.js中导入这个模块,然后使用这个模块去解析我们的source. 这里解析完的结果就是一段HTML字符串,
 * 如果我们直接返回的话同样会面临Webpack无法解析模块的问题,正确的做法是把这段HTML字符串拼接为一段JS代码.
 * 
 * 此时我们希望返回的代码是通过module.exports导出这段HTML字符串,这样外界导入模块时就可以接受到这个HTML字符串了,如果只是简单地拼接,
 * 那HTML种的换行和引号就都可能会造成语法错误,所以我这里使用了一个小技巧,如下:
 * 
 * // ./markdown-loader.js
 * const marked = require('marked')
 * module.exports = source => {
 *     //1. 将markdown 转换为 html 字符串
 *     const html = marked(source)
 *     //2. 将html字符串拼接为一段导出字符串的JS代码
 *     const code = `module.exports = ${JSON.stringify(html)}`
 *     return code
 * }
 * 先通过 JSON.stringify() 将字段字符串转换为标准的JSON字符串,然后再参与拼接,这样就不会有问题了.
 * 
 * 我们回到命令行再次运行打包,打包后的结果就是我们所需要的了.
 * 
 * 除了 module.exports 这种方式, Webpack 还允许我们在返回的代码中使用ES Modules的方式导出,例如,
 * 我们这里将module.exports修改了 export default,然后运行打包,结果同样是可以的,Webpack内部会自动
 * 转换ES Modules代码.
 * //  ./markdown-loader.js
 * const marked = require('marked')
 * 
 * module.exports = source => {
 *     const html = marked(source)
 *     const code = `export default ${JSON.stringify(html)}`
 *     return code
 * }
 */

/**
 * 八,多个Loader配合
 * 我们还可以尝试一下刚刚说的第二种思路,就是在我们这个markdown-loader中直接返回HTML字符串,然后交给下一个Loader处理,这
 * 就涉及多个Loader相互配合工作的情况了.
 * 
 * 回到代码中,这里直接返回marked解析后的HTML,如下:
 * //  ./markdown-loader.js
 * const marked = require('marked')
 * 
 * module.exports = source => {
 *     // 1. 将 markdown 转换为 html 字符串
 *     const html = marked(source)
 *     return html
 * }
 * 
 * 然后我们再安装一个处理HTML的Loader,叫做html-loader,如下:
 * //  ./webpack.config.js
 * module.exports = {
 *       entry: './src/main.js',
 *       output: {
 *           filename:'bundle.js',
 *       },
 *       module: {
 *          rules: [
 *              test: /\.md$/,
 *              use: [
 *                 'html-loader',
 *                 './markdown-loader'
 *              ]
 *          ]
 *       }
 * }
 * 安装完成过后回到配置文件,这里同样把use属性修改为一个数组,以便依次使用多个Loader,不过同样需要
 * 注意,这里的执行顺序是从后往前,也就是说我们应该把先执行的markdown-loader放在后面,html-loader
 * 放在前面.
 * 
 * 至此,就完成了这个markdown-loader模块.
 */