# coursecobbler

A set of open-source tools for building and upgrading e-learning course packages.

## Tools

- **SCORM** _(planned)_: open an existing SCORM package, inject your own controls and styles, and export it again.
- **Podcast** _(in progress)_: turn a video into an interactive package with required regions the learner must watch. The player and timeline work today; packaging is next.

## Design principles

- **Package in, package out.** Bring a video or an existing package, get a package back.
- **We never store media.** Videos are large and costly to host, so processing happens on your machine.
- **The package is the source of truth.** Every package carries its own `cobbler.json`, so any package can be reopened and edited.
