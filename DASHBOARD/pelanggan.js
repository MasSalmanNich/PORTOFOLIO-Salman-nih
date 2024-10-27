// Data Pelanggan Tetap
const pelangganData = [
  {
    nama: "Raihan Salman",
    email: "raihan@example.com",
    telepon: "08123456789",
  },
  { nama: "Aisyah Putri", email: "aisyah@example.com", telepon: "08129876543" },
  { nama: "Budi Hartono", email: "budi@example.com", telepon: "08122334455" },
  { nama: "Siti Aminah", email: "siti@example.com", telepon: "08134567890" },
  { nama: "Ahmad Fauzan", email: "ahmad@example.com", telepon: "08198765432" },
];

// Memuat Data Pelanggan ke Tabel
window.onload = () => {
  const tableBody = document.getElementById("customerTableBody");

  pelangganData.forEach((pelanggan, index) => {
    const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${pelanggan.nama}</td>
          <td>${pelanggan.email}</td>
          <td>${pelanggan.telepon}</td>
        </tr>`;
    tableBody.innerHTML += row;
  });
};
