import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

console.log(editor)
if(module.hot){
    let hotEditor = editor
    module.hot.accept('./editor.js',() =>{
        console.log(hotEditor)
        const value = hotEditor.innerHTML
        document.body.removeChild(hotEditor)
        hotEditor = createEditor()
        hotEditor.innerHTML = value
        document.body.appendChild(hotEditor)
    })
}