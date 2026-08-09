import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PoemCard({ poem }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-4 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        #{poem.id}
      </div>
      <h3 className="font-serif text-2xl font-bold leading-tight text-ink">{poem.title || 'Tanpa Judul'}</h3>
      <p className="mt-2 text-sm font-semibold text-ocean">{poem.author || 'Tidak Diketahui'}</p>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{poem.preview}</p>
      <div className="mt-6 flex">
        <Link
          to={`/poems/${poem.id}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-ocean hover:text-ocean"
        >
          Lihat Detail <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}
