import { Link } from 'react-router-dom'
import KeywordBadge from './KeywordBadge.jsx'
import SimilarityBadge from './SimilarityBadge.jsx'

export default function RecommendationTable({ recommendations }) {
  if (!recommendations?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        Rekomendasi belum ditampilkan.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Peringkat</th>
              <th className="px-5 py-4">Judul Rekomendasi</th>
              <th className="px-5 py-4">Skor</th>
              <th className="px-5 py-4">Kata Kunci</th>
              <th className="px-5 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recommendations.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-5 py-5 font-black text-ocean">{item.rank}</td>
                <td className="px-5 py-5">
                  <p className="font-serif text-lg font-bold text-ink">{item.title}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{item.author}</p>
                </td>
                <td className="px-5 py-5"><SimilarityBadge score={item.similarity_score} /></td>
                <td className="px-5 py-5">
                  <div className="flex flex-wrap gap-2">
                    {(item.keywords || []).map((keyword) => <KeywordBadge key={keyword}>{keyword}</KeywordBadge>)}
                  </div>
                </td>
                <td className="px-5 py-5">
                  <Link to={`/poems/${item.id}`} className="font-bold text-ocean hover:text-teal-900">Detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 md:hidden">
        {recommendations.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-black text-ocean">#{item.rank}</span>
              <SimilarityBadge score={item.similarity_score} />
            </div>
            <h3 className="font-serif text-xl font-bold">{item.title}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">{item.author}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(item.keywords || []).map((keyword) => <KeywordBadge key={keyword}>{keyword}</KeywordBadge>)}
            </div>
            <Link to={`/poems/${item.id}`} className="mt-4 inline-block font-bold text-ocean">Lihat Detail</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
