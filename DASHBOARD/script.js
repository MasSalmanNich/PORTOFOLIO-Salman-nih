// Data JSON dari Kaggle (contoh penjualan handphone)
const salesData = [
  {
    no: 1,
    pelanggan: "Raihan",
    produk: "iPhone 13",
    jumlah: 1,
    harga: 15000000,
  },
  {
    no: 2,
    pelanggan: "Budi",
    produk: "Samsung Galaxy S21",
    jumlah: 2,
    harga: 25000000,
  },
  {
    no: 3,
    pelanggan: "Ani",
    produk: "Xiaomi Mi 11",
    jumlah: 1,
    harga: 7000000,
  },
];

// Memuat data ke dalam tabel
window.onload = () => {
  const tableBody = document.getElementById("tableBody");
  salesData.forEach((data) => {
    const row = `<tr>
        <td>${data.no}</td>
        <td>${data.pelanggan}</td>
        <td>${data.produk}</td>
        <td>${data.jumlah}</td>
        <td>Rp${data.harga.toLocaleString()}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  // Inisialisasi Chart.js
  initCharts();
};

const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.getElementById("sidebarToggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

// Fungsi search engine sederhana
function searchTable() {
  const input = document.getElementById("searchInput").value.toUpperCase();
  const table = document.getElementById("dataTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td");
    let match = false;
    for (let j = 0; j < td.length; j++) {
      if (td[j] && td[j].innerText.toUpperCase().indexOf(input) > -1) {
        match = true;
        break;
      }
    }
    tr[i].style.display = match ? "" : "none";
  }
}

// Fungsi untuk inisialisasi grafik
function initCharts() {
  // Diagram Batang
  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Penjualan (Rp)",
          data: [
            15000000, 25000000, 30000000, 20000000, 35000000, 40000000,
            45000000,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Diagram Garis
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  new Chart(lineCtx, {
    type: "line",
    data: {
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      datasets: [
        {
          label: "Kunjungan Harian",
          data: [30, 50, 40, 60, 70, 90, 100],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Diagram Lingkaran
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["iPhone", "Samsung", "Xiaomi"],
      datasets: [
        {
          data: [40, 35, 25],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
