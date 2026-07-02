/**
 * examples/npm-usage.js
 *
 * Runnable example showing how to use the @jvzhu/growkudos npm package.
 *
 * Prerequisites:
 *   npm install @jvzhu/growkudos
 *
 * Run:
 *   node examples/npm-usage.js
 */

'use strict';

const growkudos = require('..');  // or require('@jvzhu/growkudos') if installed
const fs = require('fs');
const path = require('path');

// ─── 1. List all available workflows ──────────────────────────────────────────
console.log('=== All Workflows ===');
const all = growkudos.listWorkflows();
console.log(`Total: ${all.length} workflows`);
console.log(all.join(', '));
console.log();

// ─── 2. Get all categories ────────────────────────────────────────────────────
console.log('=== Categories ===');
const categories = growkudos.getCategories();
console.log(categories.join(', '));
console.log();

// ─── 3. Browse by category ────────────────────────────────────────────────────
console.log('=== SAST Tools ===');
const sast = growkudos.getWorkflowsByCategory('sast');
Object.entries(sast).forEach(([id, info]) => {
  console.log(`  [${id}] ${info.name} — ${info.description}`);
});
console.log();

// ─── 4. Find tools for a language ─────────────────────────────────────────────
console.log('=== Python Tools ===');
const pythonTools = growkudos.getWorkflowsByLanguage('python');
Object.keys(pythonTools).forEach((id) => console.log(`  ${id}`));
console.log();

// ─── 5. Get free tools only ───────────────────────────────────────────────────
console.log('=== Free Tools ===');
const free = growkudos.getFreeWorkflows();
Object.entries(free).forEach(([id, info]) => {
  console.log(`  [${id}] ${info.name} (${info.category}, ${info.license})`);
});
console.log();

// ─── 6. Read a workflow's YAML ────────────────────────────────────────────────
console.log('=== Bandit Workflow (first 5 lines) ===');
const banditYaml = growkudos.getWorkflowContent('bandit');
if (banditYaml) {
  console.log(banditYaml.split('\n').slice(0, 5).join('\n'));
  console.log('...');
} else {
  console.log('(not found — package may not be installed from GitHub Packages)');
}
console.log();

// ─── 7. Install free SAST workflows into a project ───────────────────────────
const dryRun = true;  // Set to false to actually write files

console.log('=== Installing Free SAST Workflows ===');
const freeSast = Object.entries(growkudos.getFreeWorkflows())
  .filter(([, w]) => w.category === 'sast');

const outputDir = path.join(process.cwd(), 'tmp-security-workflows');

if (!dryRun) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const [id, meta] of freeSast) {
  const content = growkudos.getWorkflowContent(id);
  if (content) {
    const dest = path.join(outputDir, meta.file);
    if (!dryRun) {
      fs.writeFileSync(dest, content);
    }
    console.log(`  ${dryRun ? '[dry-run] ' : ''}✅ ${meta.name} → ${dest}`);
  } else {
    console.log(`  ⚠️  ${meta.name}: workflow file not found`);
  }
}
console.log();

// ─── 8. Generate a summary table ─────────────────────────────────────────────
console.log('=== Summary Table ===');
const rows = Object.entries(growkudos.WORKFLOWS).map(([id, w]) => ({
  ID: id,
  Name: w.name,
  Category: w.category,
  Free: w.free ? '✅' : '❌',
  Languages: w.language.slice(0, 2).join(', ') + (w.language.length > 2 ? '...' : ''),
}));

// Print as a simple text table
const cols = ['ID', 'Name', 'Category', 'Free', 'Languages'];
const widths = cols.map((c) =>
  Math.max(c.length, ...rows.map((r) => String(r[c]).length))
);
const header = cols.map((c, i) => c.padEnd(widths[i])).join(' | ');
const divider = widths.map((w) => '-'.repeat(w)).join('-+-');
console.log(header);
console.log(divider);
rows.forEach((row) => {
  console.log(cols.map((c, i) => String(row[c]).padEnd(widths[i])).join(' | '));
});
