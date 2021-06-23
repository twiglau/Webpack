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
 */