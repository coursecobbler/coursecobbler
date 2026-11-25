# coursecobbler

Source-available tools for building and upgrading e-learning course packages.

## Tools

- **Podcast** _(in progress)_: turn a video into an interactive course package.
- **SCORM** _(planned)_: open an existing SCORM package, inject your own controls and styles, and export it again.

### What works today (Podcast)

- Video player with a timeline that shows required regions the learner must watch
- Region thumbnails generated with FFmpeg
- Transcription with word-level timing, cleaned up into caption cues
- Captions shown on the video, with a VTT file you can download

Packaging is next.

## Design principles

- **Package in, package out.** Bring a video or an existing package, get a package back.
- **We never store media.** Videos are large and costly to host, so processing happens on your machine. The one exception today: transcription sends the video to [Groq](https://groq.com). A local transcription option is planned.
- **The package is the source of truth.** Every package carries its own `cobbler.json`, so any package can be reopened and edited.

## Setup

Requires Node, pnpm, and a Groq API key (free tier available). FFmpeg is needed for thumbnails.

```bash
pnpm install
cp apps/podcast/.env.example apps/podcast/.env.local
```

Add your key to `apps/podcast/.env.local`, then:

```bash
pnpm dev
```

Open `http://localhost:3000/podcast`.

To generate region thumbnails:

```bash
pnpm --filter podcast thumbs
```

## Roadmap

- Packaging (SCORM export)
- Skip re-transcribing when the video hasn't changed (content hash)
- Back-end API with a job queue for transcription
- Local transcription, no third party

## License

All rights reserved. See [LICENSE](LICENSE).
