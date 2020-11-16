import GetCurrentweather from './requestWeather';
import   resetData from '../modules/resetData';

const findByname = function () {
  const searchForm = document.querySelector('.search__form');

  searchForm.addEventListener('submit', (e) => {

    const input = searchForm.querySelector('input').value;
    e.preventDefault();
    resetData();
    GetCurrentweather(input);




  });




};

export default findByname;