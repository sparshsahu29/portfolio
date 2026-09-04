import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { ScrollManager } from './designs/paper-trail/shell.jsx'
import { ContentProvider } from './content/ContentContext.jsx'

const BlogIndex = lazy(() => import('./pages/BlogIndex.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))

function Loader() {
  return (
    <div className="paper-bg flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ink/50 uppercase">
        <span className="h-2 w-2 animate-ping rounded-full bg-crimson" />
        Loading
      </div>
    </div>
  )
}

function LegacyPostRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/blog/${slug}`} replace />
}

export default function App() {
  return (
    <ContentProvider>
      <ScrollManager />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* legacy paths from the first build */}
          <Route path="/journal" element={<Navigate to="/blog" replace />} />
          <Route path="/journal/:slug" element={<LegacyPostRedirect />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ContentProvider>
  )
}
