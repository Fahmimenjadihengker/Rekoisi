import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-soft md:flex-row">
      <div className="flex flex-1 items-center gap-3 px-3">
        <Search className="text-slate-400" size={22} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Cari berdasarkan judul, penulis, atau isi puisi..."
          className="w-full bg-transparent py-3 text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>
      <button className="rounded-2xl bg-ocean px-6 py-3 font-bold text-white transition hover:bg-teal-800">
        Cari Puisi
      </button>
    </form>
  )
}
