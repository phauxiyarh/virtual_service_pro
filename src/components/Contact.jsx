import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'

const services = [
  { value: 'admin',     label: 'Administrative Support' },
  { value: 'design',    label: 'Graphic Design' },
  { value: 'social',    label: 'Social Media Support' },
  { value: 'analytics', label: 'Data Analytics' },
  { value: 'ai',        label: 'AI & Automation' },
  { value: 'multiple',  label: 'Multiple Services' },
]

const budgets = [
  { value: 'lt500',  label: 'Under $500' },
  { value: '500-1k', label: '$500 – $1,000' },
  { value: '1k-2k',  label: '$1,000 – $2,000' },
  { value: '2k-5k',  label: '$2,000 – $5,000' },
  { value: '5k+',    label: '$5,000+' },
]

const features = [
  { icon: '⚡', title: 'Fast Turnaround',       sub: 'Most projects begin within 48 hours' },
  { icon: '🔒', title: 'Confidential & Secure', sub: 'Your data and IP are fully protected' },
  { icon: '📊', title: 'Results-Driven',         sub: 'Measurable outcomes, always' },
  { icon: '🌍', title: 'Remote-First',            sub: 'Seamless collaboration across time zones' },
]

/* Confetti burst on success */
function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 250 + 60),
      r: Math.random() * 360,
      s: Math.random() * 6 + 4,
      color: ['#3B6FA0', '#7AADCC', '#5A3D8A', '#22C55E', '#F59E0B', '#EC4899'][i % 6],
      delay: Math.random() * 0.3,
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, rotate: p.r, opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.2, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{ width: p.s, height: p.s, background: p.color }}
        />
      ))}
    </div>
  )
}

/* Focus-aware input wrapper */
function FloatingField({ label, required, optional, error, children }) {
  return (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-[13px] font-semibold text-ink-mid tracking-[0.15px] flex items-center gap-1
                         group-focus-within:text-navy-light transition-colors duration-200">
        {label}
        {required && <span className="text-navy-light text-sm">*</span>}
        {optional && <span className="font-normal text-muted ml-1 text-[11px]">(optional)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[11.5px] text-red-500 font-medium"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (err) =>
  `w-full font-sans text-[14px] text-ink-mid bg-white border rounded-xl px-3.5 py-2.5 outline-none
   transition-all duration-200 placeholder:text-muted/60
   focus:ring-[3px] focus:ring-navy-light/15 focus:border-navy-light focus:shadow-[0_0_0_1px_rgba(42,77,122,0.15)]
   ${err ? 'border-red-400 ring-2 ring-red-200' : 'border-[#E4E8EF] hover:border-[#C0C8D6]'}`

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [loading, setLoading]     = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [formStep, setFormStep]   = useState(0) // 0 = form, 1 = success

  const { register, handleSubmit, reset, formState: { errors, dirtyFields } } = useForm()
  const filledCount = Object.keys(dirtyFields).length

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    console.log('Form submitted:', data)
    setLoading(false)
    setFormStep(1)
  }

  const handleReset = () => {
    reset()
    setCharCount(0)
    setFormStep(0)
  }

  return (
    <section className="relative bg-white py-24 overflow-hidden" id="contact">
      {/* Blob */}
      <div className="absolute bottom-[-80px] left-[-80px] w-[440px] h-[440px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(90,61,138,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title text-left">
              Let's Build Something <em className="text-gradient-blue not-italic font-serif italic">Amazing</em>
            </h2>
            <p className="text-[15px] text-ink-soft leading-[1.78] mb-9">
              Ready to automate, optimize and grow your business? Fill in the form and I'll reach back within 24 hours at <strong className="text-navy font-semibold">phauzee97@gmail.com</strong>.
            </p>

            <div className="flex flex-col gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-[rgba(59,111,160,0.1)] to-[rgba(122,173,204,0.15)]
                                  flex items-center justify-center text-[18px]
                                  group-hover:scale-110 transition-transform duration-200">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-navy leading-tight mb-0.5">{f.title}</p>
                    <p className="text-[12.5px] text-muted">{f.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="relative bg-cream border-[1.5px] border-[#E4E8EF] rounded-[24px] p-8 shadow-card-lg
                       hover:shadow-card-xl transition-shadow duration-500"
          >
            {/* Progress dots */}
            {formStep === 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex-1 h-[3px] rounded-full bg-[#E4E8EF] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky to-navy-light rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min((filledCount / 5) * 100, 100)}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[11px] text-muted font-medium">{Math.min(filledCount, 5)}/5</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {formStep === 0 ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingField label="First Name" required error={errors.fname?.message}>
                      <input
                        {...register('fname', { required: 'Please enter your first name.' })}
                        placeholder="Jane"
                        className={inputCls(errors.fname)}
                      />
                    </FloatingField>
                    <FloatingField label="Last Name" required error={errors.lname?.message}>
                      <input
                        {...register('lname', { required: 'Please enter your last name.' })}
                        placeholder="Doe"
                        className={inputCls(errors.lname)}
                      />
                    </FloatingField>
                  </div>

                  <FloatingField label="Email Address" required error={errors.email?.message}>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Please enter a valid email.',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email.' }
                      })}
                      placeholder="jane@company.com"
                      className={inputCls(errors.email)}
                    />
                  </FloatingField>

                  <FloatingField label="Company / Brand" optional>
                    <input
                      {...register('company')}
                      placeholder="Your business name"
                      className={inputCls(false)}
                    />
                  </FloatingField>

                  <FloatingField label="Service Needed" required error={errors.service?.message}>
                    <div className="relative">
                      <select
                        {...register('service', { required: 'Please select a service.' })}
                        className={inputCls(errors.service) + ' pr-9 cursor-pointer'}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a service…</option>
                        {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </FloatingField>

                  <FloatingField label="Budget Range" optional>
                    <div className="relative">
                      <select
                        {...register('budget')}
                        className={inputCls(false) + ' pr-9 cursor-pointer'}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a range…</option>
                        {budgets.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </FloatingField>

                  <FloatingField label="Project Details" required error={errors.message?.message}>
                    <div className="relative">
                      <textarea
                        {...register('message', { required: 'Please describe your project.' })}
                        rows={5}
                        placeholder="Tell me about your project, goals, timeline, and any specific requirements…"
                        className={inputCls(errors.message) + ' resize-y min-h-[120px]'}
                        maxLength={500}
                        onInput={e => setCharCount(e.target.value.length)}
                      />
                      <span className={`absolute bottom-2.5 right-3 text-[11px] pointer-events-none transition-colors
                                        ${charCount > 450 ? 'text-amber-500' : 'text-muted'}`}>
                        {charCount} / 500
                      </span>
                    </div>
                  </FloatingField>

                  <label className="flex items-start gap-2.5 cursor-pointer group/check">
                    <input
                      type="checkbox"
                      {...register('newsletter')}
                      className="mt-0.5 w-4 h-4 rounded accent-navy-light cursor-pointer flex-shrink-0"
                    />
                    <span className="text-[12.5px] text-ink-soft leading-relaxed group-hover/check:text-ink-mid transition-colors">
                      I'd like to receive tips on AI tools and productivity
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-navy text-white
                               font-semibold text-[14.5px] py-3.5 rounded-xl shadow-glow-blue
                               transition-all duration-200 hover:shadow-glow-blue-lg
                               disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                          <path d="M9 2a7 7 0 0 1 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send My Request
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                  className="relative flex flex-col items-center text-center py-10 gap-5"
                >
                  <Confetti />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center"
                  >
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <circle cx="22" cy="22" r="22" fill="#22C55E" fillOpacity="0.12"/>
                      <motion.path
                        d="M13 22l7 7 11-13"
                        stroke="#22C55E"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                      />
                    </svg>
                  </motion.div>

                  <div>
                    <h3 className="font-serif font-bold text-2xl text-navy mb-2">Request Received!</h3>
                    <p className="text-[14px] text-ink-soft leading-[1.7] max-w-[320px] mx-auto">
                      Thank you! I'll review your project details and reach out within 24 hours. Looking forward to working with you.
                    </p>
                  </div>

                  <motion.button
                    onClick={handleReset}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-ghost mt-2"
                  >
                    Send Another Request
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
