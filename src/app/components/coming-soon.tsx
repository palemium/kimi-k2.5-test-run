import type React from 'react'

export function ComingSoon(): React.JSX.Element {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500" />
        </span>
        <span className="text-sm font-medium text-white/80">Coming Soon</span>
      </div>

      <p className="mx-auto max-w-md text-white/50">
        We&apos;re crafting something extraordinary. A new way to explore, learn, and visualize
        mathematical beauty.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-purple-500/50 focus:bg-white/10 sm:w-64"
        />
        <button
          type="button"
          className="w-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] sm:w-auto"
        >
          Notify Me
        </button>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">∞</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-white/40">Possibilities</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">a² + b²</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-white/40">Theorem</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">90°</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-white/40">Perfect Angle</div>
        </div>
      </div>
    </div>
  )
}
