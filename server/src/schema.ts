import { z } from 'zod';

// Password entry schema
export const passwordEntrySchema = z.object({
  id: z.number(),
  website_name: z.string(),
  username: z.string(),
  password: z.string(),
  category: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type PasswordEntry = z.infer<typeof passwordEntrySchema>;

// Input schema for creating password entries
export const createPasswordEntryInputSchema = z.object({
  website_name: z.string().min(1, "Website name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  category: z.string().nullable(),
  notes: z.string().nullable()
});

export type CreatePasswordEntryInput = z.infer<typeof createPasswordEntryInputSchema>;

// Input schema for updating password entries
export const updatePasswordEntryInputSchema = z.object({
  id: z.number(),
  website_name: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
  category: z.string().nullable().optional(),
  notes: z.string().nullable().optional()
});

export type UpdatePasswordEntryInput = z.infer<typeof updatePasswordEntryInputSchema>;

// Search/filter input schema
export const searchPasswordEntriesInputSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional()
});

export type SearchPasswordEntriesInput = z.infer<typeof searchPasswordEntriesInputSchema>;

// Password generation input schema
export const generatePasswordInputSchema = z.object({
  length: z.number().int().min(4).max(128).default(16),
  include_uppercase: z.boolean().default(true),
  include_lowercase: z.boolean().default(true),
  include_numbers: z.boolean().default(true),
  include_symbols: z.boolean().default(true)
});

export type GeneratePasswordInput = z.infer<typeof generatePasswordInputSchema>;

// Generated password response schema
export const generatedPasswordSchema = z.object({
  password: z.string(),
  strength: z.enum(['weak', 'medium', 'strong'])
});

export type GeneratedPassword = z.infer<typeof generatedPasswordSchema>;

// Category schema for organization
export const categorySchema = z.object({
  name: z.string(),
  count: z.number().int()
});

export type Category = z.infer<typeof categorySchema>;