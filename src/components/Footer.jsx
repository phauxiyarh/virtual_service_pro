export default function Footer() {
  return (
    <footer className="bg-navy py-8 px-7">
      <div className="max-w-[1140px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 bg-white/10 rounded-[10px] flex items-center justify-center text-[17px]">
            💻
          </span>
          <div>
            <div className="text-white font-semibold text-[15px] leading-tight">Fauwzziyyah Umar</div>
            <div className="text-white/45 text-[11px] uppercase tracking-[0.8px]">Virtual Research Assistant</div>
          </div>
        </div>
        <p className="text-white/40 text-[13px]">
          © {new Date().getFullYear()} Fauwzziyyah Umar · Automate. Optimize.{' '}
          <em className="text-white/65 font-serif italic">Grow.</em>
        </p>
      </div>
    </footer>
  )
}
