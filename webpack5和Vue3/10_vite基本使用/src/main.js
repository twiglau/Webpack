
import { sum } from './js/math';
import _ from 'lodash-es';
import mul from './ts/mul';
import { createApp } from 'vue';
import "./css/style.css";
import "./css/title.less";

import App from './vue/App.vue';
createApp(App).mount('#vue');

console.log('Hello world');
console.log('main.js 加载成功');
console.log('math.js 导入成功', sum(1, 3));
console.log('lodash 加载成功', _.join(['123', 'aaa'], '-'));
console.log('ts 默认加载成功', mul(1, 6));
const titleEl = document.createElement('div');
titleEl.className = 'title';
titleEl.innerHTML = "Hello inner HTML";
document.body.appendChild(titleEl);