# Zoon Codex Plugin Public Submission

## Listing

- Name: Zoon
- Category: Productivity
- Repository: https://github.com/stephenfan80/zoon-codex-plugin
- Website: https://zoon.up.railway.app/
- One-line description: Open and write collaborative Zoon docs from Codex.

## Short Description

Zoon lets Codex open online markdown documents in Codex Browser, then read and
write over plain HTTP with AI-authored text visible and attributable inside the
document.

## Long Description

Zoon is an agent-native collaborative markdown document space. Use the plugin
when a user shares a Zoon URL, asks to view the document in Codex Browser, asks
to push a plan/spec/article into Zoon, or wants long structured output in an
editable collaborative document instead of chat. Browser opening is for visible
interaction; document mutations use Zoon HTTP routes and the document token
shared by the user.

## Keywords

codex plugin, Zoon, collaborative docs, agent docs, markdown, AI writing,
document collaboration, long-form writing, plan docs, spec docs

## User Installation

```bash
codex plugin marketplace add stephenfan80/zoon-codex-plugin
```

Then enable `Zoon` in Codex's Plugins list and start a new session.

## Trigger Examples

- `Open this Zoon document in Codex Browser`
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
