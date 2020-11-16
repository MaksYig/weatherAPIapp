"use strict";
import apiWeatherRequest from './modules/requestWeather';
// import apiCountryRequest from './modules/requestCountry';
import findByname from "./modules/findbyName";
import geoLocation from './modules/getGeoLocation';

window.addEventListener("DOMContentLoaded", () => {

  // apiWeatherRequest('Athens');  
  // apiCountryRequest('GR');
  findByname();
  geoLocation();

  
  
});
