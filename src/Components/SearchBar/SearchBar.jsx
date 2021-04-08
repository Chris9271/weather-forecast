import React, {useContext} from 'react';
import {WeatherContext} from '../ProvideContext/WeatherContext';
import './SearchBar.css';

const SearchBar = () => {
    const handInData = useContext(WeatherContext);
    const {handleChange, handleSubmit, isError, handleClick, isConvert} = handInData;
    const toggleUnit = isConvert ? "fahrenheit" : "celsius";
    return (
        <div className="container wrapper">
            <form onSubmit={handleSubmit} className="search">
                <div className="error-msg">{isError ? "City name is invalid, please try again" : null}</div>
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="toggle-wrap">
                                <div className="toggle-switch">
                                    <div className="convert-btn" onClick={handleClick}>
                                        <p className="unit">°F</p>
                                        <p className="unit">°C</p>
                                        <span className={toggleUnit}></span>
                                    </div>
                                </div>
                            </div>
                            <input type="text" placeholder="Enter a city" onChange={handleChange} className="user-input"/>
                            <button type="submit" className="search-button">Search</button>
                        </div>
                    </div>
            </form>
        </div>
    )
}

export default SearchBar;
