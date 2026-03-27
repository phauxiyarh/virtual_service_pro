import { motion } from 'framer-motion'

export default function SplashScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-20"
           style={{ background: 'radial-gradient(circle, #7AADCC 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Logo icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-20 h-20 bg-gradient-to-br from-sky to-navy-light rounded-[22px]
                   flex items-center justify-center text-4xl shadow-[0_8px_40px_rgba(122,173,204,0.4)] mb-8"
      >
        💻
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-[22px] border-2 border-sky/40"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.2, repeat: 2, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-serif text-white text-3xl font-bold tracking-tight mb-2">
          Fauwzziyyah Umar
        </h1>
        <motion.p
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sky/70 text-sm font-medium uppercase tracking-[3px] overflow-hidden whitespace-nowrap"
        >
          Virtual Professional
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="mt-10 w-48 h-[3px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-sky to-sky-light rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  )
}
