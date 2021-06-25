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
 * 模式启动运行. 在打包完成过后,CLI不会立即退出,它会等待文件变化再次工作,
 * 
 */