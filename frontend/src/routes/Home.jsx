import { ArrowRight, BarChart3, BookOpen, BrainCircuit, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingState from '../components/LoadingState.jsx'
import { getStats } from '../services/api.js'

export default function Home() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getStats().then(setStats).catch(() => setError('Backend tidak bisa diakses. Pastikan FastAPI sudah berjalan.'))
  }, [])

  return (
    <section className="container-page py-14 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-800">
            <Sparkles size={18} /> Content-based filtering untuk puisi Indonesia
          </div>
          <h1 className="font-serif text-5xl font-black leading-tight text-ink md:text-7xl">
            Rekoisi
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Rekoisi adalah singkatan dari rekomendasi puisi. Temukan puisi Indonesia dengan nuansa makna serupa
            melalui representasi teks IndoBERT, perhitungan cosine similarity, dan kata kunci sebagai interpretasi hasil rekomendasi.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/poems" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ocean px-6 py-4 font-black text-white shadow-soft transition hover:bg-teal-800">
              Mulai Cari Puisi <ArrowRight size={20} />
            </Link>
            <Link to="/about-method" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 font-black text-slate-700 transition hover:border-ocean hover:text-ocean">
              Pelajari Metode
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-soft">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-indigoDeep via-slate-900 to-ocean p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal-100">Pipeline</p>
            <div className="mt-8 grid gap-4">
              {['Dataset Puisi', 'Preprocessing', 'Embedding IndoBERT', 'Cosine Similarity', 'Top-5 Recommendation'].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-indigoDeep">{index + 1}</span>
                  <span className="font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-5 font-semibold text-red-700">{error}</div>}
        {!stats && !error && <LoadingState label="Memuat statistik dataset..." />}
        {stats && (
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard icon={<BookOpen />} label="Jumlah Puisi" value={stats.total_poems?.toLocaleString('id-ID')} />
            <StatCard icon={<BrainCircuit />} label="Dimensi Embedding" value={stats.embedding_dimension} />
            <StatCard icon={<BarChart3 />} label="Model" value={stats.model} />
            <StatCard icon={<Sparkles />} label="Output" value="Top-5" />
          </div>
        )}
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <MethodCard title="IndoBERT" text="Mewakili isi puisi sebagai embedding semantik Bahasa Indonesia dari hasil pemrosesan sebelumnya." />
        <MethodCard title="Cosine Similarity" text="Mengukur kedekatan antar puisi dari matriks similarity yang dimuat satu kali oleh backend." />
        <MethodCard title="KeyBERT" text="Membantu interpretasi rekomendasi melalui kata kunci dan evaluasi precision sederhana." />
      </div>
    </section>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-ocean">{icon}</div>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
    </div>
  )
}

function MethodCard({ title, text }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <h3 className="font-serif text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </article>
  )
}
