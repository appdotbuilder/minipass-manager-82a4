import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createPasswordEntryInputSchema,
  updatePasswordEntryInputSchema,
  searchPasswordEntriesInputSchema,
  generatePasswordInputSchema
} from './schema';

// Import handlers
import { createPasswordEntry } from './handlers/create_password_entry';
import { getPasswordEntries } from './handlers/get_password_entries';
import { getPasswordEntry } from './handlers/get_password_entry';
import { updatePasswordEntry } from './handlers/update_password_entry';
import { deletePasswordEntry } from './handlers/delete_password_entry';
import { searchPasswordEntries } from './handlers/search_password_entries';
import { generatePassword } from './handlers/generate_password';
import { getCategories } from './handlers/get_categories';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Password entry CRUD operations
  createPasswordEntry: publicProcedure
    .input(createPasswordEntryInputSchema)
    .mutation(({ input }) => createPasswordEntry(input)),

  getPasswordEntries: publicProcedure
    .query(() => getPasswordEntries()),

  getPasswordEntry: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getPasswordEntry(input.id)),

  updatePasswordEntry: publicProcedure
    .input(updatePasswordEntryInputSchema)
    .mutation(({ input }) => updatePasswordEntry(input)),

  deletePasswordEntry: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deletePasswordEntry(input.id)),

  // Search functionality
  searchPasswordEntries: publicProcedure
    .input(searchPasswordEntriesInputSchema)
    .query(({ input }) => searchPasswordEntries(input)),

  // Password generation
  generatePassword: publicProcedure
    .input(generatePasswordInputSchema)
    .mutation(({ input }) => generatePassword(input)),

  // Categories for organization
  getCategories: publicProcedure
    .query(() => getCategories()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Password Manager TRPC server listening at port: ${port}`);
}

start();