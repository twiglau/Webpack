// import posts from './posts/posts'
// import album from './album/album'

const render = () => {
    const hash = window.location.hash || '#posts'
  
    const mainElement = document.querySelector('.main')
  
    mainElement.innerHTML = ''
    // 1. 动态加载
    // if (hash === '#posts') {
    //   // mainElement.appendChild(posts())
    //   import('./posts/posts').then(({ default: posts }) => {
    //     mainElement.appendChild(posts())
    //   })
    // } else if (hash === '#album') {
    //   // mainElement.appendChild(album())
    //   import('./album/album').then(({ default: album }) => {
    //     mainElement.appendChild(album())
    //   })
    // }
    // 2. 魔法注释

    // if (hash === '#posts') {
    //   // mainElement.appendChild(posts())
    //   import(/* webpackChunkName: 'posts' */'./posts/posts').then(({ default: posts }) => {
    //     mainElement.appendChild(posts())
    //   })
    // } else if (hash === '#album') {
    //   // mainElement.appendChild(album())
    //   import(/* webpackChunkName: 'album' */'./album/album').then(({ default: album }) => {
    //     mainElement.appendChild(album())
    //   })
    // }
    // 2. 魔法注释合并

    if (hash === '#posts') {
      // mainElement.appendChild(posts())
      import(/* webpackChunkName: 'components' */'./posts/posts').then(({ default: posts }) => {
        mainElement.appendChild(posts())
      })
    } else if (hash === '#album') {
      // mainElement.appendChild(album())
      import(/* webpackChunkName: 'components' */'./album/album').then(({ default: album }) => {
        mainElement.appendChild(album())
      })
    }
  }
  
  window.addEventListener('hashchange', render)
  render()
  