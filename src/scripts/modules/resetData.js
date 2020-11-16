
const resetData  = ()=>{
const searchForm = document.querySelector('.search__form');
const infoWrapper = document.querySelector('.weather__info');
const countryInfoContainer = document.querySelector('.country__info');

searchForm.querySelector('input').value = '';
if (infoWrapper.firstElementChild ){
  infoWrapper.firstElementChild.remove();
  countryInfoContainer.firstElementChild.remove();
}








};

export default resetData;