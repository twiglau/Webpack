'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../../common';
// import './search_less.less';
// import logo from './images/friend_img.png'
// import { a,b } from './tree-shaking'

const React = require('react')
const logo = require('./images/friend_img.png')
require('./search_less.less')

class Search extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            Text: null
        };
    }

    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            })

        });
    }

    render () {
        const { Text } = this.state;
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            <span>Search Text 111</span>
            <img src={ logo } onClick={ this.loadComponent.bind(this) }  />
        </div>;
    }
}

// ReactDOM.render(
//     <Search />,
//     document.getElementById('root')
// )

module.exports = <Search />;