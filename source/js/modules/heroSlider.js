import Swiper from 'swiper/bundle';

function heroSlider() {
  var heroSlider = new Swiper('.hero-slider .swiper-container', {
    pagination: {
      el: '.hero-slider__pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.hero-slider__button-next',
      prevEl: '.hero-slider__button-prev',
    },
    // loop: true,
    parallax: true,
    speed: 800,
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
