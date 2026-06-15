// src/main.js
import { initNavbar } from './navbar.js';
import { handleScroll } from './simi.js';  
import { initOrbit } from './support.js';
import { initFormHandler } from './formHandler.js';


document.addEventListener('DOMContentLoaded', () => {
  // Jalankan fungsi navbar
  initNavbar();
  handleScroll();
  initOrbit();

  // Inisialisasi form handler untuk Firestore
  initFormHandler();

  
  // Nanti kalau kamu punya script lain (misal: slider, dark mode),
  // kamu bisa panggil fungsinya di sini juga.
  // contoh: initSlider();
  // contoh: initDarkMode();
});