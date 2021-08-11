import React, {useContext} from 'react';
import Background from './Components/BackGround/Background';
import SearchBar from './Components/SearchBar/SearchBar';
import LeftDetail from './Components/Weather/LeftDetail';
import Graph from './Components/Graph/Graph';
import RightDetail from './Components/Weather/RightDetail';
import Spinner from './Components/Spinner/Spinner';
import {WeatherContext} from './Components/ProvideContext/WeatherContext';
import './App.css';

const App = () => {
  // useContext is like Context.Consumer, it can access Context.Provider's value
  // but only read and subscribe
  const loading = useContext(WeatherContext);
  const {isLoading, dataStorage, cityPictures, futureWeather, handleClick, isConvert, celsiusTofahrenheit} = loading;

  return (
      <>
      {(!isLoading) ? 
        <div className="box">
          <Spinner name={dataStorage}/>
        </div> 
        : 
        <div className="box">
          <div className="app-area">
            <Background picture={cityPictures}/>
              <div className="inside-box">
                <SearchBar/>
                <LeftDetail data={dataStorage} date={futureWeather} convertTemp={isConvert} celToFah={celsiusTofahrenheit}/>
                <Graph/>
              </div>
          </div>
            <RightDetail detail={dataStorage} futureDetail={futureWeather} tempUnit={handleClick} convertTemp={isConvert} celToFah={celsiusTofahrenheit}/>
        </div>
      }
      </>
  );
}

export default App;
