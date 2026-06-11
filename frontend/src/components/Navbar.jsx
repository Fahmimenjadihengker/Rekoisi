import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/poems', label: 'Daftar Puisi' },
  { to: '/evaluation', label: 'Evaluasi' },
  { to: '/about-method', label: 'Metode' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-ocean text-white shadow-soft' : 'text-slate-600 hover:bg-white hover:text-ocean'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-slate-50/85 backdrop-blur-xl">
      <nav className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigoDeep to-ocean text-lg font-black text-white">
            IB
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-ocean">IndoBERT</p>
            <p className="font-serif text-lg font-bold text-ink">Rekomendasi Puisi</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Buka menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="container-page grid gap-2 pb-4 md:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
