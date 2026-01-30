// Database table types for Kysely

import type { Generated } from 'kysely'

export interface WaitingList {
  id: Generated<number>
  email: string
  ip_address: string
  user_agent: string
  referrer: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface Database {
  waiting_list: WaitingList
}
