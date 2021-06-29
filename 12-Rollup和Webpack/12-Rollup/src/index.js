// ./src/index.js
// import { log } from './logger'
// import messages from './messages'
// log(messages.hi)

import {name,version} from '../package.json'
console.log(name,version)

//加载NPM模块
// import { camelCase } from 'lodash-es'
// console.log(camelCase('hello rollup'))

//导入 CommonJS 模块成员
import  cjs from './cjs-module'
//使用模块成员
console.log(cjs) // cjs => { foo: 'bar'}

//动态导入的模块会自动分包
import('./logger').then(({ log }) => {
    log('code splitting~')
})
