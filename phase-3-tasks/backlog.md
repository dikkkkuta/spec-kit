# Academic Ease Task Backlog

## Phase 0 – Foundational Setup
- **Environment scaffolding**: Create `phase-4-implement/.env.example` capturing DB, Redis, AI, storage, email credentials.
- **CI pipeline**: Add `.github/workflows/ci.yml` running `pnpm install`, `pnpm lint`, `pnpm test`, `pnpm build`; integrate CodeRabbit and Dependabot.
- **Dependency hygiene**: Enable Snyk/Dependabot config and document upgrade workflow.

## Phase 1 – Authentication & RBAC
- **Registration hardening**: Update `app/api/auth/register/route.ts` with schema validation, conflict toasts, rate limiting, and role seeding.
- **Email verification UX**: Enhance `app/(auth)/verify/page.tsx` with retry timer, polling, and failure messaging.
- **Session management**: Integrate Clerk/Auth0 (or NextAuth) with HTTP-only cookies, refresh tokens, and Prisma adapters.
- **Audit trail**: Add Prisma models + logging middleware to capture auth events and expose admin audit view.

## Phase 2 – Journal Metadata Service
- **Schema extensions**: Modify `prisma/schema.prisma` to include `Journal`, `Discipline`, `GuidelineSection`; run migrations.
- **Seed script**: Create `prisma/seed.ts` to ingest initial journal dataset and discipline taxonomy.
- **Caching layer**: Implement Redis caching in `app/api/journals/[id]/route.ts` with invalidation on update.
- **Search endpoint**: Build filtered search with pagination, leveraging Postgres `pg_trgm` extension.

## Phase 3 – Document Authoring & Formatting
- **Editor integration**: Embed collaborative editor component with autosave, offline drafts, and accessibility checks.
- **Formatting queue**: Implement BullMQ producer to enqueue AI formatting jobs; create `workers/formatter.ts`.
- **AI suggestions**: Connect to OpenAI/Anthropic with rate limiting, telemetry, and feature flags.
- **Word count rules**: Add server-side and client indicators enforcing journal section constraints.
- **Version history**: Store document snapshots, diff view, and rollback controls.

## Phase 4 – Export & Submission Workflow
- **Export worker**: Implement `workers/exporter.ts` to generate PDF/DOCX via headless Chromium, store in S3, update task status.
- **Download API**: Create `app/api/exports/[id]/route.ts` generating signed URLs; add expiry and logging.
- **Submission tracker**: Build UI + API to record submission stages, reminders, and reviewer notes.
- **Third-party hooks**: Scaffold integration layer for ScholarOne/Editorial Manager behind feature flags.

## Phase 5 – Collaboration & Notifications
- **Invite flow**: Implement `app/api/invitations/route.ts` for co-author invites with tokenized acceptance.
- **Real-time updates**: Evaluate Pusher/Ably for live presence and job completion toasts.
- **Commenting system**: Add inline comments, mentions, and notification preferences persisted in Postgres.

## Phase 6 – Observability & Operations
- **Logging strategy**: Integrate Pino + Vercel Log Drains for API; ensure correlation IDs propagate to workers.
- **Monitoring dashboards**: Configure Datadog/New Relic dashboards for latency, error rate, queue depth, and DB load.
- **Error tracking**: Add Sentry across client, API, and workers with release tagging.
- **Performance budgets**: Define SLIs/SLOs (P95 < 500 ms sync, job completion < 30 s) and alert rules via PagerDuty/Slack.

## Phase 7 – Security & Compliance
- **GDPR tooling**: Implement data export/delete flows with admin approval and immutable logging.
- **WAF & rate limits**: Configure Cloudflare WAF, Upstash rate limiting, and bot detection for auth endpoints.
- **Secrets rotation**: Document rotation cadence using AWS Secrets Manager and Vercel integrations.
- **Pen test checklist**: Prepare scope and schedule for annual penetration testing.

## Phase 8 – Marketing & Growth
- **Analytics integration**: Add privacy-friendly analytics (Plausible/GA4) with consent banner and opt-out logic.
- **SEO optimization**: Generate sitemap, metadata, OG tags, and schema markup for marketing pages.
- **Landing experiments**: Configure Vercel A/B test framework and telemetry to measure conversions.

## Standing Tasks
- **Spec upkeep**: Update `phase-1-specify/academic-ease-spec.md` and `phase-2-plan/architecture.md` when scope changes.
- **Backlog grooming**: Review this file each sprint to reprioritize tasks based on velocity, risks, and stakeholder feedback.
