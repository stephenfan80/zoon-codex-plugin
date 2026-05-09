import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const defaultSourceRoot = path.resolve(root, '../zoon');
const sourceRoot = process.env.ZOON_SOURCE_ROOT || defaultSourceRoot;
const sourceSkill = path.join(sourceRoot, 'docs/zoon-agent.skill.md');

if (!existsSync(sourceSkill)) {
  throw new Error(`Cannot find canonical Zoon skill at ${sourceSkill}`);
}

copyFileSync(sourceSkill, path.join(root, 'SKILL.md'));
copyFileSync(sourceSkill, path.join(root, 'plugins/zoon/skills/zoon/SKILL.md'));

console.log(`Synced plugin skill from ${sourceSkill}`);
