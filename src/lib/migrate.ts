// Migration script to create waiting_list table
// Run with: npx tsx src/lib/migrate.ts

import 'dotenv/config'
import { sql } from 'kysely'
import { db } from './db'

async function migrate(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('Creating waiting_list table...')

  await db.schema
    .createTable('waiting_list')
    .ifNotExists()
    .addColumn('id', 'serial', col => col.primaryKey())
    .addColumn('email', 'varchar(255)', col => col.notNull().unique())
    .addColumn('ip_address', 'varchar(45)', col => col.notNull())
    .addColumn('user_agent', 'text', col => col.notNull())
    .addColumn('referrer', 'text')
    .addColumn('created_at', 'timestamptz', col => col.notNull().defaultTo('now()'))
    .addColumn('updated_at', 'timestamptz', col => col.notNull().defaultTo('now()'))
    .execute()

  // Create updated_at trigger
  await sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `.execute(db)

  await sql`
    DROP TRIGGER IF EXISTS update_waiting_list_updated_at ON waiting_list;
  `.execute(db)

  await sql`
    CREATE TRIGGER update_waiting_list_updated_at
      BEFORE UPDATE ON waiting_list
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  `.execute(db)

  // eslint-disable-next-line no-console
  console.log('Migration completed successfully!')
  process.exit(0)
}

migrate().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})
