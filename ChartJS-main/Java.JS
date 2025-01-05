const data = {
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  sales2022: [
    4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945,
  ],
  sales2023: [
    2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689,
  ],
};

const tableBody = document.getElementById("data-table");

let row2022 = `<tr><td>2022</td>`;
data.sales2022.forEach((value) => {
  row2022 += `<td>${value.toLocaleString()}</td>`;
});
row2022 += `</tr>`;
tableBody.innerHTML += row2022;

let row2023 = `<tr><td>2023</td>`;
data.sales2023.forEach((value) => {
  row2023 += `<td>${value.toLocaleString()}</td>`;
});
row2023 += `</tr>`;
tableBody.innerHTML += row2023;

new Chart("myChart", {
  type: "bar",
  data: {
    labels: data.months,
    datasets: [
      {
        label: "Tahun 2022",
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        data: data.sales2022,
      },
      {
        label: "Tahun 2023",
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        data: data.sales2023,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Grafik Laporan Penjualan Tahun 2022 dan 2023", // Teks yang ditambahkan di atas label
        font: {
          size: 25, // Ukuran font
          weight: "bold", // Ketebalan teks
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Bulan Penjualan",
          color: "#0000FF",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: false,
          text: "Total Penjualan (dalam ribuan)",
          color: "#008000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  },
});
