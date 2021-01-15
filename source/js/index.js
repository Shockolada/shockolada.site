import focusvisible from 'focus-visible';
import svgxuse from 'svgxuse';
import header from './modules/header';
import menu from './modules/menu';
import heroSlider from './modules/heroSlider';
import navigation from './modules/navigation';
import navScroll from './modules/navScroll';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  header();
  menu();
  heroSlider();
  navigation();

  
  navScroll();
});
