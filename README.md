# 🔒 GrowKudos — Comprehensive GitHub Actions Security Scanning Workflows

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Security%20Workflows-blue)](https://github.com/features/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **The most comprehensive collection of ready-to-use GitHub Actions workflows for application security scanning, code quality, and vulnerability management.**

GrowKudos provides **42+ battle-tested GitHub Actions workflow templates** covering every major security scanning category — from static analysis and dependency auditing to container security and API fuzzing. Copy, customize, and integrate them into any project within minutes.

---

## 📋 Table of Contents

- [Why GrowKudos?](#-why-growkudos)
- [Tool Categories at a Glance](#-tool-categories-at-a-glance)
- [Complete Tool Matrix](#-complete-tool-matrix)
- [Quick Start](#-quick-start)
- [Workflows Reference](#-workflows-reference)
- [Integration Guide](#-integration-guide)
- [Choosing the Right Tool](#-choosing-the-right-tool)
- [Examples](#-examples)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Why GrowKudos?

Setting up application security scanning from scratch is time-consuming. Each tool has unique configuration requirements, action versions, secret names, and output formats. **GrowKudos eliminates this friction** by providing production-ready workflow templates you can drop into any repository.

### Key Benefits

| Benefit | Description |
|---------|-------------|
| ⚡ **Fast Setup** | Copy a workflow file and go — no configuration hunting |
| 🔧 **Battle-Tested** | Templates follow official documentation and best practices |
| 📊 **SARIF Integration** | Most tools output SARIF for unified GitHub Security tab results |
| 🔓 **Free & Open Source** | MIT licensed, community-maintained |
| 🌍 **Language Agnostic** | Tools for Python, JavaScript, Java, Go, containers, and more |
| 📈 **Scalable** | Use one tool or all 42+ depending on your security posture needs |

### Security Scanning Categories Covered

```
✅ SAST (Static Application Security Testing)
✅ DAST (Dynamic Application Security Testing)
✅ SCA (Software Composition Analysis / Dependency Scanning)
✅ Container & Image Security
✅ API Security Testing
✅ Infrastructure as Code (IaC) Security
✅ Secret Detection
✅ Fuzz Testing
✅ Code Quality
✅ Supply Chain Security (SLSA)
```

---

## 🗂️ Tool Categories at a Glance

### Static Application Security Testing (SAST)
Tools that analyze source code for security vulnerabilities without executing it.

| Workflow | Tool | Language Support | Free Tier |
|----------|------|-----------------|-----------|
| `bandit.yml` | Bandit | Python | ✅ Open Source |
| `pyre.yml` | Pyre | Python | ✅ Open Source |
| `pysa.yml` | Pysa | Python | ✅ Open Source |
| `semgrep.yml` | Semgrep | 30+ languages | ✅ Free tier |
| `devskim.yml` | DevSkim | Multi-language | ✅ Open Source |
| `codeql.yml` | CodeQL | 10+ languages | ✅ Free for public repos |
| `checkmarx.yml` | Checkmarx | Multi-language | 💰 Commercial |
| `checkmarx-one.yml` | Checkmarx One | Multi-language | 💰 Commercial |
| `fortify.yml` | Fortify | Multi-language | 💰 Commercial |
| `jfrog-sast.yml` | JFrog SAST | Multi-language | 💰 Commercial |
| `veracode.yml` | Veracode | Multi-language | 💰 Commercial |
| `ossar.yml` | OSSAR | Multi-language | ✅ Free |

### Software Composition Analysis (SCA) / Dependency Scanning
Tools that scan third-party dependencies for known vulnerabilities.

| Workflow | Tool | Language Support | Free Tier |
|----------|------|-----------------|-----------|
| `dependency-review.yml` | GitHub Dependency Review | All | ✅ Free (GitHub) |
| `osv-scanner.yml` | OSV Scanner | Multi-language | ✅ Open Source |
| `snyk-security.yml` | Snyk | Multi-language | ✅ Free tier |
| `debricked.yml` | Debricked | Multi-language | ✅ Free tier |
| `crda.yml` | CRDA | Java, Node.js, Python, Go | ✅ Free |
| `endorlabs.yml` | Endor Labs | Multi-language | 💰 Commercial |
| `synopsys-action.yml` | Synopsys | Multi-language | 💰 Commercial |
| `synopsys-io.yml` | Synopsys IO | Multi-language | 💰 Commercial |
| `black-duck-security-scan-ci.yml` | Black Duck | Multi-language | 💰 Commercial |
| `frogbot-scan-and-fix.yml` | Frogbot | Multi-language | ✅ Free tier |
| `frogbot-scan-pr.yml` | Frogbot PR | Multi-language | ✅ Free tier |

### Dynamic Application Security Testing (DAST)
Tools that test running applications by simulating attacks.

| Workflow | Tool | Protocol | Free Tier |
|----------|------|----------|-----------|
| `stackhawk.yml` | StackHawk | REST/GraphQL APIs | ✅ Free tier |
| `apisec-scan.yml` | APIsec | REST APIs | ✅ Free tier |
| `neuralegion.yml` | NeuraLegion (Bright) | REST/GraphQL | ✅ Free tier |
| `ethicalcheck.yml` | EthicalCheck | REST APIs | ✅ Free tier |
| `mayhem-for-api.yml` | Mayhem for API | REST APIs | 💰 Commercial |

### Container & Image Security
Tools that scan Docker images and container configurations.

| Workflow | Tool | Target | Free Tier |
|----------|------|--------|-----------|
| `sysdig-scan.yml` | Sysdig | Container images | 💰 Commercial |
| `black-duck-security-scan-ci.yml` | Black Duck | Containers | 💰 Commercial |

### Infrastructure as Code (IaC) Security
Tools that validate and secure infrastructure definitions.

| Workflow | Tool | IaC Type | Free Tier |
|----------|------|----------|-----------|
| `policy-validator-cfn.yml` | AWS CloudFormation Policy Validator | CloudFormation | ✅ Free (AWS) |
| `policy-validator-tf.yml` | AWS Terraform Policy Validator | Terraform | ✅ Free (AWS) |

### Code Quality
| Workflow | Tool | Languages | Free Tier |
|----------|------|-----------|-----------|
| `codacy.yml` | Codacy | Multi-language | ✅ Free for public repos |
| `pylint.yml` | Pylint | Python | ✅ Open Source |

### Supply Chain Security
| Workflow | Tool | Purpose | Free Tier |
|----------|------|---------|-----------|
| `generator-generic-ossf-slsa3-publish.yml` | OSSF SLSA | Build provenance | ✅ Free |

### Microsoft Security
| Workflow | Tool | Purpose | Free Tier |
|----------|------|---------|-----------|
| `defender-for-devops.yml` | Microsoft Defender for DevOps | Multi-category scan | 💰 Commercial |

### Fuzz Testing
| Workflow | Tool | Purpose | Free Tier |
|----------|------|---------|-----------|
| `mayhem-for-api.yml` | Mayhem | API fuzzing | 💰 Commercial |

### CI/CD & Deployment (Python-focused)
| Workflow | Purpose |
|----------|---------|
| `python-app.yml` | Build and test Python app |
| `python-package.yml` | Build and test Python package |
| `python-publish.yml` | Publish to PyPI |
| `python-package-conda.yml` | Build with Conda |
| `django.yml` | Django app CI |
| `azure-webapps-python.yml` | Deploy to Azure Web Apps |
| `azure-functions-app-python.yml` | Deploy to Azure Functions |

---

## 📊 Complete Tool Matrix

| Tool | Category | Languages | SARIF | Free | Secrets Required |
|------|----------|-----------|-------|------|-----------------|
| Bandit | SAST | Python | ✅ | ✅ | None |
| CodeQL | SAST | 10+ | ✅ | ✅ | None |
| Semgrep | SAST | 30+ | ✅ | ✅ | `SEMGREP_APP_TOKEN` (optional) |
| Pyre / Pysa | SAST | Python | ✅ | ✅ | None |
| DevSkim | SAST | Multi | ✅ | ✅ | None |
| OSSAR | SAST | Multi | ✅ | ✅ | None |
| Checkmarx | SAST | Multi | ✅ | ❌ | `CHECKMARX_*` |
| Checkmarx One | SAST | Multi | ✅ | ❌ | `CHECKMARX_*` |
| Fortify | SAST | Multi | ✅ | ❌ | `FOD_*` or `SSC_*` |
| JFrog SAST | SAST | Multi | ✅ | ❌ | `JF_URL`, `JF_ACCESS_TOKEN` |
| Veracode | SAST | Multi | ✅ | ❌ | `VERACODE_API_ID`, `VERACODE_API_KEY` |
| Dependency Review | SCA | All | ✅ | ✅ | None |
| OSV Scanner | SCA | Multi | ✅ | ✅ | None |
| Snyk | SCA/SAST | Multi | ✅ | ✅ | `SNYK_TOKEN` |
| Debricked | SCA | Multi | — | ✅ | `DEBRICKED_TOKEN` |
| CRDA | SCA | Java/Node/Python/Go | — | ✅ | `CRDA_KEY` |
| Endor Labs | SCA | Multi | ✅ | ❌ | `ENDOR_*` |
| Synopsys | SCA/SAST | Multi | — | ❌ | `BRIDGE_*` |
| Black Duck | SCA | Multi | — | ❌ | `BLACKDUCK_API_TOKEN` |
| Frogbot | SCA | Multi | — | ✅ | `JF_*` |
| StackHawk | DAST | REST/GraphQL | ✅ | ✅ | `HAWK_API_KEY` |
| APIsec | DAST | REST | — | ✅ | `APISEC_*` |
| NeuraLegion | DAST | REST/GraphQL | — | ✅ | `BRIGHT_TOKEN` |
| EthicalCheck | DAST | REST | — | ✅ | `ETHICALCHECK_*` |
| Mayhem for API | DAST/Fuzz | REST | ✅ | ❌ | `MAYHEM_TOKEN` |
| Sysdig | Container | Docker | ✅ | ❌ | `SYSDIG_SECURE_TOKEN` |
| AWS CFN Validator | IaC | CloudFormation | ✅ | ✅ | AWS credentials |
| AWS TF Validator | IaC | Terraform | ✅ | ✅ | AWS credentials |
| Codacy | Quality | Multi | ✅ | ✅ | `CODACY_PROJECT_TOKEN` |
| Pylint | Quality | Python | — | ✅ | None |
| OSSF SLSA | Supply Chain | All | — | ✅ | None |
| Defender for DevOps | Multi | Multi | ✅ | ❌ | Azure credentials |

---

## ⚡ Quick Start

### Option 1: Single Tool (Recommended for Beginners)

Pick the tool that matches your primary concern and copy the workflow to your repository:

```bash
# Example: Add Bandit (Python SAST) to your project
mkdir -p .github/workflows
curl -o .github/workflows/bandit.yml \
  https://raw.githubusercontent.com/jvzhu/GrowKudos/main/.github/workflows/bandit.yml
```

### Option 2: Copy Multiple Workflows

```bash
# Clone the repo
git clone https://github.com/jvzhu/GrowKudos.git

# Copy workflows to your project
cp GrowKudos/.github/workflows/bandit.yml your-project/.github/workflows/
cp GrowKudos/.github/workflows/dependency-review.yml your-project/.github/workflows/
cp GrowKudos/.github/workflows/codeql.yml your-project/.github/workflows/
```

### Option 3: Start from an Example

See the [`examples/`](examples/) directory for complete CI/CD setups:

| Example | Description |
|---------|-------------|
| [`examples/basic-setup.yml`](examples/basic-setup.yml) | Single SAST tool (CodeQL) |
| [`examples/comprehensive-setup.yml`](examples/comprehensive-setup.yml) | All recommended tools |
| [`examples/selective-setup.yml`](examples/selective-setup.yml) | Choose by category |
| [`examples/python-project.yml`](examples/python-project.yml) | Python-optimized stack |
| [`examples/nodejs-project.yml`](examples/nodejs-project.yml) | Node.js-optimized stack |

### Option 4: Install as an npm Package

GrowKudos is also available as an npm package to programmatically query and copy workflows:

```bash
# Authenticate (one-time)
npm login --scope=@jvzhu --auth-type=legacy --registry=https://npm.pkg.github.com

# Install
npm install @jvzhu/growkudos
```

```js
const growkudos = require('@jvzhu/growkudos');
const fs = require('fs');

// List all available workflows
console.log(growkudos.listWorkflows());

// Copy a specific workflow into your project
const content = growkudos.getWorkflowContent('semgrep');
fs.mkdirSync('.github/workflows', { recursive: true });
fs.writeFileSync('.github/workflows/semgrep.yml', content);
```

See [npm-USAGE.md](npm-USAGE.md) and [examples/npm-usage.js](examples/npm-usage.js) for the full API reference.

---

## 📁 Workflows Reference

### SAST Workflows

#### `bandit.yml` — Bandit Python Security Linter
**Best for:** Python projects needing fast, zero-configuration security scanning.
- Scans for common security issues in Python code
- Outputs SARIF to GitHub Security tab
- No secrets required
- Triggers on push, PR, and weekly schedule

#### `codeql.yml` — GitHub CodeQL
**Best for:** Comprehensive semantic code analysis across multiple languages.
- Supports C, C++, C#, Java, JavaScript, TypeScript, Python, Ruby, Go, Swift
- Deep data-flow analysis finds complex vulnerabilities
- Free for public repositories
- Integrates natively with GitHub Security tab

#### `semgrep.yml` — Semgrep
**Best for:** Fast, customizable pattern-based scanning with a huge rule library.
- 3,000+ community rules covering OWASP Top 10 and more
- Supports 30+ languages
- Optional cloud dashboard with `SEMGREP_APP_TOKEN`
- Great for enforcing custom coding standards

#### `devskim.yml` — DevSkim
**Best for:** Lightweight security analysis built into Microsoft's security toolchain.
- IDE-quality security checks as a CI gate
- Multi-language support
- Fast execution suitable for every commit

#### `pyre.yml` / `pysa.yml` — Pyre & Pysa (Meta/Facebook)
**Best for:** Python type-checking (Pyre) and taint analysis (Pysa).
- Pysa (Python Static Analyzer) traces data flows to find injection vulnerabilities
- Pyre provides fast incremental type checking
- Open source from Meta

#### `checkmarx.yml` / `checkmarx-one.yml` — Checkmarx
**Best for:** Enterprise-grade SAST with deep vulnerability analysis.
- Supports 35+ languages
- CxSAST (on-premise) and Checkmarx One (cloud) variants included
- Requires commercial license and `CHECKMARX_*` secrets

#### `fortify.yml` — Fortify by OpenText
**Best for:** Comprehensive enterprise SAST with compliance reporting.
- Supports Fortify on Demand (FoD) and Software Security Center (SSC)
- Strong compliance mapping (PCI-DSS, HIPAA, SOC 2)
- Requires `FOD_URL`, `FOD_API_KEY`, or `SSC_*` secrets

#### `veracode.yml` — Veracode
**Best for:** Enterprise security with integrated remediation guidance.
- Policy-based security gates
- Developer-friendly remediation guidance
- Requires `VERACODE_API_ID` and `VERACODE_API_KEY`

### SCA / Dependency Scanning Workflows

#### `dependency-review.yml` — GitHub Dependency Review
**Best for:** Fast, built-in dependency vulnerability scanning for any repository.
- Checks PRs for newly introduced vulnerable dependencies
- No setup or secrets required
- Integrates with GitHub Advisory Database

#### `osv-scanner.yml` — OSV Scanner (Google)
**Best for:** Open source vulnerability scanning using the OSV database.
- Covers packages from npm, PyPI, Maven, RubyGems, Go, Cargo, and more
- Open source, no account required
- Outputs SARIF

#### `snyk-security.yml` — Snyk
**Best for:** Developer-friendly SCA with fix suggestions and IDE integration.
- Scans dependencies AND container images
- Provides automated fix PRs
- Free tier available; requires `SNYK_TOKEN`

#### `debricked.yml` — Debricked
**Best for:** Automated open-source compliance and vulnerability management.
- License compliance checking alongside vulnerabilities
- Supports 11+ languages
- Requires `DEBRICKED_TOKEN`

#### `crda.yml` — CRDA (Red Hat Code Ready Dependency Analytics)
**Best for:** Java, Node.js, Python, and Go dependency scanning with CVE data.
- Powered by Snyk + Red Hat data
- Requires `CRDA_KEY`

#### `frogbot-scan-and-fix.yml` / `frogbot-scan-pr.yml` — Frogbot (JFrog)
**Best for:** Automated dependency fix PRs and security gate on pull requests.
- Scans PRs for vulnerable dependencies
- Can automatically create fix pull requests
- Requires `JF_URL` and `JF_ACCESS_TOKEN`

### DAST Workflows

#### `stackhawk.yml` — StackHawk
**Best for:** REST and GraphQL API security testing with a developer-first experience.
- Scans running application for OWASP API Top 10 vulnerabilities
- Easy YAML configuration
- Requires `HAWK_API_KEY` and a running application URL

#### `apisec-scan.yml` — APIsec
**Best for:** Continuous, automated API security testing.
- Generates test cases from OpenAPI specs
- Requires `APISEC_*` secrets and account

#### `neuralegion.yml` — NeuraLegion (Bright Security)
**Best for:** AI-powered DAST for modern web apps and APIs.
- Low false-positive rate
- Supports REST, GraphQL, SOAP
- Requires `BRIGHT_TOKEN`

#### `ethicalcheck.yml` — EthicalCheck
**Best for:** Quick API security checks without a running target.
- Tests public APIs or mock servers
- Requires `ETHICALCHECK_*` secrets

### Infrastructure as Code Workflows

#### `policy-validator-cfn.yml` — AWS CloudFormation Policy Validator
**Best for:** Validating IAM policies in CloudFormation templates against AWS best practices.
- Checks for overly permissive IAM policies
- Requires AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

#### `policy-validator-tf.yml` — AWS Terraform Policy Validator
**Best for:** Validating IAM policies in Terraform configurations.
- Same policy checks as CFN validator but for Terraform
- Requires AWS credentials

### Code Quality Workflows

#### `codacy.yml` — Codacy
**Best for:** Comprehensive code quality and security analysis with a dashboard.
- Tracks code quality over time
- Supports 40+ languages
- Requires `CODACY_PROJECT_TOKEN`

#### `pylint.yml` — Pylint
**Best for:** Python code quality, style, and basic security checks.
- Checks for code smells, bugs, and style violations
- Open source, no secrets required

### Supply Chain Security

#### `generator-generic-ossf-slsa3-publish.yml` — OSSF SLSA Generator
**Best for:** Generating SLSA Level 3 build provenance for software supply chain integrity.
- Creates cryptographically signed build attestations
- Follows OSSF Supply Chain Levels for Software Artifacts standard

---

## 🔧 Integration Guide

### Adding Secrets for Commercial Tools

Most commercial tools require API keys stored as GitHub Secrets:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the secret name and value

Common secrets needed:

```
SNYK_TOKEN           - Snyk API token
DEBRICKED_TOKEN      - Debricked API token
CHECKMARX_URL        - Checkmarx server URL
CHECKMARX_USERNAME   - Checkmarx username
CHECKMARX_PASSWORD   - Checkmarx password
CODACY_PROJECT_TOKEN - Codacy project token
HAWK_API_KEY         - StackHawk API key
SYSDIG_SECURE_TOKEN  - Sysdig Secure API token
VERACODE_API_ID      - Veracode API identifier
VERACODE_API_KEY     - Veracode API key
```

### Customizing Trigger Events

All workflows support GitHub's standard trigger events. Common patterns:

```yaml
on:
  push:
    branches: [ "main" ]        # Scan on pushes to main
  pull_request:
    branches: [ "main" ]        # Scan PRs targeting main
  schedule:
    - cron: '0 6 * * 1'         # Weekly Monday scan
  workflow_dispatch:             # Manual trigger
```

### Controlling Scan Scope

Many workflows support path filters to skip unnecessary scans:

```yaml
on:
  push:
    paths:
      - '**.py'          # Only Python files
      - 'requirements*.txt'
    paths-ignore:
      - 'docs/**'
      - '*.md'
```

---

## 🎯 Choosing the Right Tool

### By Use Case

**"I need basic security scanning with no budget"**
→ Start with `codeql.yml` + `dependency-review.yml` + `osv-scanner.yml`

**"I have a Python project"**
→ `bandit.yml` + `pysa.yml` + `osv-scanner.yml` + `pylint.yml`

**"I need to scan APIs"**
→ `stackhawk.yml` (needs running app) or `apisec-scan.yml`

**"I need enterprise compliance reporting"**
→ `veracode.yml` or `fortify.yml` or `checkmarx-one.yml`

**"I want to check dependencies automatically on PRs"**
→ `dependency-review.yml` (always free) + `snyk-security.yml`

**"I'm using Docker/containers"**
→ `sysdig-scan.yml` or `snyk-security.yml` (with container scanning enabled)

**"I'm using Terraform or CloudFormation"**
→ `policy-validator-tf.yml` or `policy-validator-cfn.yml`

**"I want to secure my software supply chain"**
→ `generator-generic-ossf-slsa3-publish.yml` + `osv-scanner.yml`

### By Team Size

| Team Size | Recommended Stack |
|-----------|------------------|
| Solo / Small | CodeQL + Dependency Review + OSV Scanner |
| Medium | Above + Semgrep + Snyk + Codacy |
| Enterprise | Above + Checkmarx One or Veracode + Sysdig + SLSA |

### By Compliance Requirement

| Compliance | Key Tools |
|------------|-----------|
| SOC 2 | Veracode, Checkmarx, Fortify |
| PCI-DSS | Veracode, Fortify, Snyk |
| HIPAA | Veracode, Checkmarx |
| FedRAMP | Fortify, Veracode |
| OWASP Top 10 | CodeQL, Semgrep, StackHawk |

---

## 📂 Examples

See the [`examples/`](examples/) directory for real-world CI/CD setups:

- **[basic-setup.yml](examples/basic-setup.yml)**: Minimal, zero-configuration security scanning
- **[comprehensive-setup.yml](examples/comprehensive-setup.yml)**: Full security suite with all recommended free tools
- **[selective-setup.yml](examples/selective-setup.yml)**: Template showing how to pick specific tools
- **[python-project.yml](examples/python-project.yml)**: Optimized stack for Python applications
- **[nodejs-project.yml](examples/nodejs-project.yml)**: Optimized stack for Node.js applications

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [GETTING_STARTED.md](GETTING_STARTED.md) | Step-by-step setup guide for beginners |
| [TOOLS_GUIDE.md](TOOLS_GUIDE.md) | Detailed guide for each security tool category |
| [COMPARISON_MATRIX.md](COMPARISON_MATRIX.md) | Side-by-side tool comparison |
| [TOOLS.md](TOOLS.md) | Complete tool registry |
| [BEST_PRACTICES.md](BEST_PRACTICES.md) | Security scanning best practices |
| [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) | Tips for faster CI/CD pipelines |
| [FAQ.md](FAQ.md) | Frequently asked questions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [CHANGELOG.md](CHANGELOG.md) | Version history and roadmap |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community standards |
| [SECURITY.md](SECURITY.md) | Security policy and vulnerability reporting |

---

## 🤝 Contributing

Contributions are welcome! Whether you want to add a new security tool workflow, improve documentation, or fix a bug, see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution

1. Fork the repository
2. Create a feature branch: `git checkout -b add-new-tool-workflow`
3. Add or improve a workflow file
4. Commit and push: `git commit -m "feat: add XYZ security scanner workflow"`
5. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

Individual workflow templates may incorporate or reference tools with their own licensing. Review each tool's license before use in commercial projects.

---

## 🙏 Acknowledgments

GrowKudos aggregates and curates workflow templates based on official documentation from:
- [GitHub Actions](https://github.com/features/actions)
- [GitHub's starter workflows](https://github.com/actions/starter-workflows)
- Official documentation from each security tool vendor

---

## 📬 Support & Community

- 🐛 **Bug reports**: [Open an issue](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 **Feature requests**: [Request a feature](.github/ISSUE_TEMPLATE/feature_request.md)
- 📖 **Questions**: Check [FAQ.md](FAQ.md) first
- 🔒 **Security issues**: See [SECURITY.md](SECURITY.md)

---

*GrowKudos — Growing security, one kudos at a time. 🌱*
