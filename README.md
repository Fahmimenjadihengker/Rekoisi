# Sistem Rekomendasi Puisi Indonesia Berbasis IndoBERT

Website full-stack untuk menampilkan sistem rekomendasi puisi Indonesia berbasis content-based filtering. Sistem menggunakan data puisi, embedding IndoBERT, dan matriks cosine similarity yang sudah dihitung sebelumnya melalui Google Colab.

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Axios, Recharts, Lucide React
- Backend: Python FastAPI, Pandas, NumPy, Scikit-learn, Uvicorn
- Interpretasi keyword: KeyBERT opsional dengan fallback keyword extractor cepat
- Data/model: `puisi_clean.csv`, `puisi_embeddings.npy`, `cosine_sim_matrix.npy`

## Struktur Folder

```text
website/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── data/
│   │   ├── puisi_clean.csv
│   │   ├── puisi_embeddings.npy
│   │   └── cosine_sim_matrix.npy
│   ├── schemas/
│   │   └── response_schema.py
│   └── services/
│       ├── data_loader.py
│       ├── recommender.py
│       ├── keyword_extractor.py
│       └── evaluation.py
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       ├── routes/
│       ├── services/
│       └── styles/
└── README.md
```

## Dataset dan Model

Pastikan file berikut ada di `backend/data/`:

- `puisi_clean.csv`
- `puisi_embeddings.npy`
- `cosine_sim_matrix.npy`

Embedding IndoBERT dan matriks cosine similarity tidak dihitung ulang oleh website. File tersebut diasumsikan sudah dibuat sebelumnya melalui Google Colab atau pipeline penelitian lain.

## Menjalankan Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend berjalan di `http://localhost:8000`.

Untuk mengaktifkan KeyBERT asli, set environment variable berikut sebelum menjalankan server:

```bash
set ENABLE_KEYBERT=true
uvicorn main:app --reload
```

Jika `ENABLE_KEYBERT` tidak aktif atau model gagal dimuat, backend tetap berjalan memakai fallback keyword extractor berbasis frekuensi kata.

## Menjalankan Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

Jika backend menggunakan URL berbeda, buat file `.env` di folder `frontend/`:

```text
VITE_API_BASE_URL=http://localhost:8000/api
```

## Deployment Gratis

Rekomendasi deployment untuk project ini:

- Frontend: Vercel
- Backend: Hugging Face Spaces tipe Docker

Backend production memakai `backend/requirements.prod.txt` agar runtime tetap ringan. File ini tidak memasang `keybert` dan `sentence-transformers` karena rekomendasi website menggunakan embedding dan matriks cosine similarity yang sudah dihitung offline.

### Backend di Hugging Face Spaces

1. Buat Space baru dengan SDK `Docker`.
2. Upload isi project ini ke Space, termasuk `Dockerfile`, folder `backend/`, dan file data di `backend/data/`.
3. Tambahkan environment variable berikut di Space:

```text
CORS_ORIGINS=https://domain-frontend-vercel.vercel.app
ENABLE_KEYBERT=false
```

Hugging Face Spaces akan menjalankan backend di port `7860` dengan command:

```bash
uvicorn main:app --host 0.0.0.0 --port 7860
```

Endpoint API production akan berbentuk:

```text
https://nama-space.hf.space/api
```

### Frontend di Vercel

Set environment variable berikut di project Vercel:

```text
VITE_API_BASE_URL=https://nama-space.hf.space/api
```

Konfigurasi build Vercel:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

## Endpoint API

- `GET /api/health`: cek status API
- `GET /api/stats`: statistik dataset dan model
- `GET /api/poems?page=1&limit=12&search=cinta`: daftar puisi dengan pagination dan pencarian
- `GET /api/poems/{poem_id}`: detail puisi
- `GET /api/poems/{poem_id}/recommendations?top_n=5&include_keywords=true`: rekomendasi top-N
- `POST /api/evaluate`: evaluasi satu puisi berdasarkan keyword match
- `GET /api/evaluation-summary`: ringkasan evaluasi lima tes tetap

## Halaman Website

- `/`: beranda dengan ringkasan sistem dan statistik dataset
- `/poems`: daftar puisi, pencarian, pagination, dan tombol rekomendasi
- `/poems/:id`: detail puisi, keyword, dan top-5 rekomendasi
- `/evaluation`: tabel dan grafik precision
- `/about-method`: alur metode penelitian

## Placeholder Screenshot

Tambahkan screenshot setelah aplikasi dijalankan:

- `screenshots/home.png`
- `screenshots/poems.png`
- `screenshots/detail-recommendations.png`
- `screenshots/evaluation.png`

## Catatan

- Rekomendasi tidak menampilkan puisi acuan itu sendiri.
- Skor cosine similarity dibulatkan menjadi empat angka desimal.
- `top_n` dibatasi maksimal 10 di backend.
- Daftar puisi memakai pagination agar frontend tidak memuat seluruh dataset sekaligus.
- CORS default hanya mengizinkan `http://localhost:5173` dan `http://127.0.0.1:5173`.
