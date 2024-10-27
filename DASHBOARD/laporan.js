// Data Penjualan dan Keuntungan
const salesData = [
  { bulan: "Januari", totalPenjualan: 15000000, keuntungan: 3000000 },
  { bulan: "Februari", totalPenjualan: 20000000, keuntungan: 4000000 },
  { bulan: "Maret", totalPenjualan: 25000000, keuntungan: 5000000 },
  { bulan: "April", totalPenjualan: 22000000, keuntungan: 4400000 },
  { bulan: "Mei", totalPenjualan: 30000000, keuntungan: 6000000 },
  { bulan: "Juni", totalPenjualan: 28000000, keuntungan: 5600000 },
  { bulan: "Juli", totalPenjualan: 32000000, keuntungan: 6400000 },
  { bulan: "Agustus", totalPenjualan: 27000000, keuntungan: 5400000 },
  { bulan: "September", totalPenjualan: 35000000, keuntungan: 7000000 },
  { bulan: "Oktober", totalPenjualan: 40000000, keuntungan: 8000000 },
  { bulan: "November", totalPenjualan: 45000000, keuntungan: 9000000 },
  { bulan: "Desember", totalPenjualan: 50000000, keuntungan: 10000000 },
];

// Fungsi untuk Memuat Data ke Tabel
window.onload = () => {
  const reportBody = document.getElementById("salesReportBody");
  let totalRevenue = 0;
  let totalProfit = 0;

  salesData.forEach((data, index) => {
    totalRevenue += data.totalPenjualan;
    totalProfit += data.keuntungan;

    const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${data.bulan}</td>
          <td>Rp${data.totalPenjualan.toLocaleString()}</td>
          <td>Rp${data.keuntungan.toLocaleString()}</td>
        </tr>`;
    reportBody.innerHTML += row;
  });

  document.getElementById(
    "totalRevenue"
  ).textContent = `Rp${totalRevenue.toLocaleString()}`;
  document.getElementById(
    "totalProfit"
  ).textContent = `Rp${totalProfit.toLocaleString()}`;

  initSalesChart();
};

// Fungsi untuk Membuat Diagram Garis
function initSalesChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: salesData.map((data) => data.bulan),
      datasets: [
        {
          label: "Total Penjualan (Rp)",
          data: salesData.map((data) => data.totalPenjualan),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}
