import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), 'utf8'));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const plugin = readJson('plugins/zoon/.codex-plugin/plugin.json');
const marketplace = readJson('.agents/plugins/marketplace.json');

assert(plugin.name === 'zoon', 'plugin name must be zoon');
assert(plugin.skills === './skills/', 'plugin must expose bundled skills');
assert(plugin.interface?.displayName === 'Zoon', 'displayName must be Zoon');
assert(plugin.interface?.category === 'Productivity', 'plugin category must be Productivity');
assert(plugin.interface?.capabilities?.includes('Read'), 'plugin must include Read capability');
assert(plugin.interface?.capabilities?.includes('Open'), 'plugin must include Open capability');
assert(plugin.interface?.capabilities?.includes('Write'), 'plugin must include Write capability');
assert(plugin.interface?.defaultPrompt?.length <= 3, 'defaultPrompt must include at most 3 items');

for (const prompt of plugin.interface.defaultPrompt) {
  assert(prompt.length <= 128, `default prompt is too long: ${prompt}`);
}

for (const assetPath of [
  plugin.interface.composerIcon,
  plugin.interface.logo,
  ...plugin.interface.screenshots,
]) {
  assert(assetPath.startsWith('./assets/'), `asset path must be under ./assets/: ${assetPath}`);
  assert(existsSync(path.join(root, 'plugins/zoon', assetPath)), `missing asset: ${assetPath}`);
}

assert(marketplace.name === 'zoon', 'marketplace name must be zoon');
assert(marketplace.plugins?.length === 1, 'marketplace must include exactly one plugin entry');

const entry = marketplace.plugins[0];
assert(entry.name === 'zoon', 'marketplace entry name must be zoon');
assert(entry.source?.source === 'local', 'marketplace source must be local');
assert(entry.source?.path === './plugins/zoon', 'marketplace source path must be ./plugins/zoon');
assert(entry.policy?.installation === 'AVAILABLE', 'installation policy must be AVAILABLE');
assert(entry.policy?.authentication === 'ON_USE', 'authentication policy must be ON_USE');
assert(entry.category === 'Productivity', 'marketplace category must be Productivity');

const rootSkill = readFileSync(path.join(root, 'SKILL.md'), 'utf8');
const pluginSkill = readFileSync(path.join(root, 'plugins/zoon/skills/zoon/SKILL.md'), 'utf8');
const openDocSkillPath = path.join(root, 'plugins/zoon/skills/zoon-open-doc/SKILL.md');
assert(existsSync(openDocSkillPath), 'zoon-open-doc skill must be bundled');
const openDocSkill = readFileSync(openDocSkillPath, 'utf8');
assert(rootSkill === pluginSkill, 'root SKILL.md and bundled skill must match');

const sourceRoot = process.env.ZOON_SOURCE_ROOT;
if (sourceRoot) {
  const sourceSkillPath = path.join(sourceRoot, 'docs/zoon-agent.skill.md');
  assert(existsSync(sourceSkillPath), `missing source skill: ${sourceSkillPath}`);
  const sourceSkill = readFileSync(sourceSkillPath, 'utf8');
  assert(pluginSkill === sourceSkill, 'bundled skill must match Zoon canonical docs/zoon-agent.skill.md');
}

assert(/推到 Zoon|write into Zoon|Zoon document URL/i.test(pluginSkill), 'skill must include Zoon trigger language');
assert(/Shortcut Trigger:\s*`\/zoon`/.test(pluginSkill), 'skill must document the /zoon shortcut');
assert(/Do not automate the editor DOM/.test(pluginSkill), 'skill must keep mutations off browser DOM');
assert(/zoon-open-doc/.test(pluginSkill), 'skill must mention the browser-open handoff skill');
assert(/name:\s*zoon-open-doc/.test(openDocSkill), 'open-doc skill must have the expected name');
assert(/Codex Browser/.test(openDocSkill), 'open-doc skill must target Codex Browser');
assert(/tab\.goto\(url\)/.test(openDocSkill), 'open-doc skill must document browser navigation');
assert(/Do not use browser DOM\s+automation to mutate document content/.test(openDocSkill), 'open-doc skill must forbid DOM mutation writes');

console.log('Zoon Codex plugin validation passed');
