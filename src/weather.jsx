import React, { useEffect,useRef, useState } from 'react';
import './weather.css';

const Weather = () => {
  const ref = useRef()
  const [weatherData , setWeatherData]=useState(false);
  const icons ={
    "01d":"https://openweathermap.org/img/wn/01d@2x.png",
    "01n":"https://openweathermap.org/img/wn/01n@2x.png",
    "02d":"https://openweathermap.org/img/wn/02d@2x.png",
    "02n":"https://openweathermap.org/img/wn/02n@2x.png",
    "03d":"https://openweathermap.org/img/wn/03d@2x.png",
    "03n":"https://openweathermap.org/img/wn/03n@2x.png",
    "04d":"https://openweathermap.org/img/wn/04d@2x.png",
    "04n":"https://openweathermap.org/img/wn/04n@2x.png",
    "09d":"https://openweathermap.org/img/wn/09d@2x.png",
    "09n":"https://openweathermap.org/img/wn/09n@2x.png",
    "11d":"https://openweathermap.org/img/wn/11d@2x.png",
    "11n":"https://openweathermap.org/img/wn/11n@2x.png",
    "13d":"https://openweathermap.org/img/wn/13d@2x.png",
    "13n":"https://openweathermap.org/img/wn/13n@2x.png",
    "50d":"https://openweathermap.org/img/wn/50d@2x.png",
    "50n":"https://openweathermap.org/img/wn/50n@2x.png",

  }
  const search = async (city) => {
    if(city===""){
      alert("Please Enter City Name");
      return;
    }
    try {
      const key = "02429eb9b668b0064e734af10923d949";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
  
    if(!response.ok){
      alert("City Not Found");
      return;
    }
    const ico =icons[data.weather[0].icon] || icons["01d"];
      setWeatherData({
        humidity:data.main.humidity,
        temp:Math.floor(data.main.temp),
        wind: data.wind.speed,
        name:data.name,
        icon: ico
      })
      
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  useEffect(() => {
    search("Hyderabad");
  }, [])
  {weatherData?<>
  
  </>:<></>}
  return (

  <div className='app'>
      <div className='app-components'>
        <div className='top-components'>
      <input ref={ref} type="text" placeholder='Enter City Name' onClick={(city)=>{city.currentTarget.value=''}} />
          <i
            className='fa-solid fa-magnifying-glass-location' onClick={()=>search(ref.current.value)}
          ></i>
        </div>
        </div>
        {weatherData?<>
        
        </>:<></>}
          <>
            <img className='image' src={weatherData.icon} alt='Weather icon' />
            <p className='area-name'>{weatherData.temp}°C</p>
            <p className='area'>{weatherData.name}</p>
          </>
     
        <div className='footer'>
          <div className='humidity'>
            <i className='fa-solid fa-water'></i>
            <div className='hum-content'>
              <p className='humidity-percentage'>{weatherData.humidity}%</p>
              <p className='humidity-name'>Humidity</p>
            </div>
          </div>
          <div className='wind'>
            <i className='fa-solid fa-wind'></i>
            <div className='wind-content'>
              <p className='wind-speed'> {weatherData.wind} Km/h</p>
              <p className='wind-speed'>Wind Speed</p>
            </div>
          </div>
        </div>

    </div>
  );

}

export default Weather;

