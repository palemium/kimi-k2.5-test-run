import type React from 'react'
import Image from 'next/image'
import { Background } from '@/app/components/background'
import { GlowCard } from '@/app/components/glow-card'
import { ComingSoon } from '@/app/components/coming-soon'
import { Footer } from '@/app/components/footer'

export default function Home(): React.JSX.Element {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Background />

      <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <GlowCard>
          <div className="mb-8 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Mathematics Redefined
            </div>
            <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
              Pythagoras
            </h1>
            <p className="mt-4 text-lg text-white/60">Where geometry meets modern elegance</p>
          </div>

          <div className="mx-auto mb-8 w-full max-w-md">
            <div className="relative rounded-xl border border-white/10 bg-white/5 p-6">
              <Image
                src="/pythagoras.svg"
                alt="Pythagorean Theorem Visualization"
                width={400}
                height={400}
                className="mx-auto drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                priority
              />
            </div>
          </div>

          <ComingSoon />
        </GlowCard>

        <Footer />
      </main>
    </div>
  )
}
