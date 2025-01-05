document.addEventListener("DOMContentLoaded", () => {
  fetchKaryawanData();
});

function fetchKaryawanData() {
  fetch("http://localhost:3000/api/karyawan")
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
      displayStats(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayData(data) {
  const karyawanData = document.getElementById("karyawan-data");
  karyawanData.innerHTML = data
    .map(
      (karyawan) => `
        <tr>
            <td>${karyawan.id}</td>
            <td>${karyawan.nama}</td>
            <td>${karyawan.jabatan}</td>
            <td>${karyawan.divisi}</td>
            <td>${karyawan.tanggal_masuk}</td>
        </tr>
    `
    )
    .join("");
}

function displayStats(data) {
  const totalKaryawan = data.length;
  const jabatan = [...new Set(data.map((karyawan) => karyawan.jabatan))].length;
  const divisi = [...new Set(data.map((karyawan) => karyawan.divisi))].length;

  document.getElementById("total-karyawan").textContent = totalKaryawan;
  document.getElementById("jumlah-jabatan").textContent = jabatan;
  document.getElementById("jumlah-divisi").textContent = divisi;
}

// script.js
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar ul li a");
  const pages = document.querySelectorAll(".page");

  // Fungsi untuk menyembunyikan semua halaman
  function hideAllPages() {
    pages.forEach((page) => page.classList.remove("active"));
  }

  // Event listener untuk setiap link sidebar
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah pengalihan halaman
      const targetId = this.getAttribute("href").substring(1); // Ambil id target

      hideAllPages(); // Sembunyikan semua halaman

      // Tampilkan halaman target
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Tampilkan halaman dashboard secara default
  document.getElementById("dashboard").classList.add("active");
});
