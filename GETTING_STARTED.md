# Getting Started with GrowKudos

This guide walks you through adding GitHub Actions security scanning to your project using GrowKudos workflow templates.

## Prerequisites

- A GitHub repository (public or private)
- Basic familiarity with GitHub Actions
- (Optional) Node.js 14+ if using the npm package

---

## Step 1 — Choose your approach

### Approach A: Copy a workflow file directly (recommended for most users)

No installation required. Browse the [`.github/workflows/`](https://github.com/jvzhu/GrowKudos/tree/main/.github/workflows) directory, pick a workflow, and copy it.

### Approach B: Use the npm package

Useful for automation, CI scripts, or programmatic workflow generation.

```bash
npm install @jvzhu/growkudos
```

---

## Step 2 — Pick your tools

Use the decision guide below:

### What are you scanning?

| If you want to scan... | Start with |
|----------------------|------------|
| Your source code for bugs/vulnerabilities | SAST tools (CodeQL, Semgrep, Bandit) |
| Third-party dependencies | SCA tools (Dependency Review, OSV Scanner) |
| A running web app or API | DAST tools (StackHawk, NeuraLegion) |
| Docker container images | Container tools (Sysdig, Black Duck) |
| Terraform / CloudFormation | IaC tools (Policy Validator) |
| Everything | Comprehensive setup (see examples/) |

### What's your budget?

| Budget | Tools |
|--------|-------|
| Free | CodeQL, Semgrep, Bandit, Dependency Review, OSV Scanner, Pylint, DevSkim, OSSAR, CRDA, Policy Validators, SLSA Publisher |
| Paid | Snyk, Checkmarx, Fortify, Veracode, StackHawk, Sysdig, Debricked, and others |

---

## Step 3 — Add your first workflow

### Option A: Manual copy

1. Go to [https://github.com/jvzhu/GrowKudos/tree/main/.github/workflows](https://github.com/jvzhu/GrowKudos/tree/main/.github/workflows)
2. Open the workflow file for your chosen tool (e.g. `codeql.yml`)
3. Click **Raw**, then copy the content
4. In your repository, create the file `.github/workflows/codeql.yml`
5. Paste the content and commit

### Option B: Using the npm package

```js
const growkudos = require('@jvzhu/growkudos');
const fs = require('fs');

fs.mkdirSync('.github/workflows', { recursive: true });

// Install CodeQL workflow
const codeql = growkudos.getWorkflowContent('codeql');
fs.writeFileSync('.github/workflows/codeql.yml', codeql);
console.log('CodeQL workflow installed!');
```

---

## Step 4 — Configure the workflow

Most workflows work out of the box, but some require configuration:

### Workflows requiring secrets

| Workflow | Required Secret | Where to get it |
|----------|----------------|-----------------|
| `snyk-security.yml` | `SNYK_TOKEN` | [app.snyk.io](https://app.snyk.io) → Account Settings |
| `checkmarx.yml` | `CX_CLIENT_SECRET` | Checkmarx admin console |
| `fortify.yml` | `FTF_CI_TOKEN` | Fortify portal |
| `veracode.yml` | `VERACODE_API_ID`, `VERACODE_API_KEY` | Veracode account settings |
| `debricked.yml` | `DEBRICKED_TOKEN` | Debricked account |
| `sysdig-scan.yml` | `SYSDIG_SECURE_TOKEN` | Sysdig Secure portal |

Add secrets at: **Repository Settings → Secrets and variables → Actions → New repository secret**

### Workflows requiring configuration files

| Workflow | Config file | Purpose |
|----------|-------------|---------|
| `stackhawk.yml` | `.stackhawk.yml` | StackHawk API configuration |
| `semgrep.yml` | `.semgrep.yml` (optional) | Custom rule exclusions |
| `bandit.yml` | `.bandit` (optional) | Test exclusions |

---

## Step 5 — Verify the workflow runs

1. Push a commit to your repository
2. Go to **Actions** tab on GitHub
3. You should see your new workflow running
4. Click on it to see the output
5. Security findings appear in **Security → Code scanning alerts**

---

## Step 6 — Review results

All GrowKudos workflows upload results in SARIF format to GitHub's Security tab. To view:

1. Go to your repository on GitHub
2. Click **Security** tab
3. Click **Code scanning**
4. Review alerts by severity, tool, and file

---

## Next Steps

- Add more workflows from the [Tool Matrix](README.md#tool-matrix)
- Read [BEST_PRACTICES.md](BEST_PRACTICES.md) for recommendations
- See [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) to speed up your pipeline
- Browse [examples/](examples/) for pre-built combinations
