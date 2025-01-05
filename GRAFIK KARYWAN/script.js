const ctx = document.getElementById('salesChart').getContext('2d');

// Data penjualan dari tabel
const labels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const sales2022 = [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945];
const sales2023 = [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689];

// Membuat diagram menggunakan Chart.js
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: '2022',
                data: sales2022,
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Biru
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: '2023',
                data: sales2023,
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // Merah
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Perbandingan Penjualan 2022 vs 2023'
            }
        }
    }
});
