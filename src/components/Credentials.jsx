import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const certs = [
  {
    icon: '📊', title: 'Power BI Data Analyst',
    issuer: 'Foresight BI · WiDA Scholarship',
    year: '2022',
    color: 'bg-[#FFF3E0] border-[#FFD999]',
  },
  {
    icon: '🔍', title: 'Google Data Analytics',
    issuer: 'Google · Coursera',
    year: '2022',
    color: 'bg-[#E8F5EB] border-[#A8D8B0]',
  },
  {
    icon: '🎓', title: 'Data Analyst Nanodegree',
    issuer: 'Udacity · ALX Scholarship',
    year: '2022',
    color: 'bg-[#EBF3FA] border-[#A8CBE0]',
  },
  {
    icon: '🤖', title: 'ML Engineering (Omdena)',
    issuer: 'Computer Vision · TensorFlow',
    year: '2021–Present',
    color: 'bg-[#F0E8FF] border-[#C8A8E8]',
  },
]

const awards = [
  {
    icon: '🏆', title: 'Micro-Credential Awards × 3',
    body: 'Western Governors University — Data Analytics Professional, Data Operations & Decision Process Engineering',
    year: '2025',
  },
  {
    icon: '🥈', title: 'LifeLine: HealthTech Award',
    body: 'NITDA Future-Hack · 2nd Place nationally for LifeLine health-tech innovation',
    year: '2019',
  },
  {
    icon: '🌟', title: 'Academic Excellence Award',
    body: '3rd Best Graduate, Nile University of Nigeria · Ranked Top 2% of graduating class',
    year: '2018',
  },
]

const edu = [
  {
    degree: 'MSc Data Analytics', focus: 'Decision Process Engineering',
    school: 'Western Governors University',
    note: 'Capstone: Predictive Analysis of Diabetes Progression using ML · 3 micro-credential awards',
    year: 'June 2025',
    icon: '🎓',
  },
  {
    degree: 'BSc Computer Science',
    school: 'Nile University of Nigeria',
    note: 'Top 2% of graduating class · AI, Digital Image Processing, Network Security',
    year: '2018',
    icon: '💻',
  },
]

function Card({ children, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22,1,0.36,1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Credentials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative bg-navy py-24 overflow-hidden" id="credentials">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
             backgroundSize: '48px 48px',
           }} />

      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none opacity-10"
           style={{ background: 'radial-gradient(circle, #7AADCC 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div ref={ref} className="relative z-10 max-w-[1140px] mx-auto px-7">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[2.5px] text-sky/80
                           bg-white/10 px-3 py-1.5 rounded-full mb-3">
            Credentials & Recognition
          </span>
          <h2 className="font-serif font-bold text-white text-[clamp(26px,4vw,40px)] leading-[1.15] mb-3">
            Education, Certifications <em className="italic">& Awards</em>
          </h2>
          <p className="text-white/55 text-[15px] max-w-[500px] mx-auto leading-[1.75]">
            Formally trained, multiply certified, and award-winning — bringing both academic rigour and real-world results.
          </p>
        </motion.div>

        {/* Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {edu.map((e, i) => (
            <Card key={e.degree} delay={i * 0.1} inView={inView}>
              <div className="bg-white/[0.07] border border-white/[0.12] rounded-[20px] p-6 hover:bg-white/[0.10] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[12px] bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                    {e.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold text-[15px] leading-tight mb-0.5">{e.degree}</div>
                    {e.focus && <div className="text-sky/80 text-[12px] font-medium mb-1">{e.focus}</div>}
                    <div className="text-white/65 text-[13px] font-semibold mb-2">{e.school}</div>
                    <p className="text-white/45 text-[12px] leading-[1.6]">{e.note}</p>
                  </div>
                  <span className="ml-auto text-[11px] font-bold text-sky/60 whitespace-nowrap">{e.year}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <h3 className="text-white/50 text-[11px] uppercase tracking-[2px] font-bold mb-4">Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {certs.map((c, i) => (
            <Card key={c.title} delay={0.15 + i * 0.08} inView={inView}>
              <div className={`${c.color} border rounded-[16px] p-5 flex flex-col gap-2`}>
                <div className="text-2xl">{c.icon}</div>
                <div className="text-navy font-bold text-[13.5px] leading-tight">{c.title}</div>
                <div className="text-ink-soft text-[11.5px] leading-snug">{c.issuer}</div>
                <div className="text-muted text-[11px] font-semibold mt-auto">{c.year}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Awards */}
        <h3 className="text-white/50 text-[11px] uppercase tracking-[2px] font-bold mb-4">Awards & Honours</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {awards.map((a, i) => (
            <Card key={a.title} delay={0.3 + i * 0.08} inView={inView}>
              <div className="bg-white/[0.06] border border-white/[0.10] rounded-[16px] p-5 flex gap-4 hover:bg-white/[0.09] transition-colors">
                <span className="text-2xl mt-0.5 flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="text-white font-bold text-[13.5px] mb-1 leading-tight">{a.title}</div>
                  <p className="text-white/50 text-[12px] leading-[1.6]">{a.body}</p>
                  <span className="inline-block mt-2 text-sky/60 text-[11px] font-bold">{a.year}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
