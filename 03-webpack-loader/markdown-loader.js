//1. 方式
// module.exports = source => {
//     //加载到的模块内容 => '# About\n\nthis is a markdown file.'
//     console.log(source)
//     //返回值就是最终被打包的内容
//     // return 'hello loader -'
//     return 'console.log("hello loader ~")'
// }

//2.方式
// const marked = require('marked')
// module.exports = source => {
//     const html = marked(source)
//     const code = `export default ${JSON.stringify(html)}`
//     return code
// }

const marked = require('marked')
module.exports = source => {
    //1. 将 markdown 转换为 html 字符串
    const html = marked(source)
    return html
}
