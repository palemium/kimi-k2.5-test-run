# Project Context for AI Agents

## Current Project

- **Framework**: Next.js 16 with TypeScript, React 19
- **Database**: PostgreSQL (Neon) with Kysely query builder
- **Styling**: Tailwind CSS v4
- **Status**: Waiting list feature implemented and functional

## Code Quality Standards

This project uses strict LLM-first code quality rules. **Always run `npm run quality` before committing!**

### ESLint Rules

- **No semicolons**: `semi: ["error", "never"]`
- **Complexity**: Max 10 per function
- **Function length**: Max 100 lines per function
- **Type imports**: Must use `import type { X }` not `import { X }` for type-only imports
- **Nullish coalescing**: Use `??` not `||` for default values
- **Return types**: All functions must have explicit return types (e.g., `function name(): React.JSX.Element`)
- **Max params**: Maximum 4 parameters per function
- **No-undef**: Disabled for TypeScript files (TypeScript handles this)

### Code Style

- Use kebab-case for filenames
- Prefer `const` over `let`, never use `var`
- Explicit function return types required
- Use `===` and `!==` (eqeqeq rule)
- Curly braces required for all control statements

## Running Quality Checks

**Always run: `npm run quality`** before committing or pushing.

This runs in strict sequence (all must pass with 0 errors):

1. `npm run typecheck` - TypeScript check
2. `npm run lint` - ESLint (max 0 warnings allowed)
3. `npm run format:check` - Prettier formatting
4. `npm run jscpd` - Copy-paste detection (threshold: 5%)
5. `npm run knip` - Unused code/deps detection

⚠️ **The CI will fail if any of these checks fail!**

## ESLint Configuration

⚠️ **CRITICAL LESSON**: The project previously had conflicting `eslint.config.js` and `eslint.config.mjs`. ESLint loads `.js` before `.mjs`, causing unexpected behavior.

**Current setup** (correct):

- Single config file: `eslint.config.mjs`
- Uses `defineConfig` from `eslint/config`
- Imports: `nextVitals`, `nextTs` from `eslint-config-next`
- Custom TypeScript configuration for `src/**/*.{ts,tsx}`
- Plugins: `@typescript-eslint`, `sonarjs`, `unicorn`, `unused-imports`
- **Note**: `globals` package is required by `eslint-plugin-sonarjs`, keep in devDependencies

## Architecture Patterns

### Database Layer

- **Query Builder**: Kysely with PostgreSQL dialect
- **Migrations**: Run with `npx tsx src/lib/migrate.ts`
- **Schema**: See `src/lib/migrate.ts` for table definitions
- **Types**: Database types in `src/lib/types.ts`

### API Layer

- **Location**: `src/app/api/*/route.ts`
- **Pattern**: Export async function for each HTTP method (POST, GET, etc.)
- **Error handling**: Try-catch with appropriate status codes
- **Security**: Return generic success for duplicates to prevent email enumeration

### React Components

- **Return type**: Always explicit `React.JSX.Element`
- **Forms**:
  - Use `onSubmit` on `<form>` for Enter key support
  - Inline simple handlers, extract complex ones
  - Show inline status messages below inputs
  - Disable inputs during loading
  - Use spinner in submit button during loading
- **Event handlers**: Prefix unused params with `_` (e.g., `_event`)
- **Colors**: Success = emerald-400, Error = red-400

### Security Considerations

- **Email enumeration**: Duplicate emails return same success response as new emails
- **Metadata collection**: IP address, user-agent, referrer stored on signup
- **Validation**: Both client-side (React) and server-side (API)

## Knip Configuration

Unused code detection config in `knip.json`:

**Current ignores**:

- `globals` - Required by eslint-plugin-sonarjs but not detected
- `tailwindcss` - Used by PostCSS but not detected
- `tsx` - Used for running scripts but not detected
- `src/lib/migrate.ts` - Script file, not imported

**Entry points**:

- `next.config.{js,ts,mjs}`

**When adding new packages**:

- If knip reports them as unused but they're needed, add to `ignoreDependencies`
- Script files should be added to `ignore` array

## Dependencies to Know

### Production Dependencies

- `next` - Next.js framework
- `react`, `react-dom` - React 19
- `kysely` - Type-safe SQL query builder
- `pg` - PostgreSQL client
- `dotenv` - Environment variables

### DevDependencies (Key ones)

- `globals` - **Keep this!** Required by eslint-plugin-sonarjs
- `postcss` - Required by Tailwind CSS v4
- `tsx` - For running TypeScript scripts (like migrations)
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - PostCSS plugin for Tailwind v4
- `eslint` + plugins: sonarjs, unicorn, unused-imports
- `knip`, `jscpd` - Code quality tools
- `lefthook` - Git hooks (runs on commit)

## Common Issues & Solutions

### ESLint `no-undef` errors for `process`, `console`, `fetch`

- These are **false positives** for TypeScript
- Already disabled in `eslint.config.mjs` for TypeScript files
- If you see these errors, the config may not be loading correctly

### Knip reporting dependencies as unused

- Some packages (globals, tailwindcss, tsx) are used but not auto-detected
- Add them to `knip.json`'s `ignoreDependencies` array

### Function complexity too high

- Extract helper functions
- Break down large conditionals
- Use early returns

### Max lines per function exceeded

- Extract sub-components for UI
- Extract utility functions for logic
- Use composition over large components

## Active Tasks

- [ ] None currently

## Completed Tasks

- [x] Implement waiting list API with database integration
- [x] Fix all code quality issues (ESLint, type imports, complexity)
- [x] Make "Notify Me" button functional with React state
- [x] Unify ESLint configuration (removed conflicting eslint.config.js)
- [x] Pass all quality checks: typecheck, lint, format, jscpd, knip

## Notes for Future Sessions

1. **Always run `npm run quality`** before committing - CI will reject if checks fail
2. **Migrations**: Use `npx tsx src/lib/migrate.ts` to create/update database schema
3. **Database URL**: Stored in `.env` file (DATABASE_URL)
4. **Type safety**: Kysely provides full type safety for database operations
5. **Form handling**: Use the patterns established in `coming-soon.tsx` for new forms
6. **Security**: Follow the duplicate-handling pattern (same response for new/existing)

Last updated: 2026-01-31
