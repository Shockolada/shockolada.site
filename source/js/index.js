import focusvisible from 'focus-visible';
import svgxuse from 'svgxuse';
import header from './modules/header';
import menu from './modules/menu';
import heroSlider from './modules/heroSlider';
import navigation from './modules/navigation';
import navScroll from './modules/navScroll';
import scrollToTop from './modules/scroll-to-top';
import cookiesAccept from './modules/cookies-accept';
import hoverTooltip from './modules/hover-tooltip';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  header();
  menu();
  heroSlider();
  navigation();
  scrollToTop();
  cookiesAccept();
  navScroll();
  hoverTooltip();
});
