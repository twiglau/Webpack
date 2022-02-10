
/**
 * 先结论:
 * 
 * 1. 在开发过程中(开发环境),选择 cheap-module-eval-source-map,以下原因:
 * > 使用框架的情况比较多,已React 和 Vue.js为例,无论是 JSX 还是 vue 单文鸡蛋组件,Loader转换后差别
 *   都很大, 需要调试 Loader 转换前的源代码.
 * > 一般情况下,编写的代码每行不会超过80个字符,对我而言能够定位到行的位置就够了,而且省略信息还可以提升
 *   构建速度
 * > 虽然在这种模式下启动打包会比较慢,但大多数时间内使用的 webpack-dev-server都是在监视模式下重新打包,
 *   它重新打包的速度非常快.
 * 
 * 2. 至于发布前的打包,也就是生产环境的打包,选择none,它不会生成Source Map.
 * > 首先,Source Map 会暴露我的源代码到生产环境,如果没有控制Source Map 文件访问权限的话,但凡是有点技术
 * 的人都可以很容易的复原项目中涉及的绝大多数源代码,这非常不合理也不安全.
 * > 其次,调用应该是开发阶段的事情,你应该在开发阶段就尽量可能找到所有问题和隐患,而不是到了生产环境中再公测,
 * 如果你对自己的代码是在没有信心,建议选择 nosources-source-map模式,这样出现错误可定位到源码位置,也不至于暴露源码.
 */


/**
 * 一, Source Map 简介
 * Source Map(源代码地图) 就是解决此类问题最好的办法,作用:
 * 映射转换后的代码与源代码之间的关系,一段转换后的代码,通过转换构成中生成的Source Map
 * 文件就可以逆向解析得到对应的源代码.
 * 
 * 目前很多第三方库在发布的文件中都会同时提供一个.map后缀的Source Map 文件.例如 jQuery,
 * 我们可以打开它的 Source Map 文件看一下,如下:
 * 
 * 07-1 示例图
 * 
 * 这是一个JSON格式的文件,为了更容易阅读,该文件进行了格式化. 这个JSON里面记录的就是转换后
 * 和转换前代码之间的映射关系,以下几个属性:
 * 
 * > version 是指定所使用的 Source Map 标准版本;
 * > sources 中记录的是转换前的源文件名称,因为有可能出现多个文件打包转换为一个文件的情况,所以这里是一个
 *   数组;
 * > names 是源代码中使用的一些成员名称,我们都知道一般压缩代码时会将我们开发阶段编写的有意义的变量名替换
 *   为一些简短的字符,这个属性中记录的就是原始的名称;
 * > mappings属性,该属性最为关键,是一个叫作base64-VLQ编码的字符串,里面记录的信息就是转换后代码中的字符
 *   与转换前代码中的字符之间的映射关系,如下:
 * 
 * 07-2 示例图
 * 
 * 一般我们会在转换后的代码中通过添加一行注释的方式来去引入 Source Map 文件. 不过这个特性只是用于开发调试的,
 * 所以最新版本的jQuery已经去除了引入 Source Map 的注释,我们需要手动添加回来,这里我们在最后一行添加
 * //# sourceMappingURL=jquery-3.4.1.min.map,如下:
 * 
 * 07-3 示例图
 * 
 * 这样我们在 Chrome 浏览器中如果打开了开发人员工具,它就会自动请求这个文件,然后根据这个文件的内容逆向解析出来
 * 源代码,以便与调试. 同时因为有了映射关系,所以代码中如果出现了错误, 也就能自动定位找到源代码中的位置了.
 * 
 * 回到浏览器中,打开开发人员工具,找到 Source 面板,这里我们就能看到转换前的 jQuery 源代码了,如下:
 * 
 * 07-4 示例图
 * 
 * 我还还可以添加一个端点,然后刷新页面,进行单步调试,此时调试过程中使用的就是源代码而不是压缩过后的代码,如下:
 * 
 * 07-5 示例图
 * 
 */

/**
 * 二, Webpack中配置 Source Map
 * 使用Webpack打包的过程,同样支持为打包结果生成对应的 Source Map. 用法上也很简单,不过它提供了很多不同模式,导致
 * 大部分初学者操作起来可能会比较懵逼.
 * 接下来研究下: 在Webpack中如何开启Source Map, 然后再来了解一下几种不同的 Source Map 模式之间存在哪些差异.
 * 
 * 回到配置文件中,这个使用的配置属性叫做 devtool. 这个属性就是用来配置开发过程中的辅助工具,也就是与Source Map 
 * 相关的一些功能. 我们可以先将这个属性设置为 source-map, 具体代码如下:
 * 
 * //   ./webpack.config.js
 * module.exports = {
 *     devtool: 'source-map'     //source map 设置
 * }
 * 
 * 然后打开命令行终端,运行Webpack打包. 打包完成过后,我们打开 dist 目录,此时这个目录中就会生成我们 bundle.js 的
 * Source Map 文件, 与此同时 bundle.js 中也会通过注释引入这个Source Map 文件,如下:
 * 
 * 07-6 示例图
 * 
 * 再回到命令行, 通过 serve 工具把打包结果运行起来,然后打开浏览器,再打开开发人员工具,此时我们就可以直接定位到错误
 * 所在的位置了,当然如果需要调试,这里也可以直接调试源代码.
 * 
 * 07-7 示例图
 * 
 * 如果你只是需要使用 Source Map 的话,操作到这里就已经实现了, 但是只会使用这种最普通的 Source Map
 * 模式还远远不够.
 * 
 * 现阶段Webpack 支持的 Source Map 模式有很多种. 每种模式下所生成的 Source Map 效果和生成速度都不一样.
 * 具体哪种Source Map 模式才是最好?
 * 
 * Webpack中的devtool 配置,除了可以使用 source-map 这个值,它还支持很多其他的选项,具体如下:
 * 
 * 07-8 示例图
 */

/**
 * 三, Eval 模式
 * 了解JavaScript 中 eval 的一些特点.
 * eval其实指的是 JavaScript 中的一个函数,可以用来运行字符串中的 JavaScript代码,如下面这段代码,字符串中的
 * console.log("foo~") 就会作为一段JavaScript代码被执行:
 * 
 * const code = 'console.log("foo~")'
 * eval(code)   //将code中的字符串作为 JS 代码执行
 * 
 * 在默认情况下,这段代码运行在一个临时的虚拟机环境中,在控制台中就能够看到:
 * 
 * 07-9 示例图
 * 
 * 其实我们可以通过 sourceURL 来声明这段代码所属文件路径,接下来我们再来尝试在执行的 JavaScript 字符串中添加一个
 * sourceURL 的声明,操作如下:
 * 
 * 07-10 示例图
 * 
 * 具体就是在 eval 函数执行的字符串代码中添加一个注释,注释的格式: #sourceURL=./path/to/file.js,这样的话这段代码
 * 就会执行在指定路径下.
 * 
 * --->>>
 * 在了解了eval函数可以通过sourceURL指定代码所属文件路径这个特点过后,我们再来尝试使用这个叫做eval模式的Source Map.
 * 
 * 我们回到Webpack的配置文件中,将devtool属性设置为eval,具体如下:
 * 
 * //  ./webpack.config.js
 * module.exports = {
 *    devtool:'eval'
 * }
 * 然后回到命令行终端再次运行打包,打包过后,找到生成的 bundle.js 文件,会发现每个模块中的代码都被包裹到了一个eval函数中,
 * 而且每段模块代码的最后都会通过 sourceURL 的方式声明这个模块对应的源文件路径,如下:
 * 
 * 07-11 示例图
 * 
 * 那此时如果我们回到浏览器运行这里的 bundle.js, 一旦出现错误,浏览器的控制台就可以定位到具体是哪个模块中的代码,如下:
 * 
 * 07-12 示例图
 * 
 * 但是当你点击控制台中的文件名打开这个文件后,看到的却是打包后的模块代码,而并非我们真正的源代码,如下:
 * 
 * 07-13 示例图
 * 
 * 综上所述,在 eval 模式下, Webpack会将每个模块转换后的代码都放到eval函数中执行,并且通过sourceURL声明对应的文件路径,这样
 * 浏览器就能知道某以行代码到底是在源代码的那个文件中.
 * 
 * 因为在 eval 模式下并不会生成 Source Map 文件,所以它的构建速度最快,但是缺点同样明显: 它只能定位源代码的文件路径,无法知道
 * 具体的行列信息.
 */

/**
 * 四, 案例准备工作
 * 为了更好的对比不同模式的 Source Map 之间的差异,这里我们使用一个新项目,同时创建出不同模式下的打包结果,
 * 通过具体实验来横向对比它们之间的差异.
 * 
 * 在这个案例中,项目中只有两个 JS 模块,在 main.js中,加入一个运行时错误,具体项目结构和部分代码如下:
 * 
 * --- 07-devtool-diff
 *   ----src
 *     ------heading.js
 *     ------main.js
 *   ----package.json
 *   ----webpack.config.js
 * 
 * //  ./src/main.js
 * import createHeading from './heading.js'
 * const heading = createHeading()
 * document.body.append(heading)
 * console.log('main.js running')
 * //运行时错误
 * console.log111('main.js running')
 * 
 * 然后我们打开Webpack的配置文件,在这个文件中定义一个数组,数组中每个成员都是 devtool 配置取值的
 * 一种,具体代码如下:
 * 
 * const allDevtoolModes = [
 *   'eval',
 *   'cheap-eval-source-map',
 *   'cheap-module-eval-source-map',
 *   'eval-source-map',
 *   'cheap-source-map',
 *   'cheap-module-source-map',
 *   'inline-cheap-source-map',
 *   'inline-cheap-module-source-map',
 *   'source-map',
 *   'inline-source-map',
 *   'hidden-source-map',
 *   'nosources-source-map'
 * ]
 * 
 * 之前提过,Webpack 的配置文件除了可以导出一个配置对象,还可以导出一个数组,数组中每个元素就是一个单独的打包配置,
 * 那这样就可以在一次打包过程中同时执行多个打包任务.
 * 
 * 例如,我们这里导出一个数组,然后在这个数组中添加两个打包配置,它们的 entry 都是 src 中的 main.js, 不同它们输出
 * 的文件名不同,如下:
 * 
 * // ./webpack.config.js
 * module.exports = [
 *    {
 *       entry: './src/main.js',
 *       output: {
 *          filename: 'output1.js'
 *       }
 *    },
 *    {
 *       entry: './src/main.js'
 *       output: {
 *          filename: 'output2.js'
 *       }
 *    }
 * ]
 * 
 * 这么配置的话,再次打包就会有两个打包子任务工作,我们的dist中生成的结果也就是两个文件,具体结果如下:
 * 
 * 07-14 示例图
 */

// ./webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const allModes = [
    'eval',
    'cheap-eval-source-map',
    'cheap-module-eval-source-map',
    'eval-source-map',
    'cheap-source-map',
    'cheap-module-source-map',
    'inline-cheap-source-map',
    'inline-cheap-module-source-map',
    'source-map',
    'inline-source-map',
    'hidden-source-map',
    'nosources-source-map'
]

module.exports = allModes.map(item => ({
    devtool:item,
    mode:'none',
    entry:'./src/main.js',
    output: {
        filename:`js/${item}.js`
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: `${item}.html`
        })
    ]
}))

/**
 * 解释配置总的部分配置用意:
 * 
 * 1> 定义 devtool 属性, 它就是当前遍历的模式名称;
 * 2> 将mode设置为none, 确保Webpack内部不做额外处理;
 * 3> 设置打包入口和输出文件名称,打包入口都是 src/main.js,输出文件名称我们就放在js目录中,已模式名称命名,至于为什么放在单独目录中,
 *    你可以在接下来的内容中找到答案;
 * 4> 为js文件设置一个babel-loader,配置babel-loader的目的稍后能够辨别其中一类模式的差异.
 * 5> 配置一个html-webpack-plugin,也就是为每个打包任务生成一个HTML文件,通过前面的内容,我们知道html-webpack-plugin可以生成
 *    使用打包结果的HTML,接下来我们就是通过这些HTML在浏览器中进行尝试.
 * 
 * 配置完成以后,再次回到命令行终端运行打包,此时这个打包过程就自动生成了不同模式下的打包结果,如下图:
 * 
 * 07-15 示例图
 * 
 * 然后通过serve把结果运行起来,打开浏览器,此时我们能够在页面中看到每个使用不同模式SourceMap的HTMl文件,如下:
 * 
 * 07-16 示例图
 * 
 */

/**
 * 五, 不同模式的对比
 * 
 * 1. 首先 eval 模式,这个模式已单独看过,它就是将模块代码放到 eval 函数中执行,并且通过 sourceURL 标注所属文件路径,
 * 在这种模式下没有 Source Map 文件,所以只能定位是哪个文件出错,如下:
 * 
 * 07-17 示例图
 * 
 * 然后再来看一个叫作 eval-source-map的模式,这个模式也是使用eval函数执行模块代码,不过这里有所不同的是,eval-source-map
 * 模式除了定位文件,还可以定位具体的行列信息. 相比于 eval 模式,它能够生成 Source Map 文件,可以反推出源代码,如下:
 * 
 * 07-18 示例图
 * 
 * 紧接着再来一个叫做 cheap-eval-source-map的模式,根据这个模式的名字就能推断出一些信息, 它就是在 eval-source-map 基础上
 * 添加了一个 cheap, 也就是便宜的,或者叫廉价的. 用计算机行业的常用说法,就是阉割版的 eval-source-map, 因为它虽然也生成了
 * Source Map 文件,但是这种模式下的 Source Map 只能定位到行, 而定位不到列, 所以在效果上差了一点,但是构建速度会提升很多,如下:
 * 
 * 07-19 示例图
 * 
 * 再看一个叫做 cheap-module-eval-source-map 的模式, 慢慢地我们就发现Webpack中这些模式的名字不是随意的,好像都有某种规律. 这
 * 里就是在 cheap-eval-source-map 的基础上多了一个 module, 如下:
 * 
 * 07-20 示例图
 * 
 * 这种模式同样也只能定位到行,它的特点相比于 cheap-eval-source-map 并不明显,如果你没有发现差异,可以再去看看上一种模式,仔细做对比,
 * cheap-module-eval-source-map 中定位的源码与我们编写的源代码一模一样,
 * cheap-eval-source-map 模式中定位的源代码是经过ES6 转换后的结果,对比如下:(左图是cheap-eval-source-map):
 * 
 * 07-21 示例图
 * 
 * 这也是为什么之前要给 JS 文件配置 Loader 的原因:
 * 因为这种名字中带有module的模式,解析出来的源代码是没有经过Loader加工的,
 * 而名字中不带 module的模式, 解析出来的源代码是经过 Loader 加工后的结果
 * 
 * 也就是说如果想要还原一模一样的源代码,就需要选择 cheap-module-eval-source-map 模式.
 * 
 * 了解这些过后,基本上就算通盘了解了 Webpack 中所有Source Map 模式之间的差异,因为其他的模式无外乎就是这几个特点的排列组合.
 * 
 * 例如,
 * cheap-source-map 模式, 这个模式的名字中没有 eval, 意味着它没用 eval 执行代码, 而名字中灭有 Module, 意味着 Source Map
 * 反推出来的是Loader 处理后的代码, 有 cheap 表示只能定位源代码的行号.
 * 
 * 
 */

/**
 * 六, 几种特殊的模式
 * 
 * > inline-source-map 模式
 * 它更普通的source-map效果相同,只不过这种模式下 Source Map 文件不是已无力文件存在,而是以 data URLs的方式出现在代码中. 我们前面
 * 遇到的 eval-source-map 也是这种 inline 的方式
 * 
 * > hidden-source-map 模式
 * 在这个模式下,我们在开发工具中看不到 Source Map 的效果, 但是它也确实生成了 Source Map 文件,这就跟jQuery一样,虽然生成了 Source Map
 * 文件,但是代码中并没有引用对应的 Source Map 文件, 开发者可以自己选择使用.
 * 
 * > nosources-source-map 模式
 * 在这个模式下,能看到错误出现的位置(包含行列位置),但是点进去却看不到源代码. 这是为了保护源代码在生产环境中不暴露.
 */