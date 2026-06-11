export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/70 py-8">
      <div className="container-page flex flex-col justify-between gap-3 text-sm text-slate-500 md:flex-row">
        <p>Rekoisi, sistem rekomendasi puisi Indonesia berbasis IndoBERT dan cosine similarity.</p>
        <p>Embedding dan matriks similarity dimuat dari hasil pemrosesan sebelumnya.</p>
      </div>
    </footer>
  )
}
