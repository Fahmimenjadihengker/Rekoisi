import { ArrowDown, BookOpen, Braces, BrainCircuit, FileText, SearchCheck } from 'lucide-react'

const steps = [
  { title: 'Pengumpulan Data', text: 'Dataset berisi puisi Indonesia lengkap dengan judul, penulis, teks asli, dan teks bersih.', icon: <BookOpen /> },
  { title: 'Load Dataset', text: 'Backend membaca puisi_clean.csv dan memetakan setiap baris menjadi poem_id.', icon: <FileText /> },
  { title: 'Preprocessing', text: 'Teks dibersihkan agar konsisten sebelum direpresentasikan sebagai embedding.', icon: <Braces /> },
  { title: 'Embedding IndoBERT', text: 'Setiap puisi direpresentasikan sebagai vektor semantik dari hasil pemrosesan sebelumnya.', icon: <BrainCircuit /> },
  { title: 'Cosine Similarity', text: 'Kemiripan dihitung dari matriks similarity yang sudah tersedia dan dimuat saat startup.', icon: <SearchCheck /> },
  { title: 'Top-5 Recommendation', text: 'Sistem memilih lima puisi paling mirip selain puisi acuan.', icon: <SearchCheck /> },
  { title: 'KeyBERT dan Precision', text: 'Kata kunci membantu interpretasi rekomendasi dan evaluasi relevansi sederhana.', icon: <BrainCircuit /> },
]

export default function AboutMethod() {
  return (
    <section className="container-page py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Tentang Metode</p>
        <h1 className="mt-3 font-serif text-4xl font-black md:text-5xl">Alur Penelitian Rekomendasi Puisi</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Website ini berfokus pada demonstrasi rekomendasi berbasis konten dengan embedding IndoBERT dan cosine similarity yang telah dihitung sebelumnya.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft">
          <h2 className="font-serif text-3xl font-black">Tahapan Metode</h2>
          <div className="mt-6 grid gap-4">
            {steps.map((step) => (
              <article key={step.title} className="flex gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-ocean">{step.icon}</div>
                <div>
                  <h3 className="font-serif text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-indigoDeep via-slate-900 to-ocean p-7 text-white shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-teal-100">Flow Sistem</p>
          <h2 className="mt-3 font-serif text-3xl font-black">Dari Dataset ke Precision</h2>
          <div className="mt-8 grid gap-3">
            {['Dataset Puisi', 'Preprocessing', 'Embedding IndoBERT', 'Cosine Similarity', 'Top-5 Recommendation', 'KeyBERT Evaluation', 'Precision'].map((item, index, array) => (
              <div key={item}>
                <div className="rounded-3xl bg-white/10 p-5 text-center font-black backdrop-blur">{item}</div>
                {index < array.length - 1 && <ArrowDown className="mx-auto my-2 text-teal-100" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="font-serif text-3xl font-black">Catatan Implementasi</h2>
        <p className="mt-4 leading-8 text-slate-600">
          Website tidak menghitung ulang embedding IndoBERT di setiap request. Backend hanya memuat file CSV, embedding, dan matriks cosine similarity, lalu mengambil top-N berdasarkan baris matriks dari puisi acuan. Keyword memakai cache sederhana agar request berikutnya lebih cepat.
        </p>
      </div>
    </section>
  )
}
