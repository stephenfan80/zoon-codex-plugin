# Zoon Codex Plugin Public Submission

## Listing

- Name: Zoon
- Category: Productivity
- Repository: https://github.com/stephenfan80/zoon-codex-plugin
- Website: https://zoon.up.railway.app/
- One-line description: Write long Codex output into collaborative Zoon docs.

## Short Description

Zoon lets Codex read and write online markdown documents over plain HTTP, with
AI-authored text visible and attributable inside the document.

## Long Description

Zoon is an agent-native collaborative markdown document space. Use the plugin
when a user shares a Zoon URL, asks to push a plan/spec/article into Zoon, or
wants long structured output in an editable collaborative document instead of
chat. No browser automation or SDK is required; Codex follows the bundled skill
and uses the document token shared by the user.

## Keywords

codex plugin, Zoon, collaborative docs, agent docs, markdown, AI writing,
document collaboration, long-form writing, plan docs, spec docs

## User Installation

```bash
codex plugin marketplace add stephenfan80/zoon-codex-plugin
```

Then enable `Zoon` in Codex's Plugins list and start a new session.

## Trigger Examples

- `把这个方案推到 Zoon`
- `Write this plan into a new Zoon doc`
- `Collaborate on this Zoon document`
- `/zoon`
- `https://zoon.up.railway.app/d/<slug>?token=<token>`

## Security Notes

Zoon uses URL-token document sharing. The plugin does not require install-time
authentication. It uses the token in the document URL that the user shares for a
specific task.

## Validation

- `npm test`
- GitHub Actions workflow: `validate`
- Live smoke test: create document, read state, append via `/edit/v2`, add
  comment via `/ops`
