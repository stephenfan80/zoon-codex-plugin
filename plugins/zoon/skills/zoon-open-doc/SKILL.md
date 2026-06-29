---
name: zoon-open-doc
description: Open a Zoon document workspace in the Codex in-app browser. Use when the user wants to continue editing a Zoon document in Codex, shares a Zoon URL, or the Zoon skill creates a tokenized document URL.
---

# Zoon Open Doc

Open the Zoon document workspace in the Codex Browser for visible review,
selection, comments, and human interaction.

This skill is for opening the document workspace. Do not use browser DOM
automation to mutate document content. Reads, writes, comments, suggestions, and
presence still belong on the Zoon HTTP routes documented by the `zoon` skill.

## Input

Use the tokenized Zoon document URL provided by the user or returned as
`tokenUrl` from `POST /documents`:

```text
https://<host>/d/<slug>?token=<token>
```

If the URL is missing, ask the user for a Zoon document URL or create one from
the current Markdown artifact through the `zoon` skill. If the URL is a clean
`/d/<slug>` link without `?token=`, open it for viewing only and do not claim
agent write access.

## Workflow

1. Use the Browser plugin's `control-in-app-browser` skill as the source of
truth for opening the Codex Browser. The required runtime is the Node REPL
JavaScript execution tool.

2. Bootstrap the Browser runtime from the installed Browser plugin package. Do
not hard-code a username or plugin version:

```js
const os = await import("node:os");
const path = await import("node:path");
const fs = await import("node:fs/promises");

const homeDir = nodeRepl.homeDir ?? os.homedir();
const codexHome = globalThis.process?.env?.CODEX_HOME ?? path.join(homeDir, ".codex");
const browserRoot = path.join(codexHome, "plugins", "cache", "openai-bundled", "browser");
const versions = (await fs.readdir(browserRoot)).sort();
const browserClientPath = path.join(browserRoot, versions.at(-1), "scripts", "browser-client.mjs");

const { setupBrowserRuntime } = await import(browserClientPath);
await setupBrowserRuntime({ globals: globalThis });
globalThis.browser = await agent.browsers.get("iab");
```

3. Make the browser visible, reuse the selected tab when possible, and navigate
only when the selected tab is not already on the requested Zoon URL:

```js
const url = "<ZOON_DOC_URL>";
await (await browser.capabilities.get("visibility")).set(true);

let selectedTab = null;
try {
  selectedTab = await browser.tabs.selected();
} catch (error) {
  if (!String(error?.message ?? error).includes("No active tab")) throw error;
}

globalThis.tab = selectedTab ?? await browser.tabs.new();
if ((await tab.url()) !== url) {
  await tab.goto(url);
}
```

4. After opening, treat this Zoon document as the active artifact. Keep visible
review in the browser, and continue all document operations through HTTP. For
example, send presence with `POST /documents/:slug/presence`, read state with
`GET /documents/:slug/state`, and write with `POST /documents/:slug/edit/v2`.

## Fallback

If browser control is unavailable, or browser bootstrap fails with a tool-layer
or session-metadata error, do not retry repeatedly. Give the user the Zoon URL
and say they can right-click it and choose `在 Codex 浏览器中打开` /
`Open in Codex Browser`.

Do not claim the document was opened unless navigation actually succeeded.
