// 'https://geocode.xyz/${},${}?geoit=xml'
import GetCurrentweather from '../modules/requestWeather';
import   resetData from '../modules/resetData';

const geoLocation =()=>{

const locationBtn = document.querySelector('.find__location');

  const getGeoLocation = function(){
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(resolve,reject);
    });
  };
  
  const whereAmI =  ()=> {
    getGeoLocation().then(pos=>{
      const {latitude:lat, longitude:lng} = pos.coords;
  
      return fetch (`https://geocode.xyz/${lat},${lng}?geoit=json`);
    }).then(res=> {
      if (!res.ok) throw new Error (`Problem with Geocoding ${res.status}`);
      return res.json();
    }).then(data => {
      console.log([data.prov, data.osmtags.name_cs]);
      const cityInfo = [data.prov, data.osmtags.name_cs];
      locationBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        resetData();
        GetCurrentweather(data.osmtags.name_cs);

      });
    });
  };



  whereAmI();

};

export default geoLocation;