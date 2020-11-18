import Swiper from 'swiper/bundle';

function slider() {
  const weatherSwiper = new Swiper('.swiper-container', {
    autoplay: {
      delay: 6000
    },
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints:{
      320:{
        slidesPerView: 1,

      },
      600: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 3,

      },
      940:{
        slidesPerView: 4,
      }
    }
  });


  }
export default slider;