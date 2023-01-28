import {sum} from './js/math';
import { createApp } from 'vue';///dist/vue.esm-bundler vue-loader
const {priceFormat} = require('./js/format');
import axios from 'axios';
import App from './vue/App.vue';

import "./js/element";
if(module.hot){
    module.hot.accept("./js/element.js", () => {
        console.log('element模块发生更新了');
    })
}
console.log(sum(20, 30));
console.log(priceFormat());

const message = "Hello World!";
const names = ["abc", "cba", "nba"];
names.forEach(item => console.log(item));
console.log(message);

const app = createApp(App);
app.mount("#app");