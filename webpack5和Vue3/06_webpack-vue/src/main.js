import {sum} from './js/math';
import { createApp } from 'vue';///dist/vue.esm-bundler vue-loader
const {priceFormat} = require('./js/format');

import App from './vue/App.vue';
import "./js/element";

console.log(sum(20, 30));
console.log(priceFormat());

const message = "Hello World";
const names = ["abc", "cba", "nba"];
names.forEach(item => console.log(item));
console.log(message);


// Vue代码
// const app = createApp({
//     template: `#my-app`,
//     data(){
//         return {
//             title: "Hello World"
//         }
//     }
// });

const app = createApp(App);
app.mount("#app");