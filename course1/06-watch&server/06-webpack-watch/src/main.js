import createHeading from './heading'
import './main.css'
import icon from './logo.jpeg'

const heading = createHeading()

document.body.append(heading)

const img = new Image()
img.src = icon

document.body.append(img)