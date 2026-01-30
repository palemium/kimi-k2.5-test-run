import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isValidEmail, normalizeEmail } from '@/lib/validation'

interface RequestMetadata {
  ip: string
  userAgent: string
  referrer: string | null
}

function extractMetadata(request: NextRequest): RequestMetadata {
  const headers = request.headers
  const forwardedFor = headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() ?? headers.get('x-real-ip') ?? 'unknown'
  const userAgent = headers.get('user-agent') ?? 'unknown'
  const referrer = headers.get('referer') ?? null

  return { ip, userAgent, referrer }
}

async function insertWaitingListEntry(
  email: string,
  metadata: RequestMetadata
): Promise<{ id: number; email: string } | null> {
  try {
    const result = await db
      .insertInto('waiting_list')
      .values({
        email,
        ip_address: metadata.ip,
        user_agent: metadata.userAgent,
        referrer: metadata.referrer,
      })
      .returning(['id', 'email'])
      .executeTakeFirst()

    return result ?? null
  } catch (error: unknown) {
    const pgError = error as { code?: string }
    if (pgError.code === '23505') {
      return null
    }
    throw error
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
    }

    const normalizedEmail = normalizeEmail(email)
    const metadata = extractMetadata(request)
    const result = await insertWaitingListEntry(normalizedEmail, metadata)

    return NextResponse.json(
      {
        success: true,
        id: result?.id,
        email: result?.email,
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
