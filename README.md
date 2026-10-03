# Bore & Barrel - PWA Gunshop Storefront

> **Kelompok 30 Shift 5** - Praktikan Praktikum PPB 2026

Bore & Barrel adalah aplikasi *storefront* toko senjata dummy berbasis **Progressive Web App (PWA)**. Aplikasi ini dirancang agar dapat berjalan secara offline menggunakan *App Shell architecture*, *Web App Manifest*, dan *Service Worker*, dikembangkan menggunakan **React**, **Vite**, dan **Custom Vanilla CSS**.

---

## 🛠️ Fungsionalitas Aplikasi

1. **Hardware Catalog & Stock Grid**:
   - Menampilkan koleksi senjata lengkap dengan spesifikasi tipe, kaliber, harga, dan deskripsi.
   
2. **Fixed Card Layout & Image Fill**:
   - Kartu produk memiliki tata letak dan ukuran tinggi seragam (*fixed layout*).
   - Gambar produk secara otomatis menyesuaikan lebar/container kartu menggunakan `object-fit: cover` sehingga gambar selalu *fill* tanpa merusak tata letak grid.

3. **Pencarian Real-Time (Search)**:
   - Pencarian instan berdasarkan kata kunci nama senjata, tipe, kaliber, atau deskripsi (disertai tombol pembersih pencarian `×`).

4. **Filter Tipe Senjata**:
   - Penjaringan kategori senjata secara dinamis (`All`, `Pistol`, `Rifle`, `Shotgun`, `SMG`, `Sniper`) menggunakan *pill buttons*.

5. **Pengurutan (Sort By)**:
   - Urutkan item berdasarkan:
     - **Harga**: Low to High (Harga Termurah) & High to Low (Harga Termahal)
     - **Nama**: A - Z & Z - A
     - **Default**

6. **Fallback View ("No Guns Match")**:
   - Tampilan khusus jika tidak ada senjata yang cocok dengan kriteria pencarian/filter, dilengkapi dengan tombol *Reset Filters*.

7. **Keranjang Belanja (Cart) & Kontrol Kuantitas**:
   - **Header Badge**: Indikator jumlah total barang belanjaan secara *real-time* di menu header.
   - **Kontrol Kuantitas di Kartu**: Setiap kartu senjata dilengkapi tombol `+ Add` dan kontrol kuantitas `[-] [Qty] [+]` yang dapat diubah langsung dari katalog tanpa mengganggu pembukaan modal detail.
   - **Halaman Cart Khusus**: Menampilkan daftar barang yang dibeli, harga per unit, pengubah kuantitas, tombol hapus item, pembersih keranjang (*Clear Cart*), serta kalkulasi total harga belanjaan.
   - **Empty Cart State**: Tampilan interaktif jika keranjang belanja masih kosong.

8. **Modal Detail Pop-up**:
   - Dialog interaktif native `<dialog>` untuk melihat rincian spesifikasi dan deskripsi lengkap senjata.

9. **Dukungan Offline (PWA)**:
   - Penggunaan Service Worker via `vite-plugin-pwa` memungkinkan aplikasi tetap dapat dibuka dan berfungsi saat perangkat tidak terhubung ke internet.

---

## 📂 Struktur Direktori Projek

```
/
├── index.html              # HTML shell entry point
├── vite.config.js          # Vite + vite-plugin-pwa (Manifest & Service Worker config)
├── package.json            # Dependencies & npm scripts
├── public/                 # Static assets
│   ├── icon-192.png        # App Icon 192x192
│   ├── icon-512.png        # App Icon 512x512
│   ├── icon.svg            # SVG Icon
│   └── guns/               # Gambar Produk Senjata
│       ├── cheytac.png     # (Baru) CheyTac M200
│       ├── kriss.png       # (Baru) KRISS Vector
│       ├── sg_puter.png    # (Baru) SG Puter
│       ├── pistol.svg
│       ├── rifle.svg
│       └── shotgun.svg
└── src/
    ├── main.jsx            # Entry point React
    ├── App.jsx             # Shell utama, state navigasi, & state Cart
    ├── App.css             # Design system & gaya komponen
    ├── index.css           # Global CSS variables & reset
    ├── components/
    │   ├── Header.jsx      # Header, brand, & Navigasi Cart badge
    │   ├── GunCard.jsx     # Kartu produk item & inline quantity controls
    │   └── Footer.jsx      # Footer aplikasi
    ├── data/
    │   └── guns.js         # Data dummy produk senjata
    └── pages/
        ├── Catalog.jsx     # Halaman utama katalog, search, filter, sort, & fallback
        ├── Cart.jsx        # (Baru) Halaman keranjang belanja & total harga
        ├── About.jsx       # Halaman Informasi
        └── Contact.jsx     # Halaman Kontak
```

---

## 🚀 Cara Menjalankan Projek

```bash
# Install dependencies
npm install

# Jalankan dev server (HMR)
npm run dev

# Build untuk produksi
npm run build

# Preview build produksi
npm run preview

# Linter check (oxlint)
npm run lint
```

---

## 🔗 Link Vercel Deployment

[](https://pwa1-prak-ppb.vercel.app)
