# Getting Started with GrowKudos

Welcome! This guide walks you through setting up security scanning in your GitHub repository using GrowKudos workflow templates — even if you're new to GitHub Actions or application security.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Understanding the Workflow Files](#understanding-the-workflow-files)
- [Step 1: Choose Your First Tool](#step-1-choose-your-first-tool)
- [Step 2: Add the Workflow](#step-2-add-the-workflow)
- [Step 3: Configure Secrets (if needed)](#step-3-configure-secrets-if-needed)
- [Step 4: Run Your First Scan](#step-4-run-your-first-scan)
- [Step 5: Review Results](#step-5-review-results)
- [Step 6: Expand Your Security Coverage](#step-6-expand-your-security-coverage)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ A GitHub repository (public or private)
- ✅ Code pushed to the repository
- ✅ Repository write access (to add workflow files)

No additional software installation is required for most free tools.

---

## Understanding the Workflow Files

GitHub Actions workflows are YAML files stored in `.github/workflows/` in your repository. When you add a file there, GitHub automatically picks it up and runs it based on the triggers defined in the file.

A typical GrowKudos workflow file looks like this:

```yaml
name: Bandit Security Scan          # Display name in the Actions tab

on:                                 # When to run
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  schedule:
    - cron: '30 12 * * 1'           # Weekly on Mondays

permissions:
  contents: read                    # Minimum permissions needed
  security-events: write            # Needed to upload SARIF results

jobs:
  bandit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Bandit
        uses: some/action@v1
        with:
          args: -r . -f sarif
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: results.sarif
```

---

## Step 1: Choose Your First Tool

If you're not sure where to start, we recommend beginning with tools that:
- Require **no secrets** (no sign-up needed)
- Produce **immediate value**
- Are **fast to run**

### Recommended Starter Combination

| Tool | Workflow File | What It Does |
|------|--------------|-------------|
| **CodeQL** | `codeql.yml` | Deep semantic analysis of your code |
| **Dependency Review** | `dependency-review.yml` | Checks new dependencies for vulnerabilities |
| **OSV Scanner** | `osv-scanner.yml` | Scans all dependencies against OSV database |

**Python project?** Also add:
- `bandit.yml` — Python-specific security checks

**Node.js project?** Also add:
- `snyk-security.yml` — Great for npm/yarn dependency scanning

---

## Step 2: Add the Workflow

### Method A: Copy via GitHub UI

1. Go to the [GrowKudos repository](https://github.com/jvzhu/GrowKudos)
2. Navigate to `.github/workflows/`
3. Click the workflow file you want (e.g., `bandit.yml`)
4. Click **Raw** to see the raw content
5. Select all (`Ctrl+A`) and copy (`Ctrl+C`)
6. Go to **your repository** → **Add file** → **Create new file**
7. Name the file `.github/workflows/bandit.yml`
8. Paste the content and click **Commit changes**

### Method B: Copy via Command Line

```bash
# Clone GrowKudos
git clone https://github.com/jvzhu/GrowKudos.git

# Go to your project
cd your-project

# Create the workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy the workflow(s) you want
cp ../GrowKudos/.github/workflows/bandit.yml .github/workflows/
cp ../GrowKudos/.github/workflows/dependency-review.yml .github/workflows/
cp ../GrowKudos/.github/workflows/codeql.yml .github/workflows/

# Commit and push
git add .github/workflows/
git commit -m "feat: add security scanning workflows"
git push
```

### Method C: Download Individual Files

```bash
# Download directly using curl
mkdir -p .github/workflows

curl -o .github/workflows/bandit.yml \
  https://raw.githubusercontent.com/jvzhu/GrowKudos/main/.github/workflows/bandit.yml

curl -o .github/workflows/codeql.yml \
  https://raw.githubusercontent.com/jvzhu/GrowKudos/main/.github/workflows/codeql.yml
```

---

## Step 3: Configure Secrets (if needed)

Some tools require API keys or tokens. For **free/open-source tools** like CodeQL, Bandit, OSV Scanner, and Dependency Review, **no secrets are needed**.

If you chose a tool that requires secrets (e.g., Snyk), follow these steps:

### Adding a GitHub Secret

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter the secret **Name** (e.g., `SNYK_TOKEN`) and **Value**
6. Click **Add secret**

### Where to Get Tokens

| Tool | Where to Get Token | Secret Name |
|------|--------------------|-------------|
| Snyk | [app.snyk.io](https://app.snyk.io) → Account Settings | `SNYK_TOKEN` |
| Semgrep | [semgrep.dev](https://semgrep.dev) → Settings | `SEMGREP_APP_TOKEN` |
| Debricked | [debricked.com](https://debricked.com) → Account | `DEBRICKED_TOKEN` |
| StackHawk | [app.stackhawk.com](https://app.stackhawk.com) → API Keys | `HAWK_API_KEY` |
| Codacy | [app.codacy.com](https://app.codacy.com) → Project Settings | `CODACY_PROJECT_TOKEN` |

---

## Step 4: Run Your First Scan

After adding the workflow file and any required secrets:

### Automatic Trigger

Most workflows trigger automatically on:
- **Push** to `main` — just push your commit
- **Pull Request** — open or update a PR
- **Schedule** — runs at the configured cron time (usually weekly)

### Manual Trigger

You can also trigger workflows manually:

1. Go to your repository
2. Click the **Actions** tab
3. Select the workflow from the left sidebar
4. Click **Run workflow** → **Run workflow**

---

## Step 5: Review Results

### In the Actions Tab

1. Go to **Actions** tab in your repository
2. Find the workflow run (green ✅, orange 🟡, or red ❌)
3. Click the run to see details
4. Click the job name to see step-by-step logs

### In the Security Tab (SARIF results)

Tools that output SARIF format (CodeQL, Bandit, Semgrep, etc.) post results to the **Security** tab:

1. Go to **Security** tab in your repository
2. Click **Code scanning** (or **Dependency graph** for SCA tools)
3. Browse findings by severity, rule, or file
4. Click a finding to see the affected code and remediation guidance

### Interpreting Severity Levels

| Severity | Action |
|----------|--------|
| 🔴 Critical | Fix immediately — active exploit risk |
| 🟠 High | Fix in current sprint |
| 🟡 Medium | Schedule for upcoming sprint |
| 🔵 Low | Fix when convenient |
| ⚪ Note / Info | Review and decide |

---

## Step 6: Expand Your Security Coverage

Once you're comfortable with your first workflow, consider adding more:

### Expand by Layer

```
Layer 1 (Start here):
  ✅ codeql.yml              - Code analysis
  ✅ dependency-review.yml   - Dependency check

Layer 2 (Add next):
  ✅ osv-scanner.yml         - Broader dependency scanning
  ✅ bandit.yml              - Python specific (if applicable)
  ✅ semgrep.yml             - Additional SAST rules

Layer 3 (Production readiness):
  ✅ snyk-security.yml       - Dependency + container scanning
  ✅ codacy.yml              - Code quality dashboard
  ✅ stackhawk.yml           - DAST for APIs (if applicable)

Layer 4 (Enterprise/Compliance):
  ✅ checkmarx-one.yml       - Enterprise SAST
  ✅ veracode.yml            - Compliance reporting
  ✅ sysdig-scan.yml         - Container security
```

### Customize Triggers

Edit the `on:` section of any workflow to customize when it runs:

```yaml
on:
  push:
    branches: [ "main", "develop" ]    # Scan multiple branches
  pull_request:
    branches: [ "main" ]
    paths:                              # Only when Python files change
      - '**.py'
      - 'requirements*.txt'
  schedule:
    - cron: '0 2 * * 0'                # Weekly on Sundays at 2am
  workflow_dispatch:                    # Allow manual runs
```

---

## Troubleshooting

### Workflow Not Running

**Check:** Is the file saved to `.github/workflows/` (with the `.` prefix)?

```bash
ls -la .github/workflows/
# Should show your .yml files
```

**Check:** Is the YAML syntax valid?

```bash
# Install yamllint
pip install yamllint
yamllint .github/workflows/your-workflow.yml
```

### Workflow Fails with "Secret Not Found"

The workflow requires a secret you haven't added yet. Check the workflow file for `${{ secrets.SECRET_NAME }}` references and add those secrets in **Settings → Secrets → Actions**.

### Scan Finds Many Issues

Don't panic! Start with **Critical** and **High** severity findings. Many tools support suppression/allowlisting for accepted risks:

```yaml
# Many tools support ignore files
# Create .bandit, .semgrepignore, etc.
```

### SARIF Upload Fails

Make sure the workflow has `security-events: write` permission:

```yaml
permissions:
  contents: read
  security-events: write
```

---

## Next Steps

- 📖 Read [TOOLS_GUIDE.md](TOOLS_GUIDE.md) for deep dives on each tool
- 📊 Check [COMPARISON_MATRIX.md](COMPARISON_MATRIX.md) to compare tools side-by-side
- 💡 See [BEST_PRACTICES.md](BEST_PRACTICES.md) for security scanning best practices
- ⚡ Read [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) to speed up your CI/CD
- ❓ Browse [FAQ.md](FAQ.md) for common questions
- 🤝 See [CONTRIBUTING.md](CONTRIBUTING.md) to add your own workflows
