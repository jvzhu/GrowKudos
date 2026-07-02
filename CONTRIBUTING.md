# Contributing to GrowKudos

Thank you for your interest in contributing to GrowKudos! This project is a community-maintained collection of GitHub Actions security scanning workflows, and contributions of all kinds are welcome.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Adding a New Workflow](#adding-a-new-workflow)
- [Improving Existing Workflows](#improving-existing-workflows)
- [Improving Documentation](#improving-documentation)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Workflow Quality Standards](#workflow-quality-standards)
- [Commit Message Format](#commit-message-format)
- [Review Process](#review-process)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards. Please report unacceptable behavior to the repository maintainers.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

If a workflow fails to run, produces incorrect results, or uses outdated action versions:

1. Check [existing issues](https://github.com/jvzhu/GrowKudos/issues) to avoid duplicates
2. Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Include: the workflow filename, error message, and your repository context

### 💡 Suggesting New Workflows

Know a security tool not yet included in GrowKudos?

1. Check [existing issues](https://github.com/jvzhu/GrowKudos/issues) and the current workflow list
2. Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
3. Provide: tool name, category, documentation link, and example configuration

### 📝 Improving Documentation

Documentation improvements are always welcome:
- Fix typos, broken links, or outdated information
- Add examples, explanations, or clarifications
- Translate documentation (create a `docs/` subdirectory for translations)

### ⬆️ Updating Action Versions

GitHub Actions change versions regularly. Help keep workflows current:
- Check for outdated `uses:` references (e.g., `actions/checkout@v3` → `@v4`)
- Verify the update doesn't break the workflow behavior
- Include a note in the PR about what changed

---

## Getting Started

### Prerequisites

- A GitHub account
- Basic familiarity with YAML syntax
- Understanding of GitHub Actions (helpful but not required)

### Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/GrowKudos.git
cd GrowKudos

# Add the upstream remote
git remote add upstream https://github.com/jvzhu/GrowKudos.git
```

### Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Adding a New Workflow

### 1. Create the Workflow File

Create a new `.yml` file in `.github/workflows/`:

```bash
# File naming convention: tool-name.yml (kebab-case, lowercase)
touch .github/workflows/my-new-tool.yml
```

### 2. Follow the Workflow Template

Use this template as a starting point:

```yaml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

# [Brief description of what the tool does]
# [Link to tool documentation]
# [Link to GitHub Action]

name: [Tool Name] Security Scan

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  schedule:
    - cron: '0 6 * * 1'       # Weekly on Mondays

permissions:
  contents: read              # Minimum required permissions
  security-events: write      # Required for SARIF upload (if applicable)
  actions: read               # Required for private repos

jobs:
  scan:
    name: [Tool Name] Analysis
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run [Tool Name]
        uses: tool-vendor/action-name@v1
        with:
          # Required parameters
          api-key: ${{ secrets.TOOL_API_KEY }}
          # Optional parameters with sensible defaults
          output-format: sarif

      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v3
        if: always()          # Upload even if scan found issues
        with:
          sarif_file: results.sarif
          category: tool-name
```

### 3. Workflow Requirements Checklist

Before submitting, verify your workflow:

- [ ] Uses `actions/checkout@v4` (not older versions)
- [ ] Includes `permissions:` block with minimum required permissions
- [ ] Has a descriptive comment header explaining the tool
- [ ] Includes links to the tool's documentation and GitHub Action
- [ ] Uses `${{ secrets.SECRET_NAME }}` for any API keys (never hardcoded)
- [ ] Triggers on `push`, `pull_request`, AND `schedule`
- [ ] Uploads SARIF results if the tool supports it
- [ ] Uses `if: always()` on the SARIF upload step
- [ ] Tested successfully on at least one repository

### 4. Update Documentation

After adding a workflow, update the relevant documentation:

- Add the tool to `TOOLS.md`
- Add an entry to `README.md` tool matrix tables
- Add a section to `TOOLS_GUIDE.md`
- Add a row to `COMPARISON_MATRIX.md`

---

## Improving Existing Workflows

### Updating Action Versions

```yaml
# Before
uses: actions/checkout@v3

# After
uses: actions/checkout@v4
```

Always pin to a major version tag (e.g., `@v4`), not a specific SHA or minor version, unless there's a specific reason (security pinning requires both the tag and SHA comment).

### Fixing Deprecated Syntax

GitHub Actions evolves. Common updates needed:
- `set-output` → `$GITHUB_OUTPUT`
- `save-state` → `$GITHUB_STATE`
- `add-path` → `$GITHUB_PATH`
- Node.js 12/16 actions → Node.js 20

### Adding Configuration Options

When adding optional parameters, provide sensible defaults and document them with comments:

```yaml
with:
  severity: HIGH          # Options: LOW, MEDIUM, HIGH, CRITICAL
  fail-on-severity: HIGH  # Fail workflow if findings at this severity or above
  output-file: results.sarif
```

---

## Improving Documentation

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and quick reference |
| `GETTING_STARTED.md` | Beginner setup guide |
| `TOOLS_GUIDE.md` | Detailed tool documentation |
| `COMPARISON_MATRIX.md` | Tool comparison tables |
| `TOOLS.md` | Tool registry |
| `BEST_PRACTICES.md` | Security scanning best practices |
| `PERFORMANCE_GUIDE.md` | CI/CD optimization tips |
| `FAQ.md` | Frequently asked questions |

### Documentation Standards

- Use proper Markdown formatting
- Include a table of contents for documents over 500 words
- Use code blocks with language hints for all code examples
- Keep tables aligned for readability
- Link between related documents

---

## Submitting a Pull Request

### 1. Create a Feature Branch

```bash
git checkout -b feat/add-xyz-scanner
# or
git checkout -b fix/update-bandit-action-version
# or
git checkout -b docs/improve-getting-started
```

### 2. Make Your Changes

Follow the standards above and test your changes.

### 3. Commit Your Changes

```bash
git add .
git commit -m "feat: add XYZ security scanner workflow"
```

Follow the [commit message format](#commit-message-format).

### 4. Push and Open a PR

```bash
git push origin feat/add-xyz-scanner
```

Then open a pull request on GitHub using the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

---

## Workflow Quality Standards

All workflows must meet these standards:

### Security Standards

- ✅ No hardcoded secrets, tokens, or credentials
- ✅ `permissions:` block with minimum required permissions
- ✅ Sensitive data accessed only via `${{ secrets.* }}`
- ✅ Only reference well-known, maintained GitHub Actions

### Compatibility Standards

- ✅ Uses `actions/checkout@v4` or later
- ✅ Uses `ubuntu-latest` as the runner (unless tool requires otherwise)
- ✅ Compatible with both public and private repositories (document any restrictions)

### Documentation Standards

- ✅ Descriptive comment header with tool description and links
- ✅ Inline comments for non-obvious configuration
- ✅ Secrets requirements listed in comments

### Testing Standards

- ✅ Workflow has been tested and confirmed to run successfully
- ✅ SARIF upload tested (if applicable)
- ✅ Both passing and failing scan scenarios considered

---

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | When to Use |
|------|------------|
| `feat` | Adding a new workflow or feature |
| `fix` | Fixing a broken workflow or bug |
| `docs` | Documentation-only changes |
| `chore` | Maintenance (updating action versions, etc.) |
| `refactor` | Improving workflow structure without changing behavior |

### Examples

```bash
feat: add Endor Labs dependency scanning workflow
fix: update Bandit action to v1.7.5 to fix SARIF upload
docs: add StackHawk configuration example to TOOLS_GUIDE
chore: update checkout action to v4 across all workflows
```

---

## Review Process

### What Maintainers Look For

1. **Correctness** — Does the workflow run successfully?
2. **Security** — No hardcoded secrets, minimal permissions
3. **Quality** — Follows workflow standards
4. **Documentation** — Relevant docs updated
5. **Value** — Does this add meaningful value to the collection?

### Timeline

- Initial review: within 7 days
- Feedback addressed: within 14 days
- Merge: after one maintainer approval

### Getting Help

If you're unsure about anything, open an issue with the `question` label or leave a comment on your PR. We're happy to help!

---

Thank you for contributing to GrowKudos! 🌱
