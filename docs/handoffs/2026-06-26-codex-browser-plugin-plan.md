# 2026-06-26 Zoon Codex Browser Plugin Plan

## 背景

Zoon 主站已经把 `stephenfan80/zoon-codex-plugin` 作为 Codex 安装路径展示，但插件此前只包含 HTTP 协作 skill。用户希望参考 Cowart，让 Zoon 能在 Codex 内置浏览器里被打开并互动。

## V1 目标

1. 保留 Zoon HTTP 协作协议作为真实读写路径。
2. 新增 `zoon-open-doc` skill，负责把 Zoon 文档 URL 打开到 Codex Browser。
3. 在浏览器工具链不可用时，回退到手动右键打开 URL。
4. 不引入 MCP 写入层，避免一次改动过大。

## 产品边界

- 浏览器：给用户看、滚动、点击、人工编辑。
- HTTP：给 agent 读写、发 presence、评论、建议。
- 不使用浏览器 DOM 自动改正文。

## 验收标准

- 插件 manifest 默认提示包含“Open this Zoon document in Codex Browser”。
- `plugins/zoon/skills/zoon-open-doc/SKILL.md` 存在，并说明 Browser 打开流程和 HTTP 写入边界。
- `npm test` 校验 skill 同步、manifest、资源文件和 open-doc skill。
- 与 Zoon 主仓 canonical skill 保持一致。

## 后续 V2

补 MCP tools：`get_state`、`get_snapshot`、`append_markdown`、`replace_block`、`add_comment`、`add_suggestion`、`post_presence`。这样 Codex 可以少写 curl，同时仍不依赖浏览器 DOM。

## 执行记录

- 已在插件仓创建分支：`codex/zoon-codex-browser-plugin`。
- 已新增 `plugins/zoon/skills/zoon-open-doc/SKILL.md`。
- 已更新 `plugins/zoon/.codex-plugin/plugin.json`，默认提示包含 “Open this Zoon document in Codex Browser”。
- 已通过 `npm run sync` 从 Zoon 主仓同步 canonical `zoon` skill。

## 验证记录

- 插件仓：`npm test` 通过。
- 插件仓：`ZOON_SOURCE_ROOT=/Users/stephenfan/个人项目/zoon npm test` 通过。
- Zoon 主仓：`npm test` 和 `npm run build` 通过。
- Codex Browser 实测：用 `zoon-open-doc` skill 同款 Browser bootstrap 流程打开 `https://zoon.up.railway.app/d/8jcxyiw6` 成功。
