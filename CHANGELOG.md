# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-02

### Added

#### npm Package
- `package.json` — Scoped npm package `@jvzhu/growkudos` configured for GitHub Packages
- `index.js` — Main entry point with workflow metadata and helper functions:
  - `WORKFLOWS` — Complete metadata for all 35 workflows
  - `listWorkflows()` — List all workflow IDs
  - `getCategories()` — List all categories
  - `getWorkflowsByCategory(category)` — Filter by category
  - `getWorkflowsByLanguage(language)` — Filter by language support
  - `getFreeWorkflows()` — Get free/open-source tools only
  - `getWorkflowPath(id)` — Get absolute path to a workflow file
  - `getWorkflowContent(id)` — Read workflow YAML content
- `.npmrc` — GitHub Packages registry configuration
- `.github/workflows/npm-publish.yml` — Automated publishing workflow

#### Security Scanning Workflows (35 total)
- **SAST (12 workflows):** Bandit, CodeQL, Semgrep, DevSkim, Pyre, Pysa, Pylint, OSSAR, Checkmarx, Checkmarx One, Fortify, JFrog SAST
- **DAST (5 workflows):** NeuraLegion, Mayhem for API, StackHawk, APIsec Scan, EthicalCheck
- **SCA (7 workflows):** Dependency Review, OSV Scanner, Snyk, Debricked, CRDA, Endor Labs, Frogbot (×2)
- **Container Security (2 workflows):** Sysdig, Black Duck
- **IaC (2 workflows):** Policy Validator for CloudFormation, Policy Validator for Terraform
- **Enterprise (4 workflows):** Veracode, Synopsys Action, Synopsys IO, Defender for DevOps
- **Supply Chain (1 workflow):** SLSA Generic Publisher
- **Code Quality (1 workflow):** Codacy

#### Documentation
- `README.md` — Comprehensive 3,000+ word guide with tool matrix, categories, use cases, and language support
- `GETTING_STARTED.md` — Step-by-step setup guide
- `TOOLS_GUIDE.md` — Detailed documentation for every tool
- `COMPARISON_MATRIX.md` — Side-by-side tool comparison tables
- `npm-USAGE.md` — Complete npm package API reference
- `TOOLS.md` — Complete tool registry
- `FAQ.md` — Frequently asked questions
- `BEST_PRACTICES.md` — Security scanning best practices
- `PERFORMANCE_GUIDE.md` — CI/CD performance optimization tips
- `CHANGELOG.md` — This file

#### Community Standards
- `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1
- `CONTRIBUTING.md` — Contribution guidelines including npm contribution guidelines
- `LICENSE` — MIT License
- `.editorconfig` — Consistent editor configuration

#### Templates
- `.github/ISSUE_TEMPLATE/bug_report.md` — Bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md` — Feature request template
- `.github/PULL_REQUEST_TEMPLATE.md` — Pull request template

#### Examples
- `examples/basic-setup.yml` — CodeQL single-tool setup
- `examples/comprehensive-setup.yml` — Full multi-tool DevSecOps pipeline
- `examples/python-project.yml` — Python-optimised security stack
- `examples/nodejs-project.yml` — Node.js-optimised security stack
- `examples/npm-usage.js` — JavaScript example using the npm package

---

## [Unreleased]

### Planned
- Add Trivy container scanning workflow
- Add Grype vulnerability scanner workflow
- Add Checkov IaC scanning workflow
- Add KICS (Keeping Infrastructure as Code Secure) workflow
- Add Gitleaks secrets scanning workflow
- Improve CI performance with caching examples

[1.0.0]: https://github.com/jvzhu/GrowKudos/releases/tag/v1.0.0
[Unreleased]: https://github.com/jvzhu/GrowKudos/compare/v1.0.0...HEAD
