import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LoadingState from './components/LoadingState.jsx'

const Home = lazy(() => import('./routes/Home.jsx'))
const Poems = lazy(() => import('./routes/Poems.jsx'))
const PoemDetail = lazy(() => import('./routes/PoemDetail.jsx'))
const Evaluation = lazy(() => import('./routes/Evaluation.jsx'))
const AboutMethod = lazy(() => import('./routes/AboutMethod.jsx'))

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <Navbar />
      <main>
        <Suspense fallback={<section className="container-page py-12"><LoadingState /></section>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poems" element={<Poems />} />
            <Route path="/poems/:id" element={<PoemDetail />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/about-method" element={<AboutMethod />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
