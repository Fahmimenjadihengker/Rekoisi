# PRD — Website Sistem Rekomendasi Puisi Indonesia Berbasis IndoBERT

## 1. Ringkasan Produk

Website ini adalah aplikasi sistem rekomendasi puisi Bahasa Indonesia berbasis content-based filtering. Sistem memungkinkan pengguna memilih atau mencari sebuah puisi sebagai acuan, kemudian menampilkan rekomendasi puisi lain yang memiliki kemiripan makna berdasarkan representasi embedding IndoBERT dan perhitungan cosine similarity.

Aplikasi ini dikembangkan sebagai implementasi dari penelitian tentang sistem rekomendasi puisi Indonesia berbasis IndoBERT dengan cosine similarity dan evaluasi KeyBERT. Website berfungsi sebagai antarmuka pengguna agar hasil penelitian dapat diuji, ditampilkan, dan dipresentasikan secara interaktif.

## 2. Tujuan Produk

Tujuan utama aplikasi adalah:

1. Menyediakan platform berbasis web untuk mencari dan membaca data puisi Indonesia.
2. Menampilkan rekomendasi top-5 puisi berdasarkan kemiripan semantik.
3. Menampilkan skor cosine similarity untuk setiap rekomendasi.
4. Menampilkan kata kunci puisi menggunakan KeyBERT sebagai elemen interpretasi.
5. Menyediakan halaman evaluasi sederhana untuk menampilkan hasil relevansi dan precision.
6. Membantu pengguna memahami hubungan makna antara puisi acuan dan puisi rekomendasi.

## 3. Target Pengguna

Target pengguna aplikasi meliputi:

1. Peneliti atau mahasiswa yang sedang menguji sistem rekomendasi puisi.
2. Dosen atau reviewer yang ingin melihat implementasi sistem secara langsung.
3. Pembaca puisi yang ingin menemukan puisi lain dengan nuansa atau tema serupa.
4. Pengembang yang ingin memahami implementasi sistem rekomendasi berbasis NLP.

## 4. Ruang Lingkup Produk

### 4.1 Fitur yang Termasuk

Aplikasi harus memiliki fitur berikut:

1. Halaman beranda.
2. Halaman daftar puisi.
3. Fitur pencarian puisi berdasarkan judul atau isi puisi.
4. Halaman detail puisi.
5. Fitur rekomendasi top-5 puisi.
6. Tampilan skor cosine similarity.
7. Tampilan kata kunci puisi acuan dan rekomendasi.
8. Halaman evaluasi precision.
9. Halaman tentang metode penelitian.
10. Dashboard ringkasan dataset.
11. API backend untuk mengambil data puisi dan hasil rekomendasi.

### 4.2 Fitur yang Tidak Termasuk pada Versi Awal

Fitur berikut tidak wajib dibuat pada versi awal:

1. Login pengguna.
2. Sistem rating atau feedback pengguna.
3. Upload puisi dari pengguna umum.
4. Pelatihan ulang model melalui website.
5. Admin panel kompleks.
6. Deployment model IndoBERT secara real-time jika file embedding dan similarity sudah tersedia.

## 5. Tech Stack

### 5.1 Frontend

Gunakan:

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Recharts untuk visualisasi evaluasi
- Lucide React untuk ikon

Opsional:

- shadcn/ui untuk komponen UI
- Framer Motion untuk animasi ringan

### 5.2 Backend

Gunakan salah satu opsi berikut:

#### Opsi Direkomendasikan

- Python FastAPI
- Pandas
- NumPy
- Scikit-learn
- KeyBERT
- Sentence Transformers
- Uvicorn

#### Alternatif

- Flask sebagai backend sederhana

### 5.3 Data dan Model

File yang digunakan:

- `puisi_clean.csv`
- `puisi_embeddings.npy`
- `cosine_sim_matrix.npy`

Backend tidak perlu menghitung embedding ulang setiap request. Embedding dan cosine similarity sebaiknya sudah dihitung sebelumnya melalui Google Colab, kemudian file hasilnya dimuat oleh backend saat server dijalankan.

## 6. Arsitektur Sistem

### 6.1 Alur Utama Sistem

1. Pengguna membuka website.
2. Pengguna mencari atau memilih puisi acuan.
3. Frontend mengirim request ke backend dengan `poem_id`.
4. Backend membaca matriks cosine similarity.
5. Backend mengambil top-5 puisi dengan skor tertinggi selain puisi acuan.
6. Backend mengirim data rekomendasi ke frontend.
7. Frontend menampilkan puisi acuan, rekomendasi, skor similarity, dan kata kunci.

### 6.2 Arsitektur Sederhana

```text
React Frontend
     |
     | HTTP Request
     v
FastAPI Backend
     |
     | Load Data
     v
puisi_clean.csv + cosine_sim_matrix.npy + puisi_embeddings.npy
```

## 7. Struktur Folder Proyek

Gunakan struktur berikut:

```text
poetry-recommendation-system/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── routes/
│       │   ├── Home.jsx
│       │   ├── Poems.jsx
│       │   ├── PoemDetail.jsx
│       │   ├── Evaluation.jsx
│       │   └── AboutMethod.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── PoemCard.jsx
│       │   ├── SearchBar.jsx
│       │   ├── RecommendationTable.jsx
│       │   ├── KeywordBadge.jsx
│       │   ├── SimilarityBadge.jsx
│       │   └── LoadingState.jsx
│       ├── services/
│       │   └── api.js
│       └── styles/
│           └── index.css
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── data/
│   │   ├── puisi_clean.csv
│   │   ├── puisi_embeddings.npy
│   │   └── cosine_sim_matrix.npy
│   ├── services/
│   │   ├── data_loader.py
│   │   ├── recommender.py
│   │   ├── keyword_extractor.py
│   │   └── evaluation.py
│   └── schemas/
│       └── response_schema.py
│
└── README.md
```

## 8. Halaman Frontend

### 8.1 Halaman Beranda

URL:

```text
/
```

Tujuan:

Menampilkan ringkasan aplikasi dan mengarahkan pengguna untuk mencoba rekomendasi puisi.

Konten:

1. Judul aplikasi: “Sistem Rekomendasi Puisi Indonesia”.
2. Deskripsi singkat metode:
   - IndoBERT untuk representasi teks.
   - Cosine similarity untuk menghitung kemiripan.
   - KeyBERT untuk interpretasi kata kunci.
3. Tombol “Mulai Cari Puisi”.
4. Statistik ringkas:
   - Jumlah puisi.
   - Jumlah data setelah preprocessing.
   - Model yang digunakan.
   - Output rekomendasi: top-5 puisi.

Komponen:

- Hero section
- Statistics cards
- Method summary cards

### 8.2 Halaman Daftar Puisi

URL:

```text
/poems
```

Tujuan:

Menampilkan daftar puisi yang tersedia dalam dataset.

Fitur:

1. Search berdasarkan judul.
2. Search berdasarkan isi puisi.
3. Pagination.
4. Card puisi berisi:
   - Judul
   - Penulis
   - Potongan isi puisi
   - Tombol “Lihat Detail”
   - Tombol “Cari Rekomendasi”

UI requirement:

- Gunakan grid card.
- Setiap card maksimal menampilkan 150 karakter isi puisi.
- Jika judul kosong, tampilkan “Tanpa Judul”.
- Jika penulis kosong, tampilkan “Tidak Diketahui”.

### 8.3 Halaman Detail Puisi

URL:

```text
/poems/:id
```

Tujuan:

Menampilkan detail puisi acuan dan rekomendasi top-5.

Konten:

1. Judul puisi acuan.
2. Penulis.
3. Isi puisi lengkap.
4. Kata kunci puisi acuan.
5. Tombol “Tampilkan Rekomendasi”.
6. Tabel rekomendasi top-5.

Tabel rekomendasi berisi:

| Peringkat | Judul Rekomendasi | Skor Cosine Similarity | Kata Kunci | Aksi |
|---|---|---:|---|---|
| 1 | Mentariku | 0.8970 | hatiku, anganku, cintaku | Detail |
| 2 | Lingkaran Pesan | 0.8949 | hatiku, jiwaku, mencintaimu | Detail |

Catatan:

- Skor similarity tampil dengan 4 angka desimal.
- Rekomendasi tidak boleh menampilkan puisi acuan itu sendiri.
- Jika KeyBERT lambat, kata kunci boleh dimuat setelah rekomendasi tampil.

### 8.4 Halaman Evaluasi

URL:

```text
/evaluation
```

Tujuan:

Menampilkan hasil evaluasi lima tes dan precision.

Konten:

1. Ringkasan evaluasi:
   - Total tes: 5
   - Total rekomendasi: 25
   - Total relevan: 11
   - Precision rata-rata: 0.44
2. Tabel hasil precision.
3. Grafik precision per tes.
4. Penjelasan keterbatasan evaluasi KeyBERT.

Tabel:

| Tes | Puisi Acuan | Jumlah Relevan | Total Rekomendasi | Precision |
|---:|---|---:|---:|---:|
| 1 | Untuk Kekasihku | 2 | 5 | 0.40 |
| 2 | Jarak Cinta | 3 | 5 | 0.60 |
| 3 | Jambu | 2 | 5 | 0.40 |
| 4 | Sadarkan Ak | 2 | 5 | 0.40 |
| 5 | Kangen | 2 | 5 | 0.40 |

Grafik:

- Bar chart precision per tes.
- Gunakan Recharts.

Narasi evaluasi:

Aplikasi harus menampilkan bahwa KeyBERT digunakan sebagai alat bantu evaluasi berbasis kata kunci. Namun, evaluasi berbasis exact keyword match memiliki keterbatasan karena tidak selalu menangkap kesamaan semantik yang ditangkap oleh IndoBERT.

### 8.5 Halaman Tentang Metode

URL:

```text
/about-method
```

Tujuan:

Menjelaskan tahapan metode penelitian.

Konten:

1. Pengumpulan data.
2. Load dataset.
3. Preprocessing data.
4. Representasi teks menggunakan IndoBERT.
5. Perhitungan cosine similarity.
6. Pemberian rekomendasi.
7. Evaluasi sistem menggunakan KeyBERT dan precision.

Tampilkan flow:

```text
Dataset Puisi
    ↓
Preprocessing
    ↓
Embedding IndoBERT
    ↓
Cosine Similarity
    ↓
Top-5 Recommendation
    ↓
KeyBERT Evaluation
    ↓
Precision
```

## 9. API Backend

### 9.1 GET `/api/health`

Tujuan:

Mengecek apakah backend berjalan.

Response:

```json
{
  "status": "ok",
  "message": "Poetry recommendation API is running"
}
```

### 9.2 GET `/api/stats`

Tujuan:

Mengambil statistik dataset.

Response:

```json
{
  "total_poems": 7194,
  "embedding_dimension": 768,
  "model": "IndoBERT",
  "similarity_method": "Cosine Similarity"
}
```

### 9.3 GET `/api/poems`

Tujuan:

Mengambil daftar puisi dengan pagination dan search.

Query params:

```text
page=1
limit=12
search=cinta
```

Response:

```json
{
  "page": 1,
  "limit": 12,
  "total": 7194,
  "data": [
    {
      "id": 0,
      "title": "Untuk Kekasihku",
      "author": "Oleh Suzianty Westerveld",
      "preview": "Tiada lagi resah di hatiku..."
    }
  ]
}
```

### 9.4 GET `/api/poems/{poem_id}`

Tujuan:

Mengambil detail puisi.

Response:

```json
{
  "id": 0,
  "title": "Untuk Kekasihku",
  "author": "Oleh Suzianty Westerveld",
  "text": "Tiada lagi resah di hatiku...",
  "clean_text": "tiada lagi resah di hatiku..."
}
```

### 9.5 GET `/api/poems/{poem_id}/recommendations`

Tujuan:

Mengambil top-5 rekomendasi puisi.

Query params:

```text
top_n=5
include_keywords=true
```

Response:

```json
{
  "query": {
    "id": 0,
    "title": "Untuk Kekasihku",
    "author": "Oleh Suzianty Westerveld",
    "keywords": ["hatiku", "jantungkuoh", "akupunberjanji"]
  },
  "recommendations": [
    {
      "rank": 1,
      "id": 125,
      "title": "Mentariku",
      "author": "Oleh Ikke Nur Vita Sari",
      "similarity_score": 0.8970,
      "keywords": ["hatiku", "anganku", "cintaku"]
    }
  ]
}
```

### 9.6 POST `/api/evaluate`

Tujuan:

Mengevaluasi rekomendasi untuk satu puisi menggunakan KeyBERT.

Request:

```json
{
  "poem_id": 0,
  "top_n": 5
}
```

Response:

```json
{
  "query": {
    "id": 0,
    "title": "Untuk Kekasihku",
    "keywords": ["hatiku", "jantungkuoh", "akupunberjanji"]
  },
  "results": [
    {
      "rank": 1,
      "title": "Mentariku",
      "similarity_score": 0.8970,
      "recommendation_keywords": ["hatiku", "anganku", "cintaku"],
      "matched_keywords": ["hatiku"],
      "relevance": 1
    }
  ],
  "precision": 0.40
}
```

### 9.7 GET `/api/evaluation-summary`

Tujuan:

Mengambil hasil evaluasi lima tes yang sudah ditentukan.

Response:

```json
{
  "total_tests": 5,
  "total_recommendations": 25,
  "total_relevant": 11,
  "average_precision": 0.44,
  "tests": [
    {
      "test": 1,
      "query_title": "Untuk Kekasihku",
      "relevant_count": 2,
      "total_recommendations": 5,
      "precision": 0.40
    },
    {
      "test": 2,
      "query_title": "Jarak Cinta",
      "relevant_count": 3,
      "total_recommendations": 5,
      "precision": 0.60
    }
  ]
}
```

## 10. Logika Rekomendasi

### 10.1 Input

Input rekomendasi adalah `poem_id`.

### 10.2 Proses

1. Ambil baris similarity dari `cosine_sim_matrix[poem_id]`.
2. Buat pasangan data `(index, score)`.
3. Urutkan berdasarkan score secara descending.
4. Hapus index yang sama dengan `poem_id`.
5. Ambil top-5.
6. Ambil metadata puisi dari dataframe.
7. Return hasil ke frontend.

### 10.3 Pseudocode

```python
def recommend_poems(poem_id, top_n=5):
    scores = enumerate(cosine_sim_matrix[poem_id])
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
    sorted_scores = [(idx, score) for idx, score in sorted_scores if idx != poem_id]
    top_results = sorted_scores[:top_n]

    return [
        {
            "rank": rank,
            "id": idx,
            "title": df.loc[idx, "title"],
            "author": df.loc[idx, "author"],
            "similarity_score": round(score, 4)
        }
        for rank, (idx, score) in enumerate(top_results, start=1)
    ]
```

## 11. Logika Evaluasi

### 11.1 Aturan Relevansi

Rekomendasi dianggap relevan jika terdapat minimal satu kata kunci yang sama antara puisi acuan dan puisi rekomendasi.

```text
Rel(dq, dr) = 1, jika Kdq ∩ Kdr ≠ ∅
Rel(dq, dr) = 0, jika Kdq ∩ Kdr = ∅
```

### 11.2 Precision

```text
Precision = jumlah rekomendasi relevan / total rekomendasi
```

### 11.3 Contoh

Jika dari 5 rekomendasi terdapat 2 rekomendasi relevan, maka:

```text
Precision = 2 / 5 = 0.40
```

## 12. Data Evaluasi Tetap

Gunakan hasil evaluasi berikut untuk halaman evaluasi:

```json
[
  {
    "test": 1,
    "query_title": "Untuk Kekasihku",
    "relevant_count": 2,
    "total_recommendations": 5,
    "precision": 0.40
  },
  {
    "test": 2,
    "query_title": "Jarak Cinta",
    "relevant_count": 3,
    "total_recommendations": 5,
    "precision": 0.60
  },
  {
    "test": 3,
    "query_title": "Jambu",
    "relevant_count": 2,
    "total_recommendations": 5,
    "precision": 0.40
  },
  {
    "test": 4,
    "query_title": "Sadarkan Ak",
    "relevant_count": 2,
    "total_recommendations": 5,
    "precision": 0.40
  },
  {
    "test": 5,
    "query_title": "Kangen",
    "relevant_count": 2,
    "total_recommendations": 5,
    "precision": 0.40
  }
]
```

Rata-rata precision:

```text
0.44
```

Total relevan:

```text
11
```

Total rekomendasi:

```text
25
```

## 13. UI/UX Requirement

### 13.1 Gaya Visual

Gunakan gaya visual yang bersih, akademik, dan modern.

Karakter tampilan:

- Background terang.
- Warna utama: biru tua, ungu, atau hijau kebiruan.
- Card dengan border halus.
- Rounded corners.
- Spasi cukup luas.
- Typography mudah dibaca.

### 13.2 Komponen UI

Gunakan komponen berikut:

1. Navbar
2. Search bar
3. Poem card
4. Detail panel
5. Recommendation table
6. Similarity badge
7. Keyword badge
8. Precision chart
9. Empty state
10. Loading state

### 13.3 Responsiveness

Website harus responsif untuk:

1. Desktop
2. Tablet
3. Mobile

Pada mobile:

- Tabel rekomendasi boleh berubah menjadi card list.
- Navbar boleh menjadi hamburger menu.
- Isi puisi harus tetap mudah dibaca.

## 14. Validasi dan Error Handling

### 14.1 Frontend

Tampilkan pesan error jika:

1. Backend tidak bisa diakses.
2. Data puisi gagal dimuat.
3. Rekomendasi gagal diambil.
4. Search tidak menemukan hasil.

Contoh pesan:

```text
Data puisi tidak ditemukan.
Gagal mengambil rekomendasi. Silakan coba kembali.
```

### 14.2 Backend

Backend harus menangani:

1. `poem_id` tidak valid.
2. File dataset tidak ditemukan.
3. File similarity tidak ditemukan.
4. KeyBERT gagal memproses teks.
5. Request top_n melebihi batas.

Response error:

```json
{
  "detail": "Poem ID not found"
}
```

## 15. Performance Requirement

1. Daftar puisi harus menggunakan pagination.
2. Jangan kirim seluruh dataset sekaligus ke frontend.
3. Backend harus memuat file `.csv` dan `.npy` satu kali saat startup.
4. Rekomendasi harus diproses dari matriks similarity yang sudah tersedia.
5. Hindari menghitung ulang IndoBERT di dalam request.
6. KeyBERT dapat dibuat opsional karena prosesnya lebih lambat.
7. Jika keyword sering dipakai, buat caching keyword berdasarkan `poem_id`.

## 16. Caching Requirement

Backend sebaiknya memiliki cache sederhana:

```python
keyword_cache = {}
```

Saat keyword diminta:

1. Cek apakah `poem_id` sudah ada di cache.
2. Jika ada, return cache.
3. Jika belum, jalankan KeyBERT.
4. Simpan hasil ke cache.

Tujuannya untuk mempercepat request berikutnya.

## 17. Keamanan Dasar

Karena aplikasi tidak memiliki login pada versi awal, keamanan yang perlu diterapkan:

1. Validasi input query.
2. Batasi `top_n`, misalnya maksimal 10.
3. Gunakan CORS hanya untuk domain frontend.
4. Jangan expose path file lokal.
5. Jangan izinkan upload file dari pengguna pada versi awal.

## 18. Acceptance Criteria

Aplikasi dianggap selesai jika memenuhi kriteria berikut:

1. Pengguna dapat membuka halaman beranda.
2. Pengguna dapat melihat daftar puisi.
3. Pengguna dapat mencari puisi berdasarkan judul atau isi.
4. Pengguna dapat membuka detail puisi.
5. Pengguna dapat menampilkan top-5 rekomendasi.
6. Rekomendasi tidak menampilkan puisi acuan.
7. Skor cosine similarity tampil dengan 4 angka desimal.
8. Halaman evaluasi menampilkan precision lima tes.
9. Grafik precision tampil dengan benar.
10. Halaman metode menjelaskan alur penelitian.
11. Backend menyediakan API sesuai spesifikasi.
12. Website responsif di desktop dan mobile.
13. File data dapat dimuat tanpa error.
14. README berisi panduan menjalankan frontend dan backend.

## 19. Instruksi Implementasi untuk AI Agent

AI agent harus membuat aplikasi full-stack dengan urutan berikut:

1. Buat backend FastAPI.
2. Buat loader untuk `puisi_clean.csv` dan `cosine_sim_matrix.npy`.
3. Buat endpoint `/api/health`.
4. Buat endpoint `/api/stats`.
5. Buat endpoint `/api/poems`.
6. Buat endpoint `/api/poems/{poem_id}`.
7. Buat endpoint `/api/poems/{poem_id}/recommendations`.
8. Buat endpoint `/api/evaluation-summary`.
9. Buat frontend React dengan Vite.
10. Buat routing halaman.
11. Buat komponen UI.
12. Hubungkan frontend ke backend menggunakan Axios.
13. Buat halaman daftar puisi.
14. Buat halaman detail dan rekomendasi.
15. Buat halaman evaluasi dengan chart.
16. Buat halaman metode.
17. Tambahkan loading state dan error handling.
18. Pastikan tampilan responsif.
19. Buat README lengkap.
20. Berikan instruksi menjalankan aplikasi.

## 20. Contoh Perintah Menjalankan Proyek

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Untuk Linux atau macOS:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend berjalan di:

```text
http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di:

```text
http://localhost:5173
```

## 21. README yang Harus Dibuat Agent

README harus memuat:

1. Nama proyek.
2. Deskripsi proyek.
3. Tech stack.
4. Struktur folder.
5. Cara menyiapkan dataset.
6. Cara menjalankan backend.
7. Cara menjalankan frontend.
8. Daftar endpoint API.
9. Screenshot atau placeholder screenshot.
10. Catatan bahwa embedding dan cosine similarity dihitung sebelumnya melalui Google Colab.

## 22. Catatan Penting

1. Website tidak perlu menghitung embedding IndoBERT secara real-time.
2. File `puisi_embeddings.npy` dan `cosine_sim_matrix.npy` dihasilkan dari Google Colab.
3. Untuk rekomendasi, cukup gunakan `cosine_sim_matrix.npy`.
4. Untuk informasi puisi, gunakan `puisi_clean.csv`.
5. KeyBERT digunakan untuk interpretasi kata kunci dan evaluasi.
6. Jika KeyBERT terlalu lambat untuk website, endpoint rekomendasi tetap harus bisa berjalan tanpa keyword.
7. Fokus utama aplikasi adalah demonstrasi sistem rekomendasi berbasis penelitian.

## 23. Output Akhir yang Diharapkan

AI agent harus menghasilkan:

1. Source code frontend React.
2. Source code backend FastAPI.
3. Struktur folder rapi.
4. API berjalan.
5. Frontend dapat mengambil data dari API.
6. Halaman rekomendasi berfungsi.
7. Halaman evaluasi berfungsi.
8. README lengkap.
9. Desain responsif dan siap dipresentasikan.
