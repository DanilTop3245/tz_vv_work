import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"

const PartnerJobs = lazy(() => import("./pages/PartnerJobs"))
const Contacts = lazy(() => import("./pages/Contacts"))

function RouteFallback() {
  return <main className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950" aria-busy="true" />
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Header />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/partners" element={<Navigate to="/partners/all" replace />} />
              <Route path="/partners/:slug" element={<PartnerJobs />} />
              <Route path="/partnerjobs" element={<Navigate to="/partners/all" replace />} />
              <Route path="/partnerjobs/:slug" element={<PartnerJobs />} />
              <Route path="/контакти" element={<Contacts />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
