
// 将一个文件内容,提取为 String 字符串 
const fs = require('fs');
const path = require('path');
module.exports = function (source) {
    const json = JSON.stringify(source)
       .replace('foo','')
       .replace(/\u2028/g, '\\u2028')
       .replace(/\u2029/g, '\\u2029');
    
    //1. 返回单个值 可以 export default
    //2. 返回多个值 可以 this.callback(null,json,json1,json2,json3)

    //1. 捕获错误: throw new Error('Error')
    //2. 捕获错误: this.callback(new Error('error'),null)
    return `export default ${json}`;
}