import React from 'react';
import './Spinner.css';

const Spinner = ({name}) => {
    return (
        <div className="spin">
            <div className="load-msg">Loading {name.city} Weather...</div>
            <div className="loader"></div>
        </div>
    )
}

export default Spinner;
