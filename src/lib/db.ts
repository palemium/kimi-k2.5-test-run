import 'dotenv/config'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import type { Database } from './types'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const dialect = new PostgresDialect({
  pool,
})

export const db = new Kysely<Database>({
  dialect,
})
