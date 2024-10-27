// Data Penjualan Selama 1 Tahun
const monthlySalesData = [
  { bulan: "Januari", total: 15000000 },
  { bulan: "Februari", total: 20000000 },
  { bulan: "Maret", total: 25000000 },
  { bulan: "April", total: 22000000 },
  { bulan: "Mei", total: 30000000 },
  { bulan: "Juni", total: 28000000 },
  { bulan: "Juli", total: 32000000 },
  { bulan: "Agustus", total: 27000000 },
  { bulan: "September", total: 35000000 },
  { bulan: "Oktober", total: 40000000 },
  { bulan: "November", total: 45000000 },
  { bulan: "Desember", total: 50000000 },
];

// Memuat Data ke Tabel
window.onload = () => {
  const tableBody = document.getElementById("salesTableBody");
  monthlySalesData.forEach((data, index) => {
    const row = `<tr>
        <td>${index + 1}</td>
        <td>${data.bulan}</td>
        <td>Rp${data.total.toLocaleString()}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  // Inisialisasi Chart.js
  initSalesChart();
};

// Fungsi untuk Inisialisasi Diagram Penjualan
function initSalesChart() {
  const ctx = document.getElementById("annualSalesChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: monthlySalesData.map((data) => data.bulan),
      datasets: [
        {
          label: "Penjualan Bulanan (Rp)",
          data: monthlySalesData.map((data) => data.total),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
