//1 ./rollup.config.js
// export default {
//     input: 'src/index.js',
//     output: {
//       file: 'dist/bundle.js',
//       format: 'es' // 输出格式
//     }
//   }

//2 ./rollup.config.js
// 所有 Rollup 支持的格式
// const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system']
// export default formats.map(format => ({
//   input: 'src/index.js',
//   output: {
//     file: `dist/bundle.${format}.js`,
//     format
//   }
// }))

//3 ./rollup.config.js
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
export default {
  input: 'src/index.js',
  output: {
    // file: 'dist/bundle.js', //code splitting 输出的是多个文件
    dir:'dist',
    format:'es'
  },
  plugins: [
    json(),
    resolve(), //
    commonjs() //支持commonjs
  ]
}