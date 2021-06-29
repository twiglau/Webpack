var name = "12-Rollup";
var version = "1.0.0";

// ./src/cjs-module.js
var cjsModule = {
    foo:'bar'
};

// ./src/index.js
console.log(name,version);
//使用模块成员
console.log(cjsModule); // cjs => { foo: 'bar'}

//动态导入的模块会自动分包
import('./logger-3c1820ba.js').then(({ log }) => {
    log('code splitting~');
});
