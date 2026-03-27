import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'

const services = [
  { value: 'admin',    label: 'Administrative Support' },
  { value: 'design',   label: 'Graphic Design' },
  { value: 'social',   label: 'Social Media Support' },
  { value: 'analytics',label: 'Data Analytics' },
  { value: 'ai',       label: 'AI & Automation' },
  { value: 'multiple', label: 'Multiple Services' },
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

function Field({ label, required, optional, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-ink-mid tracking-[0.15px]">
        {label}{' '}
        {required && <span className="text-navy-light">*</span>}
        {optional && <span className="font-normal text-muted ml-1">(optional)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
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
   transition-all duration-200 placeholder:text-muted
   focus:ring-2 focus:ring-navy-light/20 focus:border-navy-light
   ${err ? 'border-red-400 ring-2 ring-red-200' : 'border-[#E4E8EF] hover:border-[#C0C8D6]'}`

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    // Simulate async submission (replace with Firebase/EmailJS call)
    await new Promise(r => setTimeout(r, 1400))
    console.log('Form submitted:', data)
    setLoading(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    reset()
    setCharCount(0)
    setSubmitted(false)
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
              {features.map(f => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-[rgba(59,111,160,0.1)] to-[rgba(122,173,204,0.15)] flex items-center justify-center text-[18px]">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-navy leading-tight mb-0.5">{f.title}</p>
                    <p className="text-[12.5px] text-muted">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="bg-cream border-[1.5px] border-[#E4E8EF] rounded-[24px] p-8 shadow-card-lg"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name" required error={errors.fname?.message}>
                      <input
                        {...register('fname', { required: 'Please enter your first name.' })}
                        placeholder="Jane"
                        className={inputCls(errors.fname)}
                      />
                    </Field>
                    <Field label="Last Name" required error={errors.lname?.message}>
                      <input
                        {...register('lname', { required: 'Please enter your last name.' })}
                        placeholder="Doe"
                        className={inputCls(errors.lname)}
                      />
                    </Field>
                  </div>

                  <Field label="Email Address" required error={errors.email?.message}>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Please enter a valid email.',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email.' }
                      })}
                      placeholder="jane@company.com"
                      className={inputCls(errors.email)}
                    />
                  </Field>

                  <Field label="Company / Brand" optional>
                    <input
                      {...register('company')}
                      placeholder="Your business name"
                      className={inputCls(false)}
                    />
                  </Field>

                  <Field label="Service Needed" required error={errors.service?.message}>
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
                  </Field>

                  <Field label="Budget Range" optional>
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
                  </Field>

                  <Field label="Project Details" required error={errors.message?.message}>
                    <div className="relative">
                      <textarea
                        {...register('message', { required: 'Please describe your project.' })}
                        rows={5}
                        placeholder="Tell me about your project, goals, timeline, and any specific requirements…"
                        className={inputCls(errors.message) + ' resize-y min-h-[120px]'}
                        maxLength={500}
                        onInput={e => setCharCount(e.target.value.length)}
                      />
                      <span className={`absolute bottom-2.5 right-3 text-[11px] pointer-events-none
                                        ${charCount > 450 ? 'text-amber' : 'text-muted'}`}>
                        {charCount} / 500
                      </span>
                    </div>
                  </Field>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('newsletter')}
                      className="mt-0.5 w-4 h-4 rounded accent-navy-light cursor-pointer flex-shrink-0"
                    />
                    <span className="text-[12.5px] text-ink-soft leading-relaxed">
                      I'd like to receive tips on AI tools and productivity
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-navy text-white
                               font-semibold text-[14.5px] py-3.5 rounded-xl shadow-glow-blue
                               transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-blue-lg
                               disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin-slow w-4 h-4" viewBox="0 0 18 18" fill="none">
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
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
                  className="flex flex-col items-center text-center py-10 gap-5"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <circle cx="22" cy="22" r="22" fill="#22C55E" fillOpacity="0.1"/>
                      <path
                        d="M13 22l7 7 11-13"
                        stroke="#22C55E"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 35,
                          strokeDashoffset: 0,
                          animation: 'drawCheck 0.5s ease-out 0.2s both',
                        }}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-navy mb-2">Request Received!</h3>
                    <p className="text-[14px] text-ink-soft leading-[1.7] max-w-[320px] mx-auto">
                      Thank you! I'll review your project details and reach out within 24 hours. Looking forward to working with you.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="btn-ghost mt-2"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes drawCheck {
          from { stroke-dashoffset: 35; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  )
}
