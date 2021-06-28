export default level => {
    //副作用代码
    console.log('Heading component~')
    return document.createElement('h' + level)
}