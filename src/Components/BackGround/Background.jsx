import React from 'react';
import './Background.css';

const Background = ({picture}) => {
    return (
        <div>
            <img src={picture} alt="background" className="background-img"/>
        </div>
    )
}

export default Background;
