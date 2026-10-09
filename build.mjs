import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = dirname(fileURLToPath(import.meta.url));
const order = JSON.parse(readFileSync(resolve(root, 'src/order.json'), 'utf8'));
const banner = '/* Obsidian Liquid Glass 0.1.0 | Copyright 2026 XuMintian | MIT License\n   Generated from src/ via node build.mjs. */\n';
const css = banner + order.map(path => '\n/* Module: ' + path + ' */\n' + readFileSync(resolve(root, path), 'utf8')).join('\n');
if (process.argv.includes('--check')) {
  if (readFileSync(resolve(root, 'theme.css'), 'utf8') !== css) throw new Error('theme.css is out of date');
  console.log('theme.css matches all source modules.');
} else { writeFileSync(resolve(root, 'theme.css'), css); console.log('Built theme.css'); }
