````markdown
# 🚧 Road Damage AI - Frontend

Antarmuka web interaktif untuk sistem **Road Damage Detection**. Proyek ini dirancang menggunakan arsitektur modern Next.js dan mengusung gaya desain _Dark Mode Neo-Brutalism_ yang berani, fungsional, dan khas dengan nuansa zona konstruksi (hitam, putih tebal, dan kuning).

Aplikasi ini bertugas sebagai klien yang berinteraksi dengan model _Deep Learning_ (YOLOv11) di _backend_ untuk mengidentifikasi kerusakan jalan seperti lubang (_potholes_) dan retakan (_cracks_) secara instan.

## ✨ Fitur Utama

- **Multi-Input System:** Mendukung unggah gambar _drag-and-drop_ file lokal atau tangkapan langsung menggunakan kamera (_Live Cam_).
- **Interactive Result Viewer:** Fitur _toggle_ untuk membandingkan gambar asli (_Original Mode_) dengan gambar hasil deteksi _bounding box_ (_Detected Mode_).
- **Neo-Brutalist UI:** Antarmuka yang responsif dengan efek bayangan kasar (_hard shadows_), animasi _micro-interactions_, dan peringatan sistem bergaya industrial.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Bahasa Pemrograman:** TypeScript / JavaScript
- **Styling:** Tailwind CSS v4
- **Ikonografi:** Lucide React
- **Animasi:** Framer Motion
- **Utilitas Tambahan:** - `react-dropzone` (Manajemen unggah file)
    - `react-webcam` (Integrasi kamera perangkat)
    - `clsx` (Manajemen _class_ kondisional)

## ⚙️ Persyaratan Sistem

Pastikan Node.js (versi 18.17 atau lebih baru) sudah terinstal di komputer kamu.

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

1. **Clone atau buka direktori proyek ini** di terminal pilihanmu.
2. **Instal seluruh dependensi:**
    ```bash
    npm install
    ```
````

_(Atau pastikan dependensi utilitas utama sudah terpasang: `npm install lucide-react react-dropzone react-webcam framer-motion clsx`)_

3. **Konfigurasi Environment Variable:**
   Buat file bernama `.env.local` di direktori _root_ dan tambahkan URL _backend_ Flask yang akan dituju:

```env
NEXT_PUBLIC_API_URL=[http://127.0.0.1:5000](http://127.0.0.1:5000)

```

_(Ubah URL jika backend di-hosting di tempat lain)._ 4. **Jalankan Development Server:**

```bash
npm run dev

```

5. Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di _browser_ untuk melihat dan menguji aplikasi.

## 📁 Struktur Direktori Utama

- `/app` - Konfigurasi rute utama (`layout.tsx`, `page.tsx`) dan _styling global_ Tailwind v4 (`globals.css`).
- `/components` - Komponen modular UI yang dapat digunakan kembali (`Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `InputArea.tsx`).
- `/public` - Penyimpanan aset statis, logo, atau ikon pendukung.

---

**© 2026 Nopall. All rights reserved.**
