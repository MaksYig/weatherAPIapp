
const resetData  = ()=>{

    const weatherInfoContainer = document.querySelector('.weather__info');
    const countryInfoContainer = document.querySelector('.country__info');
    const textExplane = document.querySelector('.explain__text');
    const weatherMoreContainer = document.querySelector('.weather__more');
    const searchForm = document.querySelector('.search__form');
    const mainSection = document.querySelector('.main__section');

    const pic = Math.trunc(Math.random() * 6) + 1;
    mainSection.style=`background-image: url('images/content/bg-${pic}.jpg')`;

    searchForm.querySelector('input').value = '';
    textExplane.style.display = 'none';

    if (weatherInfoContainer.childElementCount > 0){
      weatherInfoContainer.querySelectorAll('*').forEach(n => n.remove());
    }
     if (weatherMoreContainer.childElementCount > 0){
      weatherMoreContainer.querySelectorAll('*').forEach(n => n.remove());
     
    }
     if (countryInfoContainer.childElementCount > 0){
      countryInfoContainer.querySelectorAll('*').forEach(n => n.remove());
    }


};

export default resetData;