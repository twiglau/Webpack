'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search_less.less';
import logo from './images/friend_img.png'
class Search extends React.Component {
    render () {
        return <div className="search-text">
            <span>Search Text 111</span>
            <img src={ logo }  />
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)