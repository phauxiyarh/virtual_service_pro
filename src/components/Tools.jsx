import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tools = [
  { icon: '🐍', name: 'Python' },
  { icon: '📊', name: 'Power BI' },
  { icon: '📈', name: 'Tableau' },
  { icon: '🧮', name: 'SQL' },
  { icon: '🔬', name: 'Scikit-learn' },
  { icon: '🔥', name: 'TensorFlow' },
  { icon: '🤗', name: 'Hugging Face' },
  { icon: '☁️', name: 'BigQuery' },
  { icon: '🌩️', name: 'AWS SageMaker' },
  { icon: '🔷', name: 'Azure ML' },
  { icon: '🧠', name: 'ChatGPT' },
  { icon: '✨', name: 'Claude AI' },
  { icon: '🎨', name: 'Midjourney' },
  { icon: '⚡', name: 'Zapier AI' },
  { icon: '🔗', name: 'Make.com' },
  { icon: '📝', name: 'Notion AI' },
  { icon: '🖌️', name: 'Canva AI' },
  { icon: '📉', name: 'Google Analytics' },
  { icon: '❄️', name: 'Snowflake' },
  { icon: '🌀', name: 'Apache Airflow' },
  { icon: '🐳', name: 'Docker' },
  { icon: '📦', name: 'MLflow' },
  { icon: '🧪', name: 'PyTorch' },
  { icon: '📐', name: 'R / Plotly' },
]

const process = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We align on your goals, pain points, and how I can best support your vision.',
  },
  {
    num: '02',
    title: 'Custom Proposal',
    desc: 'Tailored scope, timeline, and pricing built around your specific needs.',
  },
  {
    num: '03',
    title: 'Execution & Delivery',
    desc: 'Fast, precise, AI-powered delivery with full transparency throughout.',
  },
  {
    num: '04',
    title: 'Ongoing Support',
    desc: 'Continued optimization, reporting, and scaling as your business grows.',
  },
]

export default function Tools() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative bg-cream py-24 overflow-hidden" id="tools">
      {/* BG blob */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(122,173,204,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-[1140px] mx-auto px-7">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="text-center mb-12"
        >
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">
            AI Tools I <em className="text-gradient-blue not-italic font-serif italic">Master</em>
          </h2>
          <p className="text-[15px] text-ink-soft max-w-[480px] mx-auto leading-[1.75]">
            Working at the cutting edge of AI and automation technology.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden -mx-7 px-7 mb-16">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

          <div className="flex gap-3.5 marquee-track animate-marquee" style={{ width: 'max-content' }}>
            {[...tools, ...tools].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border border-[#E4E8EF] rounded-xl
                           px-4 py-2.5 text-[13.5px] font-medium text-ink-mid whitespace-nowrap
                           shadow-[0_1px_4px_rgba(30,58,95,0.06)] hover:shadow-card hover:border-sky
                           transition-all duration-200 cursor-default"
              >
                <span className="text-base">{t.icon}</span>
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
          className="bg-white border border-[#E4E8EF] rounded-[24px] p-8 md:p-10 shadow-[0_1px_4px_rgba(30,58,95,0.06)]"
        >
          <h3 className="text-center font-serif font-bold text-[22px] text-navy mb-8">How We Work Together</h3>

          <div className="flex flex-col md:flex-row gap-0 overflow-x-auto">
            {process.map((step, i) => (
              <div key={step.num} className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 flex-1 min-w-[140px]">
                <div className="flex md:flex-col items-center gap-4 md:gap-3 w-full">
                  {/* Number + connector */}
                  <div className="flex md:flex-col items-center w-full">
                    <div className="w-10 h-10 rounded-full bg-[rgba(59,111,160,0.1)] border-2 border-[rgba(59,111,160,0.2)]
                                    flex items-center justify-center text-[13px] font-bold text-navy-light flex-shrink-0 md:mx-auto">
                      {step.num}
                    </div>
                    {i < process.length - 1 && (
                      <>
                        {/* Desktop horizontal line */}
                        <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-[rgba(59,111,160,0.2)] to-[rgba(122,173,204,0.15)] mx-1" />
                        {/* Mobile vertical line */}
                        <div className="md:hidden w-[2px] h-6 bg-[rgba(59,111,160,0.15)] my-1 mx-[19px]" />
                      </>
                    )}
                  </div>

                  {/* Text */}
                  <div className="md:text-center md:px-3 md:pt-4 pb-4 md:pb-0">
                    <h4 className="text-[13.5px] font-bold text-navy mb-1">{step.title}</h4>
                    <p className="text-[12px] text-ink-soft leading-[1.6]">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
