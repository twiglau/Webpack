
// import "css-loader!../css/style.css";
import "../css/style.css";
import "../css/title.less";
import "../css/image.css";
import "../font/iconfont.css";
import i_img from '../img/1.webp'
const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "Hello, lau";

// 设置背景图片
const bgDivEl = document.createElement('div');
bgDivEl.className = "image-bg";

// 设置img元素的src
const imgEl = document.createElement('img');
imgEl.src = i_img;// "../img/1.webp";

// i 元素
const iEl = document.createElement('i');
iEl.className = "iconfont icon-shengdanjie-shengdanwa"

document.body.appendChild(divEl);
document.body.appendChild(bgDivEl);
document.body.appendChild(imgEl);
document.body.appendChild(iEl);