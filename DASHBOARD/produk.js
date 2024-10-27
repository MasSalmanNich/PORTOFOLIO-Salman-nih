// Data Produk
const productData = [
  {
    nama: "iPhone 13",
    harga: 15000000,
    kategori: "Smartphone",
    deskripsi: "iPhone 13 dengan performa tinggi dan kamera canggih.",
    gambar:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-select-2021",
  },
  {
    nama: "Samsung Galaxy S21",
    harga: 13000000,
    kategori: "Smartphone",
    deskripsi: "Smartphone flagship dari Samsung dengan layar AMOLED.",
    gambar: "Samsung Galaxy S21.jpeg",
  },
  {
    nama: "Xiaomi Mi 11",
    harga: 8000000,
    kategori: "Smartphone",
    deskripsi: "Xiaomi Mi 11 dengan Snapdragon 888 dan layar 120Hz.",
    gambar: "Xiomi Mi 11.jpeg",
  },
];

// Memuat Data Produk ke Halaman
window.onload = () => {
  const productList = document.getElementById("product-list");

  productData.forEach((product) => {
    const productCard = `
        <div class="product-card">
          <img src="${product.gambar}" alt="${product.nama}">
          <h3>${product.nama}</h3>
          <p>Kategori: ${product.kategori}</p>
          <p class="price">Rp${product.harga.toLocaleString()}</p>
          <p>${product.deskripsi}</p>
        </div>
      `;
    productList.innerHTML += productCard;
  });
};
