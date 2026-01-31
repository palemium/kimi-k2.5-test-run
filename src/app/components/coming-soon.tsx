'use client'

import type React from 'react'
import { useState } from 'react'
import { isValidEmail } from '@/lib/validation'

function StatusMessage({
  status,
  errorMessage,
}: {
  status: 'idle' | 'success' | 'error'
  errorMessage: string
}): React.ReactNode {
  if (status === 'error') {
    return <p className="text-left text-xs text-red-400">{errorMessage}</p>
  }

  if (status === 'success') {
    return (
      <p className="text-left text-xs text-emerald-400">
        Thank you! We&apos;ll notify you when we launch.
      </p>
    )
  }

  return null
}

function LoadingSpinner({ isLoading }: { isLoading: boolean }): React.ReactNode {
  if (!isLoading) {
    return 'Notify Me'
  }

  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Submitting...
    </span>
  )
}

function StatsSection(): React.JSX.Element {
  return (
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
  )
}

function HeaderBadge(): React.JSX.Element {
  return (
    <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500" />
      </span>
      <span className="text-sm font-medium text-white/80">Coming Soon</span>
    </div>
  )
}

export function ComingSoon(): React.JSX.Element {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (formEvent: React.FormEvent): Promise<void> => {
    formEvent.preventDefault()

    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center">
      <HeaderBadge />

      <p className="mx-auto max-w-md text-white/50">
        We&apos;re crafting something extraordinary. A new way to explore, learn, and visualize
        mathematical beauty.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-center"
      >
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(inputEvent): void => {
              setEmail(inputEvent.target.value)
              if (status !== 'idle') {
                setStatus('idle')
                setErrorMessage('')
              }
            }}
            disabled={isLoading}
            className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-purple-500/50 focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64"
          />
          <StatusMessage status={status} errorMessage={errorMessage} />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <LoadingSpinner isLoading={isLoading} />
        </button>
      </form>

      <StatsSection />
    </div>
  )
}
