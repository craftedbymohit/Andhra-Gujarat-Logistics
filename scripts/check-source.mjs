import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import postcss from 'postcss';
const traverse = traverseModule.default;
const files = fs.readdirSync('src', { recursive: true }).filter(file => /\.(jsx?|css)$/.test(file));
const unused = [];
const missing = [];
let rules = 0;
for (const file of files) {
  const full = path.join('src', file);
  const text = fs.readFileSync(full, 'utf8');
  if (file.endsWith('.css')) {
    const root = postcss.parse(text, { from: full });
    root.walkRules(() => rules++);
    for (const [, url] of text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
      if (!url.startsWith('data:') && !fs.existsSync(path.resolve(path.dirname(full), url))) missing.push({ full, url });
    }
    continue;
  }
  const ast = parse(text, { sourceType: 'module', plugins: ['jsx'] });
  traverse(ast, {
    ImportDeclaration(nodePath) {
      const target = nodePath.node.source.value;
      if (target.startsWith('.') || target.startsWith('@/')) {
        const base = target.startsWith('@/') ? path.resolve('src', target.slice(2)) : path.resolve(path.dirname(full), target);
        if (!['', '.js', '.jsx', '/index.js', '/index.jsx'].some(suffix => fs.existsSync(base + suffix))) missing.push({ full, target });
      }
      for (const specifier of nodePath.node.specifiers) {
        if (!nodePath.scope.getBinding(specifier.local.name)?.referenced) unused.push({ file: full, name: specifier.local.name });
      }
    },
  });
}
const result = { sourceFiles: files.length, cssRules: rules, missing, unused };
fs.writeFileSync('reports/source-checks.json', JSON.stringify(result, null, 2));
console.log(result);
if (missing.length || unused.length) process.exitCode = 1;
