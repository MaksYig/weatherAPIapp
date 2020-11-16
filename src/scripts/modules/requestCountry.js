const apiCountryRequest = function (countryName){
  /* 2fbb20e9e1081a0b869a449bc5eb6e87  */
  const requestUrl = `https://restcountries.eu/rest/v2/alpha/${countryName}`;
  


 const GetCurrentweather = fetch (requestUrl).then(function(response){
       response.json().then (function(data){
        console.log(data);
      });
  });


};

export default apiCountryRequest;