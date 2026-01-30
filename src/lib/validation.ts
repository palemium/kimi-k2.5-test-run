// Email validation utility

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  const trimmed = email.trim().toLowerCase()

  if (trimmed.length > 254) {
    return false
  }

  if (trimmed.length === 0) {
    return false
  }

  return EMAIL_REGEX.test(trimmed)
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}
