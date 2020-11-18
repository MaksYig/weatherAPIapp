
import getTime from '../modules/getTime';
import getDate from '../modules/getDate';
import getResource from '../modules/getResource';
import resetData from '../modules/resetData';
import slider from './swiper';

const findByname = () => {



  const mainSection = document.querySelector('.main__section');
  const weatherInfoContainer = document.querySelector('.weather__info');
  const countryInfoContainer = document.querySelector('.country__info');
  const moreDaysweather = document.querySelector('.more__days-btn');
  const weatherMoreContainer = document.querySelector('.weather__more');
  const searchForm = document.querySelector('.search__form');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = searchForm.querySelector('input').value;

    if (input !== "") {

      const urlByName = `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=2fbb20e9e1081a0b869a449bc5eb6e87`;
      

      /* Start request weather By Name */
      getResource(urlByName).then(function (data) {
        console.log(data);
        resetData();
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

        const urlCountryByID = `https://restcountries.eu/rest/v2/alpha/${data.sys.country}`;

        /* Request countryInfo by ID */
        getResource(urlCountryByID).then(function (cdata) {

          const countryHTML = `
 
              <div class="country__info-wrapper">
              <div class="country__info-row">
                <div class="country__info-title">National Flag: <img  class ="country__info-flag"src=" ${cdata.flag}" alt=""></div>
                <div class="country__info-title">Country: <span class="country__info-country"> ${cdata.name}</span></div>
                <div class="country__info-title">Capital: <span class="country__info-capital"> ${cdata.capital}</span></div>
                <div class="country__info-title">Population: <span class="country__info-population"> ${cdata.population}</span></div>

              </div>
              <div class="country__info-row">
                <div class="country__info-title">Region: <span class="country__info-regionalblock"> ${cdata.regionalBlocs[0].name}</span></div>
                <div class="country__info-title">Area: <span class="country__info-area"> ${cdata.area} km/sq</span></div>
                <div class="country__info-title">Language: <span class="country__info-language"> ${cdata.languages[0].name}</span></div>
                <div class="country__info-title">Сurrency: <span class="country__info-curancies"> ${cdata.currencies[0].name}</span></div>
              </div>
            </div>
    `;

          countryInfoContainer.insertAdjacentHTML('beforeend', countryHTML);
          moreDaysweather.style.display = 'block';

        });
        /* END request countryInfo by ID */

        moreDaysweather.addEventListener('click', (e) => {
          e.preventDefault();
          moreDaysweather.style.display = 'none';
          const URLMoreDays = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=2fbb20e9e1081a0b869a449bc5eb6e87`;
          /* Start request more days by LatLon */
          getResource(URLMoreDays).then(function (mData) {
            console.log(mData);
            resetData();
            const moreHTML = `
      
                  <div class="weather__more-info-wrapper">
                  
                  <div class="weather__more-info">

                  <!-- If we need pagination -->
                  <div class="swiper-pagination"></div>
              
                  <!-- If we need navigation buttons -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>


                  <div class="swiper-container">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[0].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[0].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[0].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[0].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[0].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[0].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[0].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[0].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[0].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[0].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[0].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>
                      
                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[1].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[1].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[1].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[1].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[1].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[1].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[1].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[1].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[1].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[1].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[1].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>

                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[2].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[2].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[2].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[2].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[2].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[2].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[2].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[2].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[2].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[2].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[2].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>

                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[3].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[3].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[3].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[3].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[3].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[3].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[3].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[3].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[3].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[3].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[3].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>

                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[4].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[4].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[4].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[4].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[4].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[4].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[4].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[4].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[4].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[4].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[4].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>

                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[5].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[5].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[5].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[5].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[5].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[5].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[5].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[5].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[5].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[5].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[5].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>

                      <div class="swiper-slide">
                        <div class="weather__more-info-item">
                          <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[6].dt)}</span></span>
                          <img src="http://openweathermap.org/img/wn/${mData.daily[6].weather[0].icon}.png" alt="">
                          <span class="more__info-title"><span class="more__info-value">${mData.daily[6].weather[0].main}</span></span>
                          <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[6].temp.eve)} &#8451;</span></span>
                          <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[6].feels_like.day)} &#8451;</span></span>
                          <div class="day__temp">
                            <ruby>
                              ${Math.round(mData.daily[6].temp.morn)} &#8451;
                              <rt>Morning</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[6].temp.day)} &#8451;
                              <rt>Day</rt>
                            </ruby>
                            <ruby>
                            ${Math.round(mData.daily[6].temp.night)} &#8451;
                              <rt>Night</rt>
                            </ruby>
                          </div>
                          <div class="sun">
                            <ruby>
                            <span>${getTime(mData.daily[6].sunrise)}</span>
                            <rt>Sun Rise</rt>
                          </ruby>
                          <ruby>
                            <span>${getTime(mData.daily[6].sunset)}</span>
                            <rt>Sun Set</rt>
                          </ruby>
                        </div>
                          <div class="wind">
                            <ruby>
                              <span>${mData.daily[6].wind_speed} m/s</span>
                              <rt>Wind</rt>
                            </ruby>
                          </div>
                        </div>
                      </div>

                      
                      <div class="swiper-slide">
                      <div class="weather__more-info-item">
                        <span class="more__info-title"><span class="more__info-value">${getDate(mData.daily[7].dt)}</span></span>
                        <img src="http://openweathermap.org/img/wn/${mData.daily[7].weather[0].icon}.png" alt="">
                        <span class="more__info-title"><span class="more__info-value">${mData.daily[7].weather[0].main}</span></span>
                        <span class="more__info-title"><span class="more__info-value">${Math.round(mData.daily[7].temp.eve)} &#8451;</span></span>
                        <span class="more__info-title">Feels:<span class="more__info-value"> ${Math.round(mData.daily[7].feels_like.day)} &#8451;</span></span>
                        <div class="day__temp">
                          <ruby>
                            ${Math.round(mData.daily[7].temp.morn)} &#8451;
                            <rt>Morning</rt>
                          </ruby>
                          <ruby>
                          ${Math.round(mData.daily[7].temp.day)} &#8451;
                            <rt>Day</rt>
                          </ruby>
                          <ruby>
                          ${Math.round(mData.daily[7].temp.night)} &#8451;
                            <rt>Night</rt>
                          </ruby>
                        </div>
                        <div class="sun">
                          <ruby>
                          <span>${getTime(mData.daily[7].sunrise)}</span>
                          <rt>Sun Rise</rt>
                        </ruby>
                        <ruby>
                          <span>${getTime(mData.daily[7].sunset)}</span>
                          <rt>Sun Set</rt>
                        </ruby>
                      </div>
                        <div class="wind">
                          <ruby>
                            <span>${mData.daily[7].wind_speed} m/s</span>
                            <rt>Wind</rt>
                          </ruby>
                        </div>
                      </div>
                    </div>

                    </div>

                
                    <!-- If we need scrollbar -->
                    <div class="swiper-scrollbar"></div>
                </div>

                </div>
                  
                  </div>
      
      `;

            weatherMoreContainer.insertAdjacentHTML('beforeend', moreHTML);
            slider();

            /* End request more days by LatLon */
          });

        });
        /* END request weather By Name */
      });

      /* End IF */
    }


  });


};

export default findByname;