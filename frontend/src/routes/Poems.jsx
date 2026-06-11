import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoadingState from '../components/LoadingState.jsx'
import PoemCard from '../components/PoemCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { getPoems } from '../services/api.js'

const LIMIT = 12

export default function Poems() {
  const [search, setSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [page, setPage] = useState(1)
  const [payload, setPayload] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    getPoems({ page, limit: LIMIT, search: activeSearch || undefined })
      .then(setPayload)
      .catch(() => setError('Data puisi gagal dimuat. Pastikan backend berjalan.'))
      .finally(() => setLoading(false))
  }, [page, activeSearch])

  const totalPages = payload ? Math.max(1, Math.ceil(payload.total / LIMIT)) : 1

  function handleSubmit(event) {
    event.preventDefault()
    setPage(1)
    setActiveSearch(search.trim())
  }

  return (
    <section className="container-page py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Dataset Puisi</p>
        <h1 className="mt-3 font-serif text-4xl font-black md:text-5xl">Daftar Puisi Indonesia</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Cari puisi berdasarkan judul, penulis, atau potongan isi, lalu gunakan salah satu puisi sebagai acuan rekomendasi.
        </p>
      </div>

      <SearchBar value={search} onChange={setSearch} onSubmit={handleSubmit} />

      <div className="mt-8">
        {loading && <LoadingState />}
        {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-5 font-semibold text-red-700">{error}</div>}
        {!loading && !error && payload?.data?.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Data puisi tidak ditemukan.
          </div>
        )}
        {!loading && !error && payload?.data?.length > 0 && (
          <>
            <div className="mb-5 flex flex-col justify-between gap-2 text-sm font-semibold text-slate-500 sm:flex-row">
              <span>Total data: {payload.total.toLocaleString('id-ID')}</span>
              <span>Halaman {page} dari {totalPages}</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {payload.data.map((poem) => <PoemCard key={poem.id} poem={poem} />)}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} /> Sebelumnya
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
