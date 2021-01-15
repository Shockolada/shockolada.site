import anchorSmoothScroll from '../services/anchorSmoothScroll';

function navScroll() {
  const topOffset = document.querySelector('.page-header').offsetHeight;
  anchorSmoothScroll('.main-nav__link', topOffset);
}

export default navScroll;
