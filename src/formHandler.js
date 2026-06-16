// src/formHandler.js
// Handler untuk mengirim data formulir PPDB ke Firestore
import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Inisialisasi form handler untuk formulir PPDB
 * Menangani submit form dan mengirim data ke Firestore collection "pendaftaran"
 */
export function initFormHandler() {
  const form = document.querySelector('#formulir-ppdb');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : 'Kirim Formulir';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validasi checkbox persetujuan
    const persetujuan = document.getElementById('persetujuan');
    if (!persetujuan.checked) {
      showNotification('Anda harus menyetujui bahwa data yang dimasukkan adalah benar.', 'error');
      return;
    }

    // Validasi field wajib
    const requiredFields = ['nama', 'kompetensi', 'tempat-lahir', 'tanggal-lahir', 'jenis-kelamin', 'agama', 'alamat-rumah', 'asal-sekolah', 'nama-ortu', 'telepon'];
    for (const fieldId of requiredFields) {
      const field = document.getElementById(fieldId);
      if (!field || !field.value.trim()) {
        showNotification(`Mohon lengkapi field: ${field?.labels?.[0]?.textContent || fieldId}`, 'error');
        field?.focus();
        return;
      }
    }

    // Disable button & tampilkan loading
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Mengirim...
      `;
    }

    // Ambil data dari form
    const formData = {
      namaLengkap: document.getElementById('nama').value.trim(),
      kompetensiKeahlian: document.getElementById('kompetensi').value,
      tempatLahir: document.getElementById('tempat-lahir').value.trim(),
      tanggalLahir: document.getElementById('tanggal-lahir').value,
      jenisKelamin: document.getElementById('jenis-kelamin').value,
      agama: document.getElementById('agama').value,
      alamatRumah: document.getElementById('alamat-rumah').value.trim(),
      tinggiBadan: document.getElementById('tinggi-badan').value ? Number(document.getElementById('tinggi-badan').value) : null,
      beratBadan: document.getElementById('berat-badan').value ? Number(document.getElementById('berat-badan').value) : null,
      asalSekolah: document.getElementById('asal-sekolah').value.trim(),
      tahunLulus: document.getElementById('tahun-lulus').value ? Number(document.getElementById('tahun-lulus').value) : null,
      alamatSekolah: document.getElementById('alamat-sekolah').value.trim(),
      namaOrangTua: document.getElementById('nama-ortu').value.trim(),
      alamatOrangTua: document.getElementById('alamat-ortu').value.trim(),
      telepon: document.getElementById('telepon').value.trim(),
      email: document.getElementById('email').value.trim(),
      tanggalDaftar: serverTimestamp(),
      status: 'pending'
    };

    try {
      // Kirim data ke Firestore collection "pendaftaran"
      const docRef = await addDoc(collection(db, "pendaftaran"), formData);
      console.log("Pendaftaran berhasil dengan ID:", docRef.id);

      // Tampilkan notifikasi sukses
      showNotification(`Pendaftaran berhasil! ID Pendaftaran Anda: ${docRef.id}`, 'success');

      // Reset form
      form.reset();

    } catch (error) {
      console.error("Error mengirim data:", error);
      showNotification('Gagal mengirim data. Silakan coba lagi.', 'error');
    } finally {
      // Kembalikan button ke state normal
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

/**
 * Menampilkan notifikasi toast di layar
 * @param {string} message - Pesan notifikasi
 * @param {'success'|'error'} type - Tipe notifikasi
 */
function showNotification(message, type = 'success') {
  const existing = document.getElementById('ppdb-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.id = 'ppdb-notification';

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const icon = isSuccess
    ? `<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`
    : `<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;

  notification.className = `fixed top-6 right-6 z-[9999] flex items-center gap-3 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl transform translate-x-full transition-transform duration-500 ease-out max-w-md`;
  notification.innerHTML = `
    ${icon}
    <p class="text-sm font-medium">${message}</p>
    <button onclick="this.parentElement.remove()" class="ml-2 text-white/70 hover:text-white transition-colors">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  `;

  document.body.appendChild(notification);

  // Animasi masuk
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full');
      notification.classList.add('translate-x-0');
    });
  });

  // Hapus otomatis setelah 6 detik
  setTimeout(() => {
    notification.classList.remove('translate-x-0');
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 500);
  }, 6000);
}
