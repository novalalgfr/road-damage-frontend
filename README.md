# 🚧 Road Damage AI — Frontend

Antarmuka web interaktif untuk sistem **Road Damage Detection**. Proyek ini dirancang menggunakan arsitektur modern Next.js dengan gaya desain *Dark Mode Neo-Brutalism* yang berani dan fungsional, terinspirasi dari nuansa zona konstruksi (hitam, putih tebal, dan kuning).

Aplikasi ini bertugas sebagai klien yang berinteraksi dengan model *Deep Learning* (YOLOv11) di *backend* untuk mengidentifikasi kerusakan jalan seperti lubang (*potholes*) dan retakan (*cracks*) secara instan.

---

## ✨ Fitur Utama

- **Multi-Input System** — Mendukung unggah gambar *drag-and-drop* dari file lokal atau tangkapan langsung menggunakan kamera (*Live Cam*).
- **Interactive Result Viewer** — Fitur *toggle* untuk membandingkan gambar asli (*Original Mode*) dengan hasil deteksi *bounding box* (*Detected Mode*).
- **Neo-Brutalist UI** — Antarmuka responsif dengan efek bayangan kasar (*hard shadows*), animasi *micro-interactions*, dan peringatan sistem bergaya industrial.

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Bahasa | TypeScript / JavaScript |
| Styling | Tailwind CSS v4 |
| Ikonografi | Lucide React |
| Animasi | Framer Motion |
| Upload File | react-dropzone |
| Kamera | react-webcam |
| Utilitas | clsx |

---

## ⚙️ Persyaratan Sistem

- **Node.js** versi **18.17** atau lebih baru

---

## 🚀 Instalasi & Menjalankan Aplikasi

**1. Clone atau buka direktori proyek**
```bash
git clone <repo-url>
cd <nama-proyek>
```

**2. Instal dependensi**
```bash
npm install
```

**3. Konfigurasi environment variable**

Buat file `.env.local` di direktori *root* proyek, lalu tambahkan:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

> Sesuaikan URL jika *backend* di-hosting di alamat lain.

**4. Jalankan development server**
```bash
npm run dev
```

**5. Buka di browser**

Akses [http://localhost:3000](http://localhost:3000) untuk melihat dan menguji aplikasi.

---

## 📁 Struktur Direktori
```
/
├── app/              # Konfigurasi rute utama (layout.tsx, page.tsx) & global styling (globals.css)
├── components/       # Komponen UI modular (Navbar.tsx, Footer.tsx, Hero.tsx, InputArea.tsx)
└── public/           # Aset statis (logo, ikon, dll.)
```

---

**© 2026 Nopall. All rights reserved.**
