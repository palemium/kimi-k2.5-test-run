import type React from 'react'

export function Footer(): React.JSX.Element {
  return (
    <footer className="mt-16 text-center">
      <p className="text-sm text-white/30">Built with precision and passion</p>
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-white/20">
        <span>Next.js 16</span>
        <span>·</span>
        <span>Turbopack</span>
        <span>·</span>
        <span>TypeScript</span>
        <span>·</span>
        <span>Tailwind CSS</span>
      </div>
    </footer>
  )
}
