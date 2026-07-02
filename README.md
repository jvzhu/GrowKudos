# GrowKudos

> **30+ GitHub Actions security scanning workflows in one npm package — your DevSecOps toolkit made easy.**

[![npm version](https://img.shields.io/github/package-json/v/jvzhu/GrowKudos)](https://github.com/jvzhu/GrowKudos/packages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Workflows-blue)](https://github.com/jvzhu/GrowKudos/tree/main/.github/workflows)

GrowKudos is a curated collection of production-ready GitHub Actions workflow templates covering every major category of application security testing. Whether you need a quick starting point for a single SAST tool or a comprehensive multi-layered scanning pipeline, GrowKudos has you covered.

---

## Table of Contents

- [Why GrowKudos?](#why-growkudos)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Tool Matrix](#tool-matrix)
- [Categories](#categories)
  - [SAST — Static Analysis](#sast--static-analysis)
  - [DAST — Dynamic Analysis](#dast--dynamic-analysis)
  - [SCA — Dependency Scanning](#sca--dependency-scanning)
  - [Container Security](#container-security)
  - [Infrastructure as Code (IaC)](#infrastructure-as-code-iac)
  - [Enterprise Platforms](#enterprise-platforms)
  - [Supply Chain Security](#supply-chain-security)
  - [Code Quality](#code-quality)
- [npm Package Usage](#npm-package-usage)
- [Use Cases](#use-cases)
- [Language Support](#language-support)
- [Free vs. Paid Tools](#free-vs-paid-tools)
- [Contributing](#contributing)
- [License](#license)

---

## Why GrowKudos?

Modern software teams face a sprawling landscape of security scanning tools. Each tool has its own GitHub Actions integration, its own YAML syntax, its own quirks — and getting everything wired together correctly takes hours of trial and error.

**GrowKudos solves this by:**

- **Curating** 30+ battle-tested workflow templates, one per tool, ready to drop into any repository.
- **Categorising** tools by scanning type so you can quickly find what you need.
- **Packaging** everything as an npm module so teams can programmatically query, copy, or extend workflows from CI/CD pipelines or automation scripts.
- **Documenting** every workflow with usage notes, prerequisites, and configuration options.

You focus on shipping software. GrowKudos handles the boilerplate.

---

## Installation

### As a GitHub Actions workflow template

Copy any `.yml` file from [`.github/workflows/`](.github/workflows/) directly into your repository's `.github/workflows/` directory.

### As an npm package

Install from GitHub Packages:

```bash
# Authenticate (one-time)
npm login --scope=@jvzhu --auth-type=legacy --registry=https://npm.pkg.github.com

# Install
npm install @jvzhu/growkudos
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "@jvzhu/growkudos": "^1.0.0"
  }
}
```

And configure your project's `.npmrc`:

```
@jvzhu:registry=https://npm.pkg.github.com
```

---

## Quick Start

### Option 1 — Copy a single workflow

1. Browse the [`.github/workflows/`](.github/workflows/) directory.
2. Find the tool you want (e.g. `semgrep.yml`).
3. Copy the file into your repo at `.github/workflows/semgrep.yml`.
4. Commit and push — the workflow runs automatically on your next push or pull request.

### Option 2 — Use the npm package to auto-copy workflows

```js
const growkudos = require('@jvzhu/growkudos');
const fs = require('fs');
const path = require('path');

// List all available workflows
console.log(growkudos.listWorkflows());

// Get all free SAST tools
const freeSast = growkudos.getWorkflowsByCategory('sast');
// Filter to free-only
const free = growkudos.getFreeWorkflows();

// Copy the Semgrep workflow into your project
const content = growkudos.getWorkflowContent('semgrep');
fs.mkdirSync('.github/workflows', { recursive: true });
fs.writeFileSync('.github/workflows/semgrep.yml', content);
console.log('Semgrep workflow installed!');
```

See [npm-USAGE.md](npm-USAGE.md) and [examples/npm-usage.js](examples/npm-usage.js) for more examples.

### Option 3 — Start with a pre-built combination

Copy one of the example workflows from the [`examples/`](examples/) directory:

| Example | Description |
|---------|-------------|
| [`examples/basic-setup.yml`](examples/basic-setup.yml) | Single-tool setup (CodeQL) |
| [`examples/comprehensive-setup.yml`](examples/comprehensive-setup.yml) | Full multi-tool pipeline |
| [`examples/python-project.yml`](examples/python-project.yml) | Python-optimised stack |
| [`examples/nodejs-project.yml`](examples/nodejs-project.yml) | Node.js-optimised stack |

---

## Tool Matrix

| Workflow File | Tool | Category | Languages | Free | SARIF Upload |
|--------------|------|----------|-----------|------|--------------|
| `bandit.yml` | Bandit | SAST | Python | ✅ | ✅ |
| `codeql.yml` | CodeQL | SAST | Multi | ✅ | ✅ |
| `semgrep.yml` | Semgrep | SAST | Multi | ✅ | ✅ |
| `devskim.yml` | DevSkim | SAST | Multi | ✅ | ✅ |
| `pyre.yml` | Pyre | SAST | Python | ✅ | ✅ |
| `pysa.yml` | Pysa | SAST | Python | ✅ | ✅ |
| `pylint.yml` | Pylint | SAST | Python | ✅ | ✅ |
| `ossar.yml` | OSSAR | SAST | Multi | ✅ | ✅ |
| `checkmarx.yml` | Checkmarx | SAST | Multi | ❌ | ✅ |
| `checkmarx-one.yml` | Checkmarx One | SAST | Multi | ❌ | ✅ |
| `fortify.yml` | Fortify | SAST | Multi | ❌ | ✅ |
| `jfrog-sast.yml` | JFrog SAST | SAST | Multi | ❌ | ✅ |
| `neuralegion.yml` | NeuraLegion (Bright) | DAST | Multi | ❌ | ✅ |
| `mayhem-for-api.yml` | Mayhem for API | DAST | Multi | ❌ | ✅ |
| `stackhawk.yml` | StackHawk | DAST | Multi | ❌ | ✅ |
| `apisec-scan.yml` | APIsec Scan | DAST | Multi | ❌ | ✅ |
| `ethicalcheck.yml` | EthicalCheck | DAST | Multi | ❌ | ✅ |
| `dependency-review.yml` | Dependency Review | SCA | Multi | ✅ | ✅ |
| `osv-scanner.yml` | OSV Scanner | SCA | Multi | ✅ | ✅ |
| `snyk-security.yml` | Snyk Security | SCA | Multi | ❌ | ✅ |
| `debricked.yml` | Debricked | SCA | Multi | ❌ | ✅ |
| `crda.yml` | CRDA | SCA | Multi | ✅ | ✅ |
| `endorlabs.yml` | Endor Labs | SCA | Multi | ❌ | ✅ |
| `frogbot-scan-pr.yml` | Frogbot Scan PR | SCA | Multi | ❌ | ✅ |
| `frogbot-scan-and-fix.yml` | Frogbot Scan & Fix | SCA | Multi | ❌ | ✅ |
| `sysdig-scan.yml` | Sysdig Secure | Container | Docker | ❌ | ✅ |
| `black-duck-security-scan-ci.yml` | Black Duck | Container | Multi | ❌ | ✅ |
| `policy-validator-cfn.yml` | Policy Validator (CFN) | IaC | CloudFormation | ✅ | ✅ |
| `policy-validator-tf.yml` | Policy Validator (TF) | IaC | Terraform | ✅ | ✅ |
| `veracode.yml` | Veracode | Enterprise | Multi | ❌ | ✅ |
| `synopsys-action.yml` | Synopsys Action | Enterprise | Multi | ❌ | ✅ |
| `synopsys-io.yml` | Synopsys IO | Enterprise | Multi | ❌ | ✅ |
| `defender-for-devops.yml` | Defender for DevOps | Enterprise | Multi | ❌ | ✅ |
| `codacy.yml` | Codacy | Quality | Multi | ❌ | ✅ |
| `generator-generic-ossf-slsa3-publish.yml` | SLSA Publisher | Supply Chain | Multi | ✅ | ✅ |

---

## Categories

### SAST — Static Analysis

Static Application Security Testing analyses source code without executing it. It identifies insecure coding patterns, hardcoded secrets, injection vulnerabilities, and more at development time — before code ever reaches production.

**Included tools:**

- **Bandit** — Python-specific, lightweight, highly configurable. Perfect for any Python project.
- **CodeQL** — GitHub's own semantic analysis engine. Supports many languages, free for public repos.
- **Semgrep** — Pattern-based analysis with a huge community rule library. Very fast.
- **DevSkim** — Microsoft's multi-language linter with IDE integrations.
- **Pyre / Pysa** — Facebook/Meta's Python type-checker and taint analysis pair.
- **Pylint** — Code quality and error detection for Python.
- **OSSAR** — Runs multiple open-source analysers (Credscan, ESLint, Template Analyzer, etc.) in one step.
- **Checkmarx / Checkmarx One** — Enterprise-grade SAST for large organisations (paid).
- **Fortify** — Micro Focus enterprise SAST (paid).
- **JFrog SAST** — Part of JFrog Advanced Security (paid).

### DAST — Dynamic Analysis

Dynamic Application Security Testing probes a running application from the outside, simulating real attacker behaviour against live HTTP endpoints, APIs, and web interfaces.

**Included tools:**

- **NeuraLegion (Bright)** — AI-powered DAST with zero false-positives claim.
- **Mayhem for API** — Fuzz-based API security testing.
- **StackHawk** — Developer-friendly DAST that integrates tightly with CI/CD.
- **APIsec Scan** — Automated API security compliance testing.
- **EthicalCheck** — Zero-config API fuzzing.

> **Tip:** DAST requires a running instance of your application. Use GitHub Actions `services:` or deploy to a staging environment before running DAST workflows.

### SCA — Dependency Scanning

Software Composition Analysis identifies known vulnerabilities in third-party open-source dependencies. It cross-references your dependency tree against databases such as NVD, OSV, and GitHub Advisory Database.

**Included tools:**

- **Dependency Review** — Built into GitHub, free, runs on pull requests.
- **OSV Scanner** — Google's scanner backed by the OSV database.
- **Snyk Security** — Industry-leading SCA with auto-fix PRs (paid tiers available).
- **Debricked** — SCA with license compliance tracking.
- **CRDA** — Red Hat's dependency analytics, strong for Java/Maven and Node.js.
- **Endor Labs** — Focuses on reachability to reduce alert noise.
- **Frogbot Scan PR / Frogbot Scan & Fix** — JFrog's bot that scans and auto-remediates.

### Container Security

Container scanning checks Docker images for OS-level vulnerabilities and misconfigurations in image layers before deployment.

**Included tools:**

- **Sysdig Secure** — Runtime and image scanning with policy enforcement.
- **Black Duck** — Synopsys's comprehensive open-source auditing and container scanning.

### Infrastructure as Code (IaC)

IaC security scanning validates that cloud infrastructure definitions (Terraform, CloudFormation, etc.) comply with security and policy requirements before deployment.

**Included tools:**

- **Policy Validator (CloudFormation)** — Validates AWS IAM policies in CloudFormation templates against AWS Identity policies.
- **Policy Validator (Terraform)** — Same validation for Terraform HCL configurations.

### Enterprise Platforms

Full-featured application security platforms that combine SAST, DAST, SCA, and more under a single pane of glass.

**Included tools:**

- **Veracode** — Cloud-based enterprise AppSec platform with policy management.
- **Synopsys Action** — Polaris / Coverity integration for enterprise security testing.
- **Synopsys IO** — Intelligent Orchestration to select and run the right security tools.
- **Microsoft Defender for DevOps** — Integrates Azure security findings into GitHub Security tab.

### Supply Chain Security

Workflows to strengthen trust in your software supply chain through provenance, attestations, and signed releases.

**Included tools:**

- **SLSA Generic Publisher** — Generates SLSA Level 3 provenance for build artifacts, signed with Sigstore.

### Code Quality

- **Codacy** — Automated code quality reviews with security rules and technical debt tracking.

---

## npm Package Usage

```js
const growkudos = require('@jvzhu/growkudos');

// List all workflow IDs
growkudos.listWorkflows();
// => ['bandit', 'codeql', 'semgrep', ...]

// Get all categories
growkudos.getCategories();
// => ['sast', 'dast', 'sca', 'container', 'iac', 'enterprise', 'supply-chain', 'quality']

// Get workflows by category
const sastWorkflows = growkudos.getWorkflowsByCategory('sast');

// Get free workflows only
const free = growkudos.getFreeWorkflows();

// Get workflows that support Python
const pythonWorkflows = growkudos.getWorkflowsByLanguage('python');

// Read a workflow's YAML content
const yaml = growkudos.getWorkflowContent('semgrep');

// Get the absolute path to a workflow file
const filePath = growkudos.getWorkflowPath('codeql');
```

See [npm-USAGE.md](npm-USAGE.md) for a complete API reference and [examples/npm-usage.js](examples/npm-usage.js) for runnable examples.

---

## Use Cases

### Startup / Small Team (Free Tools Only)

Recommended stack:
1. **CodeQL** — Deep SAST on every push/PR (free for public repos).
2. **Semgrep** — Additional pattern-based SAST rules.
3. **Dependency Review** — Block vulnerable dependencies in PRs.
4. **OSV Scanner** — Scheduled dependency vulnerability sweeps.
5. **Bandit** (if Python) — Python-specific security linting.

Total cost: **$0**.

### Mid-Size Engineering Team

Add on top of the free stack:
- **Snyk Security** — Richer SCA with auto-fix pull requests.
- **StackHawk** — Automated DAST against staging environments.
- **Codacy** — Code quality gates enforced on every PR.

### Enterprise / Regulated Industries

Full coverage:
- **Checkmarx One** or **Fortify** for enterprise SAST.
- **Veracode** or **Synopsys** for comprehensive platform coverage.
- **Sysdig** for container runtime security.
- **Frogbot** for automated dependency remediation.
- **SLSA Publisher** for supply chain attestations.
- **Defender for DevOps** if you are in the Microsoft ecosystem.

### Python Projects

Recommended: `bandit.yml` + `pyre.yml` + `pysa.yml` + `dependency-review.yml` + `osv-scanner.yml`.  
See [`examples/python-project.yml`](examples/python-project.yml).

### Node.js / JavaScript Projects

Recommended: `codeql.yml` + `semgrep.yml` + `dependency-review.yml` + `snyk-security.yml`.  
See [`examples/nodejs-project.yml`](examples/nodejs-project.yml).

---

## Language Support

| Language | Recommended SAST | Recommended SCA |
|----------|-----------------|-----------------|
| Python | Bandit, Pyre, Pysa, Semgrep, CodeQL | OSV Scanner, Dependency Review |
| JavaScript / TypeScript | CodeQL, Semgrep, DevSkim | Dependency Review, Snyk, OSV Scanner |
| Java | CodeQL, Semgrep, Checkmarx | CRDA, Dependency Review |
| Go | CodeQL, Semgrep | OSV Scanner, Dependency Review |
| Ruby | CodeQL, Semgrep | Dependency Review, Snyk |
| C / C++ | CodeQL, Fortify | OSV Scanner |
| C# | CodeQL, Fortify, DevSkim | Dependency Review, Snyk |
| PHP | Semgrep | Dependency Review |
| Kotlin / Scala | Semgrep, Checkmarx | Dependency Review |
| Terraform | Policy Validator (TF) | — |
| CloudFormation | Policy Validator (CFN) | — |
| Docker | Sysdig, Black Duck | — |

---

## Free vs. Paid Tools

### Free / Open-Source

| Tool | License | Notes |
|------|---------|-------|
| Bandit | Apache-2.0 | Fully open-source |
| CodeQL | GitHub-owned | Free for public repos; paid for private |
| Semgrep | LGPL-2.1 (OSS rules) | Community rules free; Pro rules paid |
| DevSkim | MIT | Fully open-source |
| Pyre / Pysa | MIT | Fully open-source |
| Pylint | GPL-2.0 | Fully open-source |
| OSSAR | MIT | Microsoft open-source |
| Dependency Review | MIT | GitHub built-in |
| OSV Scanner | Apache-2.0 | Google open-source |
| CRDA | Apache-2.0 | Red Hat open-source |
| Policy Validator (CFN/TF) | Apache-2.0 | AWS open-source |
| SLSA Publisher | Apache-2.0 | OSSF open-source |

### Paid / Commercial (free tier may exist)

Checkmarx, Fortify, JFrog SAST, NeuraLegion, Mayhem for API, StackHawk, APIsec, EthicalCheck, Snyk (paid tiers), Debricked, Endor Labs, Frogbot (paid features), Sysdig, Black Duck, Veracode, Synopsys, Codacy, Defender for DevOps.

---

## Documentation

| Document | Description |
|----------|-------------|
| [GETTING_STARTED.md](GETTING_STARTED.md) | Step-by-step setup guide |
| [TOOLS_GUIDE.md](TOOLS_GUIDE.md) | Detailed guide for each tool |
| [COMPARISON_MATRIX.md](COMPARISON_MATRIX.md) | Side-by-side tool comparison |
| [npm-USAGE.md](npm-USAGE.md) | npm package API reference |
| [BEST_PRACTICES.md](BEST_PRACTICES.md) | Security scanning best practices |
| [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) | CI/CD optimization tips |
| [TOOLS.md](TOOLS.md) | Complete tool registry |
| [FAQ.md](FAQ.md) | Frequently asked questions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Adding new workflow templates
- Improving existing workflows
- Updating documentation
- Reporting issues

Before submitting a pull request, please check our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

[MIT](LICENSE) © [jvzhu](https://github.com/jvzhu)

The workflow templates themselves may invoke third-party tools that have their own licensing terms. See [TOOLS_GUIDE.md](TOOLS_GUIDE.md) for individual tool licenses.

---

## Acknowledgements

GrowKudos aggregates workflows from the official GitHub Actions Marketplace and the respective tool vendors. All trademarks belong to their respective owners.

---

*Made with ❤️ for the DevSecOps community.*