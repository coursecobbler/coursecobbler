# api

The back-end API for coursecobbler, built with NestJS. Runs on port 3003.

## Status

Scaffold only. It answers `GET /` with `Hello World!`.

## Planned

- Episodes endpoints with validation
- Transcription as a background job: a queue and a separate worker process that calls Groq
- Postgres for episodes and transcripts (never media)
- Caching, rate limiting, logging and tests

## Run

From the repo root, with the other apps:

```bash
pnpm dev
```

Or on its own:

```bash
pnpm --filter api dev
```

Then:

```bash
curl localhost:3003
```

## Test

```bash
pnpm --filter api test
```
