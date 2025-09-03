import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const passwordEntriesTable = pgTable('password_entries', {
  id: serial('id').primaryKey(),
  website_name: text('website_name').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  category: text('category'), // Nullable by default for optional categorization
  notes: text('notes'), // Nullable by default for optional notes
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type PasswordEntry = typeof passwordEntriesTable.$inferSelect; // For SELECT operations
export type NewPasswordEntry = typeof passwordEntriesTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { passwordEntries: passwordEntriesTable };