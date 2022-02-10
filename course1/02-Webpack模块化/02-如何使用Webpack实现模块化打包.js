/**
 * 在上一课时的最后我们提出了对模块haul打包方案或工具的设想或者说是诉求:
 * >> 能够将散落的模块打包到一起;
 * >> 能够编译代码中的新特性;
 * >> 能够支持不同种类的前端资源模块;
 * 
 * 一,其中最为主流的就是Webpack, Parcel 和 Rollup, 以Webpack为例:
 * >> Webpack 作为一个模块打包工具,本身就可以解决模块化代码打包的问题,将零散的JavaScript代码
 * 打包到一个JS文件中.
 * >> 对于有环境兼容问题的代码,Webpack可以在打包过程中通过Loader机制对其实现编译转换,然后再
 * 进行打包
 * >> 对于不同类型的前端模块类型,Webpack支持在JavaScript中以模块化的方式载入任意类型的资源文件,
 * 例如,我们可以通过Webpack实现在JavaScript中加载CSS文件,被加载的CSS文件将会通过style标签的
 * 方式工作.
 * >> 除此外,Webpack还具备代码拆分能力,它能够将应用中所有的模块按照我们的需要分块打包,这样,就
 * 不用担心全部代码打包到一起,产生单个文件过大,导致加载慢的问题,我们可以摆应用初次加载所必须的模块
 * 打包到一起,其他的模块再单独打包,等到应用工作过程中实际需要用到某个模块,在异步加载该模块,实现增
 * 量加载,或者叫作渐进式加载.
 * 
 * 
 */

//P.S. webpack 是Webpack的核心模块, webpack-cli 是 Webpack的CLI程序,用来在命令行中调用Webpack.
/**
 * 安装完成之后,webpack-cli 所提供的CLI程序就会出现在 node_modules/.bin目录当中,我们可以通过
 * npx 快速找到CLI并运行它,具体操作如下:
 * 
 * $ npx webpack --version
 * 
 * P.S. npx 是 npm 5.2以后新增的一个命令,可以用来更方便的执行远程模块或者项目 node_modules中的CLI程序.
 * 
 * 有了Webpack后,就可以直接运行webpack命令来打包JS模块代码,如下:
 * 
 * $ npx webpack
 * 这个命令在执行的过程中,Webpack会自动从src/index.js文件开始打包,然后根据代码中的模块导入操作,自动将
 * 所有用到的模块代码打包到一起.
 * 
 * 完成之后,控制台会提示: 顺着index.js有两个JS文件被打包到了一起. 与之对应的就是项目的根目录下多出了一个dist
 * 目录,我们的打包结果就存放在这个目录下的 main.js 文件中.
 * 
 * 对于Webpack最基本的使用,总结下来就是:
 * 先安装webpack相关的npm包,然后使用webpack-cli所提供的命令行工具进行打包.
 */

/**
 * 二, 配置 Webpack 的打包过程
 * Webpack4 以后的版本支持零配置的方式直接启动打包,整个过程会按照约定将 src/index.js 作为打包入口,最终打包的
 * 结果会存放到 dist/main.js 中.
 * 
 * 但很多时候我们需要自定义这些路径约定,例如,在下面这个案例,我需要它的打包入口是 src/main.js,那此时我们通过
 * 配置文件的方式修改Webpack的默认配置,在项目的根目录下添加一个 webpack.config.js,如下:
 * 
 * 02-configuation
 *   ----src
 *     --heading.js
 *     --main.js
 *   ----index.html
 *   ----package.json
 *   ----webpack.config.js 
 * webpack.config.js 是一个运行在Node.js环境中的 JS 文件,也就是说我们需要按照 CommonJS 的方式编写代码,这个
 * 文件可以导出一个对象,我们可以通过导出对象的属性完成相应的配置选项.
 * 
 * 这里先尝试添加一个entry属性,这个属性的作用就是指定Webpack打包的入口文件路径.我们将其设置为 src/main.js,如下:
 * // ./webpack.config.js
 * module.exports = {
 *    entry: './src/main.js'
 * }
 * 除了entry的配置以外,还可以通过 output 属性设置输出文件的位置. output属性的值必须是一个对象,通过这个对象的
 * filename 指定输出文件的文件名称, path指定输出的目录,如下:
 * // ./webpack.config.js
 * const path = require('path')
 * module.exports = {
 *    entry: './src/main.js',
 *    output: {
 *       filename: 'bundle.js',
 *       path: path.join(__dirname,'output')
 *    }
 * }
 * 
 * TIPS: webpack.config.js 是运行在Node.js环境中代码,所以直接可以使用path之类的Node.js内置模块.
 */

/**
 * 三, 让配置文件支持智能提示
 * 在这里,有编写Webpack配置文件时用过的一个小技巧,因为Webpack的配置项比较多,而且很多选项都支持不同类型的配置方式. 如果
 * 刚刚接触Webpack的配置,这些配置选项一定会让你头大,如开发工具能够为Webpack配置文件提供智能提示的话.
 * 
 * 默认VSCode并不知道Webpack配置对象的类型,我们通过import 的方式导入 Webpack 模块中的 Configuration类型,然后根据类型
 * 注释的方式将变量标注为这个类型,这样我们在编写这个对象的内部结果时就可以有正确的智能提示了,如下:
 * // ./webpack.config.js
 * import { Configuration } from 'webpack'
 * 
 * @type {configuration}
 * const config = {
 *    entry: './src/index.js',
 *    output: {
 *       filename: 'bundle.js'
 *    }
 * }
 * module.exports = config
 * 
 * 需要注意的是: 我们添加的 import 语句只是为了导入Webpack配置对象的类型,这样做的目的是为了标注config对象的类型,从而
 * 实现智能提示. 在配置完成后一定要记得注释掉这段辅助代码,因为在Node.js环境中默认还不支持 import 语句,如果执行这段代码
 * 会出现错误.
 * 
 * 使用import语句导入Configuration类型的方式固然好理解,但是在不同的环境中还是会有各种各样的问题,例如我们这里在Node.js
 * 环境中,就必须要额外注释掉这个导入类型的语句,才能正常工作.
 * 
 * 所以一般做法是直接在类型注释中使用import动态导入类型,如下:
 * // ./webpack.config.js
 * @type {import('webpack').Configuration}
 * const config = {
 *     entry: './src/index.js',
 *     output: {
 *         filename:'bundle.js'
 *     }
 * }
 * module.exports = config
 * 
 * 不过需要注意一点,这种导入类型的方式并不是 ES Modules 中的 Dynamic Imports, 而是 TypeScript中提供特性. 虽然这里只是一个
 * JavaScript文件,但是在VSCode中的类型系统都是基于TypeScript的,所以可以直接按照这种方式使用.
 * 
 * 其次,这种 @type类型 注释的方式是基于 JSDoc 实现的,JSDoc中类型注释的用法还有很多,详细可以参考
 */

/**
 * 四,Webpack 工作模式
 * Webpack 4 以后新增了一个工作模式的用法,这种用法大大简化了 Webpack 配置的复杂程度. 你可以把它理解为针对不同环境的几组预设配置:
 * > production 模式下, 启动内置优化插件,自动优化打包结果,打包速度偏慢;
 * > development 模式下, 自动优化打包速度,添加一些调试过程中的辅助插件;
 * > none模式下,运行最原始的打包,不做任何额外处理.
 * 
 * 针对工作模式的选项,如果你没有配置一个明确的值,打包过程中命令行终端会打印一个对应的配置警告.在这种情况下Webpack将默认使用production
 * 模式去工作.
 * 
 * production模式下Webpack内部会自动启动一些优化插件,例如,自动压缩打包后的代码,这对实际生产环境是非常友好的,但是打包的结果无法阅读.
 * 修改Webpack工作模式的方式有两种:
 * > 通过 CLI --mode 参数传入;
 * > 通过配置文件设置 mode 属性;
 * 
 */

/**
 * 五,打包结果运行原理
 * 按照none模式打包完成后,查看bundle.js.
 */

/**
 * 总结:
 * 1.Webpack是如何满足模块化打包需求的.
 * 2.Webpack打包的配置方式以及一个可以实现配置文件智能提示的小技巧
 * 3.Webpack工作模式特性的作用.
 * 4.通过Webpack打包后的结果是如何运行起来的?
 */