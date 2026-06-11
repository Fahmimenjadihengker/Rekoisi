export default function LoadingState({ label = 'Memuat data...' }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-ocean" />
      <p className="font-semibold text-slate-600">{label}</p>
    </div>
  )
}
