import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ADMIN_USER = 'ziyyahpro'
const ADMIN_PASS = 'Va@2026@321'

const serviceLabels = {
  admin:     'Administrative Support',
  design:    'Graphic Design',
  social:    'Social Media Support',
  analytics: 'Data Analytics',
  ai:        'AI & Automation',
  multiple:  'Multiple Services',
}

const budgetLabels = {
  lt500:   'Under $500',
  '500-1k': '$500 – $1K',
  '1k-2k':  '$1K – $2K',
  '2k-5k':  '$2K – $5K',
  '5k+':    '$5K+',
}

const statusColors = {
  new:         'bg-blue-100 text-blue-700',
  contacted:   'bg-amber-100 text-amber-700',
  'in-progress': 'bg-purple-100 text-purple-700',
  completed:   'bg-green-100 text-green-700',
  archived:    'bg-gray-100 text-gray-500',
}

function LoginScreen({ onLogin, onExit }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        sessionStorage.setItem('fu_admin', '1')
        onLogin()
      } else {
        setError('Invalid credentials. Please try again.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-[#1a3355] to-[#0f2440] flex items-center justify-center p-6">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px] opacity-10"
             style={{ background: 'radial-gradient(circle, #7AADCC 0%, transparent 70%)' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-80px] left-[-80px] opacity-10"
             style={{ background: 'radial-gradient(circle, #5A3D8A 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
               backgroundSize: '48px 48px',
             }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sky to-navy-light rounded-[18px]
                       flex items-center justify-center text-3xl shadow-[0_8px_32px_rgba(122,173,204,0.3)]"
          >
            🔐
          </motion.div>
          <h1 className="text-white font-serif font-bold text-2xl mb-1">Admin Portal</h1>
          <p className="text-white/40 text-sm">Fauwzziyyah Umar · Virtual Professional</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-[24px] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-[12px] font-semibold uppercase tracking-[1.5px]">Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-white/[0.08] border border-white/[0.12] rounded-xl px-3.5 pl-10 py-3
                             text-white text-[14px] placeholder:text-white/25 outline-none
                             focus:border-sky/50 focus:ring-2 focus:ring-sky/20 transition-all"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-[12px] font-semibold uppercase tracking-[1.5px]">Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/[0.08] border border-white/[0.12] rounded-xl px-3.5 pl-10 pr-10 py-3
                             text-white text-[14px] placeholder:text-white/25 outline-none
                             focus:border-sky/50 focus:ring-2 focus:ring-sky/20 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-400 text-[13px] bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading || !user || !pass}
              whileHover={!loading ? { y: -2 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky to-navy-light
                         text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(122,173,204,0.3)]
                         hover:shadow-[0_8px_32px_rgba(122,173,204,0.4)] transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              ) : 'Sign In'}
            </motion.button>
          </form>
        </div>

        <button onClick={onExit} className="block mx-auto text-white/25 text-[12px] mt-6 hover:text-white/50 transition-colors">
          ← Back to website
        </button>
      </motion.div>
    </div>
  )
}

function RequestCard({ req, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const date = req.createdAt?.toDate?.()
  const timeAgo = date ? getTimeAgo(date) : 'Just now'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-[18px] border border-[#E4E8EF] shadow-[0_1px_4px_rgba(30,58,95,0.06)]
                 hover:shadow-[0_4px_20px_rgba(30,58,95,0.10)] transition-shadow duration-300"
    >
      {/* Header */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky/20 to-navy-light/20
                        flex items-center justify-center text-navy font-bold text-[15px] flex-shrink-0">
          {req.fname?.[0]}{req.lname?.[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-navy text-[15px]">{req.fname} {req.lname}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-[1px] px-2 py-0.5 rounded-full ${statusColors[req.status] || statusColors.new}`}>
              {req.status || 'new'}
            </span>
          </div>
          <p className="text-muted text-[12.5px] truncate">{req.email}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[11.5px] text-ink-soft font-medium bg-cream px-2 py-0.5 rounded-md">
              {serviceLabels[req.service] || req.service}
            </span>
            {req.budget && (
              <span className="text-[11px] text-muted">
                {budgetLabels[req.budget] || req.budget}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className="text-[11px] text-muted">{timeAgo}</span>
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="text-muted"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-[#E4E8EF]">
              {/* Message */}
              <div className="mt-4 mb-4">
                <p className="text-[11px] text-muted font-semibold uppercase tracking-[1px] mb-1.5">Project Details</p>
                <p className="text-[13.5px] text-ink-mid leading-[1.7] bg-cream/60 rounded-xl p-4 border border-[#E4E8EF]">
                  {req.message}
                </p>
              </div>

              {/* Meta */}
              {req.company && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] text-muted font-semibold uppercase tracking-[1px]">Company:</span>
                  <span className="text-[13px] text-ink-mid font-medium">{req.company}</span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] text-muted font-semibold uppercase tracking-[1px]">Newsletter:</span>
                <span className="text-[13px] text-ink-mid">{req.newsletter ? 'Yes' : 'No'}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[11px] text-muted font-semibold uppercase tracking-[1px] mr-1">Status:</p>
                {Object.keys(statusColors).map(s => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(req.id, s)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all
                               ${req.status === s
                                 ? `${statusColors[s]} border-current`
                                 : 'bg-white text-muted border-[#E4E8EF] hover:border-navy-light/30'}`}
                  >
                    {s}
                  </button>
                ))}

                <button
                  onClick={() => { if (confirm('Delete this request?')) onDelete(req.id) }}
                  className="ml-auto text-[11px] font-medium text-red-400 hover:text-red-600 hover:bg-red-50
                             px-2.5 py-1 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Dashboard({ onLogout, onExit }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')

  useEffect(() => {
    const q = query(collection(db, 'serviceRequests'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, (err) => {
      console.error('Firestore read error:', err)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleStatusChange = async (id, status) => {
    try { await updateDoc(doc(db, 'serviceRequests', id), { status }) }
    catch (e) { console.error(e) }
  }

  const handleDelete = async (id) => {
    try { await deleteDoc(doc(db, 'serviceRequests', id)) }
    catch (e) { console.error(e) }
  }

  const filtered = requests.filter(r => {
    if (filter !== 'all' && (r.status || 'new') !== filter) return false
    if (search) {
      const s = search.toLowerCase()
      return [r.fname, r.lname, r.email, r.company, r.message]
        .filter(Boolean).some(f => f.toLowerCase().includes(s))
    }
    return true
  })

  const counts = { all: requests.length }
  requests.forEach(r => {
    const s = r.status || 'new'
    counts[s] = (counts[s] || 0) + 1
  })

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#E4E8EF] shadow-[0_1px_8px_rgba(30,58,95,0.05)]">
        <div className="max-w-[1100px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 bg-gradient-to-br from-sky to-navy-light rounded-[10px] flex items-center justify-center text-lg">
              💻
            </span>
            <div>
              <h1 className="font-bold text-navy text-[15px] leading-tight">Admin Dashboard</h1>
              <p className="text-[11px] text-muted">Service Requests</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onExit} className="text-[12px] text-muted hover:text-navy transition-colors font-medium">
              ← Website
            </button>
            <button
              onClick={() => { sessionStorage.removeItem('fu_admin'); onLogout() }}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-red-500 hover:text-red-700
                         bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', count: counts.all || 0, color: 'from-navy/10 to-navy/5', text: 'text-navy' },
            { label: 'New', count: counts.new || 0, color: 'from-blue-100 to-blue-50', text: 'text-blue-700' },
            { label: 'In Progress', count: counts['in-progress'] || 0, color: 'from-purple-100 to-purple-50', text: 'text-purple-700' },
            { label: 'Completed', count: counts.completed || 0, color: 'from-green-100 to-green-50', text: 'text-green-700' },
          ].map(s => (
            <motion.div
              key={s.label}
              whileHover={{ y: -3 }}
              className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 border border-white/60`}
            >
              <p className="text-[11px] text-muted font-semibold uppercase tracking-[1px] mb-1">{s.label}</p>
              <p className={`text-3xl font-extrabold ${s.text}`}>{s.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-white rounded-xl border border-[#E4E8EF] p-1 overflow-x-auto">
            {['all', 'new', 'contacted', 'in-progress', 'completed', 'archived'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-all
                           ${filter === s ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy hover:bg-cream'}`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                {counts[s] ? ` (${counts[s]})` : ''}
              </button>
            ))}
          </div>

          <div className="relative sm:ml-auto w-full sm:w-auto">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests…"
              className="w-full sm:w-[240px] bg-white border border-[#E4E8EF] rounded-xl pl-9 pr-3 py-2
                         text-[13px] text-ink-mid outline-none focus:border-navy-light/50 focus:ring-2 focus:ring-navy-light/10 transition-all"
            />
          </div>
        </div>

        {/* Request list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <svg className="animate-spin w-8 h-8 text-navy-light" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-muted text-sm">Loading requests…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-3xl">📭</div>
            <p className="text-navy font-semibold text-lg">No requests found</p>
            <p className="text-muted text-sm">
              {search ? 'Try a different search term.' : 'Submissions will appear here in real time.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {filtered.map(r => (
                <RequestCard
                  key={r.id}
                  req={r}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Admin({ onExit }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('fu_admin') === '1')

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} onExit={onExit} />
  return <Dashboard onLogout={() => { setAuthed(false); onExit() }} onExit={onExit} />
}

/* Helpers */
function getTimeAgo(date) {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000)
  if (secs < 60)    return 'Just now'
  if (secs < 3600)  return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  if (secs < 604800) return `${Math.floor(secs / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
