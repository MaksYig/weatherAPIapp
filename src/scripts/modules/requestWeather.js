import resetData from '../modules/resetData';

function GetCurrentweather(cityNameInput) {
  const requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&units=metric&appid=2fbb20e9e1081a0b869a449bc5eb6e87`;
  const weatherInfoContainer = document.querySelector('.weather__info');
  const countryInfoContainer = document.querySelector('.country__info');

  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      function getTime(time) {
        const dt = new Date(time * 1000);
        const hr = dt.getHours();
        const m = "0" + dt.getMinutes();
        return hr + ':' + m.substr(-2);
      }


      const html = `
      <div class="weather__info-wrapper">
          <div class="weather__main-info">
              <span class="weather__main-info-name">${data.name}</span>
              <span class="weather__main-info-temp">${Math.round(data.main.temp)} &#8451;</span>
              <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="">
              <span class="weather__main-info-description">${data.weather[0].description}</span>
              <div class="weather__main-info-feel">Feels like: <span class="weather__main-info-feels">${Math.round(data.main.feels_like)} &#8451;</span></div>
              <div class="weather__main-info-sun-wrapper">
              <div class="weather__main-info-title">Sun Rise:<span class="weather__main-info-sunrise">${getTime(data.sys.sunrise)}</span></div>
              <div class="weather__main-info-title">Sun Set:<span class="weather__main-info-sunset">${getTime(data.sys.sunset)}</span></div>
          </div>
      </div>
          <div class="weather__second-content">
            <div class="weather__second-info-title">Pressure:<span class="weather__second-pressure">${data.main.pressure}hPa</span></div>
            <div class="weather__second-info-title">Humidity:<span class="weather__second-humidity">${data.main.humidity}%</span></div>

            <div class="weather__second-info-title">Temp Min:<span class="weather__second-temp_min">${Math.round(data.main.temp_min)} &#8451;</span></div>
            <div class="weather__second-info-title">Temp Max:<span class="weather__second-temp_max">${Math.round(data.main.temp_max)} &#8451;</span></div>
            <div class="weather__second-info-title">Wind Speed:<span class="weather__second-wind_speed">${data.wind.speed} meter/sec</span></div>
          </div>
      </div>
      `;


      
      weatherInfoContainer.insertAdjacentHTML('beforeend', html);


      const requestCountryURL = `https://restcountries.eu/rest/v2/alpha/${data.sys.country}`;
      fetch(requestCountryURL).then(function (response) {
        response.json().then(function (cdata) {
          console.log(cdata);
          console.log(cdata.capital);
          console.log(cdata.languages[0].name);



          const countryHTML = `
       
          <div class="country__info-wrapper">
          <div class="country__info-row">
            <div class="country__info-title">National Flag: <img  class ="country__info-flag"src=" ${cdata.flag}" alt=""></div>
            <div class="country__info-title">Country: <span class="country__info-country"> ${cdata.name}</span></div>
            <div class="country__info-title">Capital: <span class="country__info-capital"> ${cdata.capital}</span></div>
            <div class="country__info-title">Population: <span class="country__info-population"> ${cdata.population}</span></div>
   
          </div>
          <div class="country__info-row">
            <div class="country__info-title">Regional: <span class="country__info-regionalblock"> ${cdata.regionalBlocs[0].name}</span></div>
            <div class="country__info-title">Area: <span class="country__info-area"> ${cdata.area} km/sq</span></div>
            <div class="country__info-title">Language: <span class="country__info-language"> ${cdata.languages[0].name}</span></div>
            <div class="country__info-title">Curancie: <span class="country__info-curancies"> ${cdata.currencies[0].name}</span></div>
          </div>
        </div>
          
          
          
          `;

          countryInfoContainer.insertAdjacentHTML('beforeend', countryHTML);

        });
      });
    });
  });
}





export default GetCurrentweather;