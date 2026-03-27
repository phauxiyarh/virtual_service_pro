import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    icon: '📋', name: 'Administrative Support', color: 'bg-[#EBF3FA]',
    desc: 'Seamless back-office management so you can focus on what moves the needle.',
    tags: ['Data Entry & Management', 'Calendar Management', 'Research & Analysis', 'Email Management'],
    featured: false,
  },
  {
    icon: '🎨', name: 'Graphic Design', color: 'bg-[#FFF3E0]',
    desc: 'Visual assets that communicate your brand with clarity and elegance.',
    tags: ['Social Media Graphics', 'Workbooks & Posters', 'Presentation Design', 'Brand Assets'],
    featured: false,
  },
  {
    icon: '📱', name: 'Social Media Support', color: 'bg-[#E8F5EB]',
    desc: 'Strategic content planning and community growth across all platforms.',
    tags: ['Content Research', 'Content Calendar', 'Post Scheduling', 'Community Management'],
    featured: false,
  },
  {
    icon: '📊', name: 'Data Analytics', color: 'bg-[#F0E8FF]',
    desc: 'MSc-level analytics: from BigQuery pipelines to Power BI dashboards that drive real decisions.',
    tags: ['Python · R · SQL', 'Power BI & Tableau', 'BigQuery Pipelines', 'KPI & Predictive Reports'],
    featured: true,
    badge: 'Most Popular',
    badgeClass: 'bg-gradient-to-br from-purple to-[#7B52B8]',
  },
  {
    icon: '🤖', name: 'AI & Automation', color: 'bg-[#E0F5F2]',
    desc: 'From ML pipelines (TensorFlow, Scikit-learn) to no-code automation — I build systems that scale.',
    tags: ['ML Pipeline Setup', 'AI Workflow (Zapier/Make)', 'ETL Automation', 'Chatbot & AI Tools'],
    featured: true,
    badge: 'High Impact',
    badgeClass: 'bg-gradient-to-br from-teal to-[#12A090]',
  },
]

function ServiceCard({ s, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22,1,0.36,1] }}
      className={`relative rounded-[20px] p-7 border-[1.5px] transition-all duration-300
                  hover:-translate-y-1.5 hover:shadow-card-lg group cursor-pointer
                  ${s.featured
                    ? 'bg-gradient-to-br from-[#F0F5FF] to-[#F8F0FF] border-[rgba(90,61,138,0.2)] hover:border-[rgba(90,61,138,0.4)]'
                    : 'bg-cream border-[#E4E8EF] hover:border-[rgba(122,173,204,0.5)]'
                  }`}
    >
      {s.badge && (
        <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-[0.8px] text-white px-2.5 py-1 rounded-full ${s.badgeClass}`}>
          {s.badge}
        </span>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 ${s.color} rounded-[12px] flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
        {s.icon}
      </div>

      <h3 className="text-[13.5px] font-bold text-navy uppercase tracking-[0.7px] mb-2">{s.name}</h3>
      <p className="text-[13px] text-ink-soft leading-[1.68] mb-4">{s.desc}</p>

      <ul className="flex flex-wrap gap-1.5 mb-5">
        {s.tags.map(tag => (
          <li key={tag}
              className="text-[11.5px] bg-white border border-[#E4E8EF] text-ink-soft px-2.5 py-1 rounded-full">
            {tag}
          </li>
        ))}
      </ul>

      <a href="#contact"
         className="inline-flex items-center text-[12.5px] font-semibold text-navy-light hover:text-navy transition-colors gap-1 group/link">
        Request this service
        <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
      </a>
    </motion.div>
  )
}

export default function Services() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-24" id="services">
      <div className="max-w-[1140px] mx-auto px-7">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="text-center mb-14"
        >
          <span className="section-label">What I Do</span>
          <h2 className="section-title">
            Services Built for <em className="text-gradient-blue not-italic font-serif italic">Growth</em>
          </h2>
          <p className="text-[15px] text-ink-soft max-w-[520px] mx-auto leading-[1.75]">
            End-to-end virtual support that combines human insight with AI precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.name} s={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
