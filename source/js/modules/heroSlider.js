import Swiper from 'swiper/bundle';

function heroSlider() {
  var heroSlider = new Swiper('.hero-slider', {
    pagination: {
      el: '.hero-slider__pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.hero-slider__button-next',
      prevEl: '.hero-slider__button-prev',
    },
    parallax: true,
    speed: 1300,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      940: {
        spaceBetween: 100,
      },
      1200: {
        spaceBetween: 200,
      },
    }
  });
}

export default heroSlider;
