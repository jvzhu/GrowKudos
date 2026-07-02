# Contributing to GrowKudos

Thank you for your interest in contributing to GrowKudos! This guide explains how to add new workflows, improve existing ones, and contribute to documentation.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Adding a New Workflow](#adding-a-new-workflow)
- [Improving Existing Workflows](#improving-existing-workflows)
- [Documentation Contributions](#documentation-contributions)
- [npm Package Contributions](#npm-package-contributions)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)

---

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

## How to Contribute

1. **Fork** the repository on GitHub
2. **Create a branch** for your change: `git checkout -b feature/add-trivy-workflow`
3. **Make your changes** following the guidelines below
4. **Test your changes** locally
5. **Submit a pull request** using the pull request template

---

## Adding a New Workflow

### Checklist for new workflows

Before submitting a new workflow, ensure it meets these criteria:

- [ ] The workflow file is named descriptively (e.g. `trivy.yml`, `grype.yml`)
- [ ] The workflow is placed in `.github/workflows/`
- [ ] The workflow triggers on `push`, `pull_request`, and optionally `schedule`
- [ ] The workflow uploads results as SARIF to the GitHub Security tab (where supported by the tool)
- [ ] The workflow uses the latest stable version of referenced actions (e.g. `actions/checkout@v4`)
- [ ] The workflow uses `permissions:` to restrict the token to minimum required permissions
- [ ] Secrets are referenced from `${{ secrets.* }}` — no hardcoded credentials
- [ ] The workflow includes a comment block explaining what it does

### Workflow template

Use this as a starting point:

```yaml
# This workflow uses actions that are not certified by GitHub.
# <Tool name> - <brief description>
# <Tool URL or marketplace link>

name: <Tool Name>
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday

jobs:
  scan:
    permissions:
      contents: read
      security-events: write
      actions: read

    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run <Tool Name>
        uses: vendor/action-name@version
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # tool-specific options here

      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: results.sarif
```

### Updating index.js

After adding a workflow, add its metadata to `index.js` in the `WORKFLOWS` object:

```js
'your-tool': {
  name: 'Your Tool Name',
  file: 'your-tool.yml',
  category: 'sast',        // sast | dast | sca | container | iac | enterprise | supply-chain | quality
  language: ['python'],    // or ['multiple'] for multi-language tools
  description: 'One-line description of what the tool does',
  license: 'MIT',          // SPDX license identifier or 'Proprietary'
  free: true,              // true if there is no cost for standard usage
},
```

---

## Improving Existing Workflows

When updating existing workflows:

- **Keep the spirit of the original** — don't change the tool or fundamentally alter what it scans
- **Update action versions** — use the latest stable version of referenced GitHub Actions
- **Maintain trigger events** — keep `push`, `pull_request`, and `schedule` triggers unless there is good reason
- **Test the updated workflow** in a fork before submitting

---

## Documentation Contributions

Documentation files live in the repository root. When contributing docs:

- Use clear, concise language
- Use Markdown tables for comparison data
- Code blocks should have language hints (` ```yaml `, ` ```js `, etc.)
- Check links with a Markdown linter before submitting

---

## npm Package Contributions

The npm package is defined by `package.json` and `index.js`. When contributing to the package:

### Development setup

```bash
git clone https://github.com/YOUR_USERNAME/GrowKudos.git
cd GrowKudos
node --version  # requires Node.js 14+
```

### Testing the package

```bash
# Run the built-in smoke tests
npm test

# Test the API manually
node -e "const g = require('.'); console.log(g.listWorkflows().length, 'workflows');"
node -e "const g = require('.'); console.log(g.getCategories());"
node -e "const g = require('.'); console.log(Object.keys(g.getFreeWorkflows()));"
```

### Package versioning

- Follow [Semantic Versioning](https://semver.org/)
- Bump `patch` for bug fixes
- Bump `minor` for new workflows or new API functions
- Bump `major` for breaking API changes

---

## Pull Request Process

1. Fill out the pull request template completely
2. Ensure your PR title is descriptive (e.g. `feat: add Trivy container scanning workflow`)
3. Link any related issues in the PR description
4. Request a review from a maintainer
5. Address review feedback promptly

### Commit message format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Grype vulnerability scanner workflow
fix: update checkout action to v4 in bandit.yml
docs: add Trivy usage example to TOOLS_GUIDE.md
chore: bump semgrep action to latest version
```

---

## Questions?

Open an issue or start a discussion on the [GitHub repository](https://github.com/jvzhu/GrowKudos). We are happy to help!
