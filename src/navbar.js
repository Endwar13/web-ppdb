// src/navbar.js

export function initNavbar() {
  const menuBtn = document.getElementById('menu-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');

  // Pengecekan: Jika elemen tidak ditemukan (misal di halaman lain), fungsi berhenti
  if (!menuBtn || !dropdownMenu) return;

  // Toggle menu saat tombol diklik
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah klik langsung ditutup oleh fungsi document
    dropdownMenu.classList.toggle('hidden');
  });

  // Menutup menu jika klik di area mana saja selain menu
  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
    }
  });
}