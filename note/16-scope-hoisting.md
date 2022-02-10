# scope-hoisting  
* 现象: 构建后的代码存在大量闭包代码  
```
// a.js 
export default 'xxxx';
// b.js
import index from './a';
console.log(index);

// 编译前(source code)
``` 
--------------
```
/***/ "./app/index/app.js";
/*!*********************!*\
  !*** ./app/index/app.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_index_WEBPACK_IMPORIED_MODULE_0__ = __webpack_require__(*****)

console.log(_js_index_WEBPACK_IMPORTED_MODULE_0__["default"]);
/***/ }),

/***/ "./app/index/js/index.js";
/*!*********************!*\
  !*** ./app/index/js/index.js ***!
  \************************/
  /* exports provided default */
/***/ (function(module, __webpack_epxorts__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);

    /* harmony defautl export */ __webpack_exports__["default"] = ["xxxx"];
/***/ })


// 编译后 (bundle.js)
```

* 会导致什么问题?  
> 大量函数闭包包裹代码, 导致体积增大 (模块越多越明显)  
> 运行代码是创建的函数作用域变多, 内存开销变大  

* 模块转换分析  
```
import { helloworld } from './helloworld';
import '../../common';

document.write(helloworld());
```  
> 转化为模块初始化函数  
```
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


document.write(Object(_hello__WEBPACK_IMPORTED_MODULE_0__["hello"])());

/***/ })
```

> 结论:  
>> 被 webpack 转换后的模块会带上一层包裹  
>> import 会被转换成 __webpack_require  

# 进一步分析 wepback 的模块机制  
```
/******/ (function(modules) { 
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/   
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


document.write(Object(_hello__WEBPACK_IMPORTED_MODULE_0__["hello"])());

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hello", function() { return hello; });
function hello() {
  return 'Hello webpack';
}

/***/ })
/******/ ]);
```
> 分析:  
>> 打包出来的是一个 IIFE (匿名闭包)  
>> modules 是一个数组, 每一项是一个模块初始化函数  
>> __webpack_require 用来加载模块, 返回 module.exports  
>> 通过 WEBPACK_REQUIRE_METHOD(0) 启动程序  

# scope hoisting 原理  
* 原理: 将所有模块的代码按照引用顺序放在一个函数作用域里, 然后适当的重命名一些变量以防止变量名冲突  
* 对比: 通过 scope hoisting 可以减少函数声明代码和内存开销  

# scope hoisting 使用  
* webpack mode 为 production 默认开启  
* 必须是 ES6 语法, CJS 不支持  
```
module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    },
    plugins: [
        // webpack3 需要配置
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
```