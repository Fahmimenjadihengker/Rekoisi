import { BarChart3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import LoadingState from '../components/LoadingState.jsx'
import { getEvaluationSummary } from '../services/api.js'

export default function Evaluation() {
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getEvaluationSummary().then(setSummary).catch(() => setError('Ringkasan evaluasi gagal dimuat.'))
  }, [])

  return (
    <section className="container-page py-12">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Evaluasi</p>
        <h1 className="mt-3 font-serif text-4xl font-black md:text-5xl">Precision Rekomendasi</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Halaman ini menampilkan lima tes evaluasi tetap menggunakan kata kunci dan precision sesuai PRD.
        </p>
      </div>

      {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-5 font-semibold text-red-700">{error}</div>}
      {!summary && !error && <LoadingState label="Memuat hasil evaluasi..." />}
      {summary && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Metric label="Total Tes" value={summary.total_tests} />
            <Metric label="Total Rekomendasi" value={summary.total_recommendations} />
            <Metric label="Total Relevan" value={summary.total_relevant} />
            <Metric label="Precision Rata-rata" value={summary.average_precision.toFixed(2)} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Tes</th>
                    <th className="px-5 py-4">Puisi Acuan</th>
                    <th className="px-5 py-4">Relevan</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Precision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {summary.tests.map((item) => (
                    <tr key={item.test}>
                      <td className="px-5 py-4 font-black text-ocean">{item.test}</td>
                      <td className="px-5 py-4 font-serif text-lg font-bold">{item.query_title}</td>
                      <td className="px-5 py-4">{item.relevant_count}</td>
                      <td className="px-5 py-4">{item.total_recommendations}</td>
                      <td className="px-5 py-4 font-black text-indigoDeep">{item.precision.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-ocean"><BarChart3 /></div>
                <div>
                  <h2 className="font-serif text-2xl font-black">Grafik Precision</h2>
                  <p className="text-sm font-semibold text-slate-500">Precision per tes</p>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary.tests}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="query_title" tick={{ fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={80} />
                    <YAxis domain={[0, 1]} />
                    <Tooltip formatter={(value) => Number(value).toFixed(2)} />
                    <Bar dataKey="precision" fill="#0f766e" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <h2 className="font-serif text-2xl font-black">Catatan Evaluasi</h2>
            <p className="mt-3 leading-7">
              KeyBERT digunakan sebagai alat bantu evaluasi berbasis kata kunci. Evaluasi exact keyword match memiliki keterbatasan karena tidak selalu menangkap kesamaan semantik yang dapat direpresentasikan oleh IndoBERT.
            </p>
          </div>
        </>
      )}
    </section>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
    </div>
  )
}
