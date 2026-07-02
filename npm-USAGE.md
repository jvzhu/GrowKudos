# npm Package Usage Guide

This guide covers how to use `@jvzhu/growkudos` as a Node.js package to programmatically work with GrowKudos workflow templates.

---

## Installation

```bash
# Step 1: Configure the registry
echo "@jvzhu:registry=https://npm.pkg.github.com" >> .npmrc

# Step 2: Authenticate (requires a GitHub Personal Access Token with read:packages scope)
npm login --scope=@jvzhu --auth-type=legacy --registry=https://npm.pkg.github.com

# Step 3: Install
npm install @jvzhu/growkudos
```

Or with your token directly in `.npmrc`:

```
@jvzhu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

---

## API Reference

### `WORKFLOWS`

The full metadata object for all workflows.

```js
const { WORKFLOWS } = require('@jvzhu/growkudos');

console.log(WORKFLOWS.bandit);
// {
//   name: 'Bandit',
//   file: 'bandit.yml',
//   category: 'sast',
//   language: ['python'],
//   description: 'Security linter for Python code',
//   license: 'Apache-2.0',
//   free: true
// }
```

---

### `listWorkflows()`

Returns an array of all workflow identifier strings.

```js
const { listWorkflows } = require('@jvzhu/growkudos');

const ids = listWorkflows();
// ['bandit', 'codeql', 'semgrep', 'devskim', ...]
console.log(`${ids.length} workflows available`);
```

---

### `getCategories()`

Returns an array of unique category names.

```js
const { getCategories } = require('@jvzhu/growkudos');

const categories = getCategories();
// ['sast', 'dast', 'sca', 'container', 'iac', 'enterprise', 'supply-chain', 'quality']
```

---

### `getWorkflowsByCategory(category)`

Returns a filtered metadata object for workflows in the given category.

```js
const { getWorkflowsByCategory } = require('@jvzhu/growkudos');

const sast = getWorkflowsByCategory('sast');
Object.entries(sast).forEach(([id, info]) => {
  console.log(`${id}: ${info.description}`);
});
```

Valid categories: `sast`, `dast`, `sca`, `container`, `iac`, `enterprise`, `supply-chain`, `quality`

---

### `getWorkflowsByLanguage(language)`

Returns workflows supporting the specified language (including `'multiple'` language tools).

```js
const { getWorkflowsByLanguage } = require('@jvzhu/growkudos');

const pythonTools = getWorkflowsByLanguage('python');
// Includes Bandit, CodeQL, Semgrep, DevSkim, Pyre, Pysa, etc.
```

---

### `getFreeWorkflows()`

Returns only workflows where `free: true`.

```js
const { getFreeWorkflows } = require('@jvzhu/growkudos');

const free = getFreeWorkflows();
console.log('Free tools:', Object.keys(free).join(', '));
```

---

### `getWorkflowPath(workflowId)`

Returns the absolute filesystem path to a workflow file.

```js
const { getWorkflowPath } = require('@jvzhu/growkudos');

const filePath = getWorkflowPath('codeql');
// '/path/to/node_modules/@jvzhu/growkudos/.github/workflows/codeql.yml'
```

Returns `null` if the workflow ID is not found.

---

### `getWorkflowContent(workflowId)`

Returns the YAML content of a workflow file as a string.

```js
const { getWorkflowContent } = require('@jvzhu/growkudos');

const yaml = getWorkflowContent('semgrep');
console.log(yaml);
// # This workflow uses actions that are not certified by GitHub.
// name: Semgrep
// ...
```

Returns `null` if not found.

---

### `getWorkflowsDir()`

Returns the absolute path to the workflows directory inside the package.

```js
const { getWorkflowsDir } = require('@jvzhu/growkudos');

console.log(getWorkflowsDir());
// '/path/to/node_modules/@jvzhu/growkudos/.github/workflows'
```

---

## Recipes

### Install all free SAST workflows into your project

```js
const growkudos = require('@jvzhu/growkudos');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), '.github', 'workflows');
fs.mkdirSync(outputDir, { recursive: true });

const freeSast = Object.entries(growkudos.getFreeWorkflows())
  .filter(([, w]) => w.category === 'sast');

for (const [id, meta] of freeSast) {
  const content = growkudos.getWorkflowContent(id);
  if (content) {
    const dest = path.join(outputDir, meta.file);
    fs.writeFileSync(dest, content);
    console.log(`✅ Installed: ${meta.name} → ${dest}`);
  }
}
```

### Print a summary table of all workflows

```js
const { WORKFLOWS } = require('@jvzhu/growkudos');

const rows = Object.entries(WORKFLOWS).map(([id, w]) => ({
  ID: id,
  Name: w.name,
  Category: w.category,
  Free: w.free ? '✅' : '❌',
  Languages: w.language.join(', '),
}));

console.table(rows);
```

### Find tools by multiple criteria

```js
const { WORKFLOWS } = require('@jvzhu/growkudos');

const results = Object.entries(WORKFLOWS).filter(([, w]) =>
  w.free &&
  w.category === 'sca' &&
  (w.language.includes('python') || w.language.includes('multiple'))
);

console.log('Free SCA tools for Python:');
results.forEach(([id, w]) => console.log(` - ${w.name} (${id})`));
```

---

## Using in GitHub Actions

You can use the npm package inside a GitHub Actions workflow step:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'

- name: Install GrowKudos
  run: |
    echo "@jvzhu:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc
    npm install @jvzhu/growkudos

- name: Install security workflows
  run: node -e "
    const g = require('@jvzhu/growkudos');
    const fs = require('fs');
    fs.mkdirSync('.github/workflows', { recursive: true });
    ['codeql', 'semgrep', 'dependency-review'].forEach(id => {
      const content = g.getWorkflowContent(id);
      if (content) fs.writeFileSync(\`.github/workflows/\${g.WORKFLOWS[id].file}\`, content);
    });
  "
```

---

## See Also

- [README.md](README.md) — Overview and tool matrix
- [examples/npm-usage.js](examples/npm-usage.js) — Complete runnable example
- [GETTING_STARTED.md](GETTING_STARTED.md) — Setup guide
