// src/main.js
import { initNavbar } from './navbar.js';
import { handleScroll } from './simi.js';  
import { animate } from './support.js';


document.addEventListener('DOMContentLoaded', () => {
  // Jalankan fungsi navbar
  initNavbar();
  handleScroll();
  animate();


  
  // Nanti kalau kamu punya script lain (misal: slider, dark mode),
  // kamu bisa panggil fungsinya di sini juga.
  // contoh: initSlider();
  // contoh: initDarkMode();
});