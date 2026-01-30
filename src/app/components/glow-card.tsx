import type React from 'react'
import type { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
}

export function GlowCard({ children }: GlowCardProps): React.JSX.Element {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-xl transition duration-1000 group-hover:opacity-40" />

      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12">
        {children}
      </div>

      <div className="absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-purple-500/50" />
      <div className="absolute -right-2 -top-2 h-8 w-8 border-r-2 border-t-2 border-blue-500/50" />
      <div className="absolute -bottom-2 -left-2 h-8 w-8 border-b-2 border-l-2 border-pink-500/50" />
      <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-purple-500/50" />
    </div>
  )
}
