import { ArrowLeft, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import KeywordBadge from '../components/KeywordBadge.jsx'
import LoadingState from '../components/LoadingState.jsx'
import RecommendationTable from '../components/RecommendationTable.jsx'
import { getPoem, getRecommendations } from '../services/api.js'

export default function PoemDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [poem, setPoem] = useState(null)
  const [recommendationPayload, setRecommendationPayload] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recommendationLoading, setRecommendationLoading] = useState(false)
  const [error, setError] = useState('')
  const [recommendationError, setRecommendationError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    setRecommendationPayload(null)
    getPoem(id)
      .then(setPoem)
      .catch(() => setError('Data puisi tidak ditemukan.'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('recommend') === 'true' && poem) {
      loadRecommendations()
    }
  }, [location.search, poem])

  function loadRecommendations() {
    setRecommendationLoading(true)
    setRecommendationError('')
    getRecommendations(id, { top_n: 5, include_keywords: true })
      .then(setRecommendationPayload)
      .catch(() => setRecommendationError('Gagal mengambil rekomendasi. Silakan coba kembali.'))
      .finally(() => setRecommendationLoading(false))
  }

  if (loading) {
    return <section className="container-page py-12"><LoadingState label="Memuat detail puisi..." /></section>
  }

  if (error) {
    return <section className="container-page py-12"><div className="rounded-3xl border border-red-200 bg-red-50 p-6 font-semibold text-red-700">{error}</div></section>
  }

  const queryKeywords = recommendationPayload?.query?.keywords || []

  return (
    <section className="container-page py-12">
      <Link to="/poems" className="mb-6 inline-flex items-center gap-2 font-bold text-ocean hover:text-teal-900">
        <ArrowLeft size={18} /> Kembali ke daftar puisi
      </Link>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-ocean">Puisi Acuan</p>
          <h1 className="mt-3 font-serif text-4xl font-black leading-tight text-ink">{poem.title}</h1>
          <p className="mt-2 font-bold text-slate-500">{poem.author}</p>
          <div className="mt-6 rounded-3xl bg-slate-50 p-6">
            <p className="poem-text font-serif text-lg text-slate-700">{poem.text}</p>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-ocean">Interpretasi</p>
          <h2 className="mt-3 font-serif text-3xl font-black">Kata Kunci dan Rekomendasi</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Rekomendasi dihitung dari matriks cosine similarity. Kata kunci digunakan untuk membantu membaca tema puisi acuan dan hasil rekomendasi.
          </p>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Kata Kunci Puisi Acuan</p>
            {queryKeywords.length ? (
              <div className="flex flex-wrap gap-2">
                {queryKeywords.map((keyword) => <KeywordBadge key={keyword}>{keyword}</KeywordBadge>)}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Klik tombol rekomendasi untuk memuat kata kunci.</p>
            )}
          </div>

          <button
            onClick={loadRecommendations}
            disabled={recommendationLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigoDeep px-6 py-4 font-black text-white transition hover:bg-indigo-900 disabled:cursor-wait disabled:opacity-70"
          >
            <Sparkles size={20} /> {recommendationLoading ? 'Memuat Rekomendasi...' : 'Tampilkan Rekomendasi'}
          </button>
          {recommendationError && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-semibold text-red-700">{recommendationError}</p>}

          <div className="mt-8">
            <div className="mb-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-ocean">Top-5</p>
                <h2 className="mt-2 font-serif text-3xl font-black">Rekomendasi Puisi Serupa</h2>
              </div>
            </div>
            {recommendationLoading ? <LoadingState label="Mengambil rekomendasi..." /> : <RecommendationTable recommendations={recommendationPayload?.recommendations} />}
          </div>
        </aside>
      </div>
    </section>
  )
}
