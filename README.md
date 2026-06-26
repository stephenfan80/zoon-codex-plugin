# Zoon Codex Plugin

Codex plugin for Zoon collaborative documents, agent-native markdown editing,
AI writing workflows, and long-form plan/spec/article collaboration.

Zoon is an online markdown document space where humans and agents write together.
This Codex plugin teaches Codex how to open Zoon documents in Codex Browser for
visible interaction, while reading and writing document content over plain HTTP.

Use it when you want Codex to push long plans, specs, articles, design docs, or
multi-section analyses into an editable collaborative document instead of
leaving everything in chat.

## Install In Codex

Add this public marketplace package:

```bash
codex plugin marketplace add stephenfan80/zoon-codex-plugin
```

Then enable `Zoon` in Codex's Plugins list and start a new Codex session.
Once enabled, Codex can discover Zoon from prompts like:

- `Open this Zoon document in Codex Browser`
- `把这个方案推到 Zoon`
- `Write this plan into a new Zoon doc`
- `Collaborate on this Zoon document`
- `/zoon`

You can also paste a Zoon document URL directly:

```text
https://zoon.up.railway.app/d/<slug>?token=<token>
```

## Package Layout

This repository is structured as a Codex plugin marketplace package:

```text
.agents/plugins/marketplace.json
plugins/zoon/.codex-plugin/plugin.json
plugins/zoon/skills/zoon/SKILL.md
plugins/zoon/skills/zoon-open-doc/SKILL.md
```

When Codex public marketplace submission is available, submit this repository as
the source for the `zoon` plugin. Until then, the marketplace command above is
the public install path.

## Trigger Examples

Codex should use Zoon when you:

- Share a Zoon document URL like `https://zoon.up.railway.app/d/<slug>?token=<token>`.
- Say "write this into Zoon", "push this plan to Zoon", or "collaborate in this online doc".
- Ask for long structured output such as a plan, spec, design doc, article, or multi-section analysis.
- Send `/zoon` as a standalone message to make future plan-grade output go to Zoon by default.

Short answers, quick diagnostics, brief clarifications, and small code snippets
should stay in chat unless you explicitly ask for Zoon.

## Security Model

Zoon document access is URL-token based. A shared document URL contains the
`token` query parameter that Codex uses as `Authorization: Bearer <token>` or
`x-share-token`.

Do not post tokenized Zoon URLs in public places. Anyone with the tokenized URL
can access that shared document according to the token's permissions.

The plugin does not require installation-time authentication. It only uses the
document token that the user shares during a task.

## Agent Protocol

The bundled skill is generated from the canonical Zoon skill in the main Zoon
repository:

```text
zoon/docs/zoon-agent.skill.md
```

To sync a local checkout:

```bash
ZOON_SOURCE_ROOT=/path/to/zoon npm run sync
```

To validate the plugin package:

```bash
npm test
ZOON_SOURCE_ROOT=/path/to/zoon npm test
```

The live concise protocol is also available at:

```text
https://zoon.up.railway.app/skill
```

## What Is Included

- Codex plugin manifest with public-marketplace metadata.
- Marketplace entry for `zoon` with `ON_USE` authentication.
- Zoon skill with URL triggers, `/zoon` session mode, read/write routes, comments, suggestions, and event handling.
- Zoon open-doc skill for opening tokenized document URLs in Codex Browser while keeping mutations on HTTP.
- PNG icon and screenshots for marketplace presentation.
- Validation script and GitHub Actions workflow.
