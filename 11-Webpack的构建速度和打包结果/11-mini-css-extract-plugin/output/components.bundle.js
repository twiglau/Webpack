(self.webpackChunk_11_mini_css_extract_plugin=self.webpackChunk_11_mini_css_extract_plugin||[]).push([[0],[,(t,e,n)=>{"use strict";n.r(e),n.d(e,{"default":()=>s});var c=n(2);n(3),n(4);const s=()=>{const t=document.createElement("div");return t.className="posts",t.innerHTML="<h2>Posts</h2>",(0,c["default"])("/posts").then((e=>{e.forEach((e=>{const n=document.createElement("article");n.className="post";const c=document.createElement("h3");c.textContent=e.title,n.appendChild(c);const s=document.createElement("p");s.textContent=e.body,n.appendChild(s),t.appendChild(n)}))})),t}},(t,e,n)=>{"use strict";n.r(e),n.d(e,{"default":()=>c});const c=t=>fetch(`https://jsonplaceholder.typicode.com${t}`).then((t=>t.json()))},(t,e,n)=>{"use strict";n.r(e)},(t,e,n)=>{"use strict";n.r(e)},(t,e,n)=>{"use strict";n.r(e),n.d(e,{"default":()=>s});var c=n(2);n(3),n(6);const s=()=>{const t=document.createElement("div");return t.className="album",t.innerHTML="<h2>Albums</h2>",(0,c["default"])("/photos?albumId=1").then((e=>{e.forEach((e=>{const n=document.createElement("section");n.className="photo";const c=document.createElement("img");c.src=e.thumbnailUrl,n.appendChild(c);const s=document.createElement("h3");s.textContent=e.title,n.appendChild(s),t.appendChild(n)}))})),t}},(t,e,n)=>{"use strict";n.r(e)}]]);