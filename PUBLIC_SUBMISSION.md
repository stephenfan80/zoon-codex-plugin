# Zoon Codex Plugin Public Submission

## Listing

- Name: Zoon
- Category: Productivity
- Repository: https://github.com/stephenfan80/zoon-codex-plugin
- Website: https://zoon.up.railway.app/
- One-line description: Turn Codex Markdown drafts into collaborative Zoon documents.

## Short Description

Zoon lets Codex turn long Markdown answers into collaborative documents that can
be reviewed, commented on, revised, and kept as the shared artifact.

## Long Description

Zoon is an agent-native collaborative markdown document workspace. Use the
plugin when a user wants a Codex-generated plan, spec, PRD, report, article, or
multi-section analysis to keep evolving as a document instead of staying trapped
in chat. The Codex Browser opens the visible document workspace; document
updates use Zoon's agent protocol and the document token shared by the user.

## Keywords

codex plugin, Zoon, collaborative docs, agent docs, markdown, AI writing,
document collaboration, long-form writing, plan docs, spec docs

## User Installation

```bash
codex plugin marketplace add stephenfan80/zoon-codex-plugin
```

Then enable `Zoon` in Codex's Plugins list and start a new session.

## Trigger Examples

- `Continue this draft in Zoon`
- `用 Zoon 继续改这份方案`
- `Write this plan into a new Zoon doc`
- `Turn this Markdown into a collaborative document`
- `Open this Zoon document workspace`
- `/zoon`
- `https://zoon.up.railway.app/d/<slug>?token=<token>`

## Security Notes

Zoon uses URL-token document sharing. The plugin does not require install-time
authentication. It uses the token in the document URL that the user shares for a
specific task.

## Validation

- `npm test`
- GitHub Actions workflow: `validate`
- Live smoke test: create a document, open it in the Codex workbench, add
  in-document feedback, and verify Codex updates the same document
