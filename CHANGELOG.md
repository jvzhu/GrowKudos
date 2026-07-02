# Changelog

All notable changes to GrowKudos will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased][]

### Planned
- GitHub Pages documentation site
- Automated workflow version update bot
- Workflow validation CI pipeline
- Docker-focused workflow collection
- Kubernetes security scanning workflows
- Mobile application security workflows

---

## [1.0.0][] — 2026-06-27

### Added — Initial Release

**42 GitHub Actions Workflow Templates:**

#### SAST (Static Application Security Testing)
- `bandit.yml` — Bandit Python security linter
- `codeql.yml` — GitHub CodeQL semantic analysis
- `semgrep.yml` — Semgrep multi-language pattern scanner
- `pyre.yml` — Meta Pyre Python type checker
- `pysa.yml` — Meta Pysa Python taint analyzer
- `devskim.yml` — Microsoft DevSkim security analyzer
- `ossar.yml` — Microsoft OSSAR multi-tool runner
- `checkmarx.yml` — Checkmarx enterprise SAST
- `checkmarx-one.yml` — Checkmarx One cloud SAST
- `fortify.yml` — Fortify enterprise SAST
- `jfrog-sast.yml` — JFrog SAST scanner
- `veracode.yml` — Veracode comprehensive scanning

#### SCA (Software Composition Analysis)
- `dependency-review.yml` — GitHub Dependency Review
- `osv-scanner.yml` — Google OSV Scanner
- `snyk-security.yml` — Snyk SCA and container scanning
- `debricked.yml` — Debricked dependency management
- `crda.yml` — Red Hat CRDA dependency analytics
- `endorlabs.yml` — Endor Labs SCA
- `synopsys-action.yml` — Synopsys unified scanning
- `synopsys-io.yml` — Synopsys IO integration
- `black-duck-security-scan-ci.yml` — Synopsys Black Duck
- `frogbot-scan-and-fix.yml` — JFrog Frogbot auto-fix
- `frogbot-scan-pr.yml` — JFrog Frogbot PR scanning

#### DAST (Dynamic Application Security Testing)
- `stackhawk.yml` — StackHawk API security testing
- `apisec-scan.yml` — APIsec API security scanner
- `neuralegion.yml` — NeuraLegion (Bright) DAST
- `ethicalcheck.yml` — EthicalCheck API testing
- `mayhem-for-api.yml` — Mayhem API fuzzer

#### Container Security
- `sysdig-scan.yml` — Sysdig container image scanner

#### Infrastructure as Code
- `policy-validator-cfn.yml` — AWS CloudFormation validator
- `policy-validator-tf.yml` — AWS Terraform validator

#### Code Quality
- `codacy.yml` — Codacy code quality platform
- `pylint.yml` — Pylint Python linter

#### Supply Chain Security
- `generator-generic-ossf-slsa3-publish.yml` — OSSF SLSA Level 3

#### Microsoft Security
- `defender-for-devops.yml` — Microsoft Defender for DevOps

#### CI/CD & Deployment (Python)
- `python-app.yml` — Python application CI
- `python-package.yml` — Python package CI
- `python-publish.yml` — PyPI publishing
- `python-package-conda.yml` — Conda package CI
- `django.yml` — Django application CI
- `azure-webapps-python.yml` — Azure Web Apps deployment
- `azure-functions-app-python.yml` — Azure Functions deployment

**Documentation:**
- `README.md` — Comprehensive project overview with tool matrix
- `GETTING_STARTED.md` — Step-by-step beginner setup guide
- `TOOLS_GUIDE.md` — Detailed guide for each tool category
- `COMPARISON_MATRIX.md` — Side-by-side tool comparison
- `TOOLS.md` — Complete tool registry
- `BEST_PRACTICES.md` — Security scanning best practices
- `PERFORMANCE_GUIDE.md` — CI/CD optimization tips
- `FAQ.md` — Frequently asked questions
- `CONTRIBUTING.md` — Contribution guidelines
- `CODE_OF_CONDUCT.md` — Community standards
- `CHANGELOG.md` — This file
- `LICENSE` — MIT License
- `SECURITY.md` — Security policy

**GitHub Templates:**
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/PULL_REQUEST_TEMPLATE.md`

**Examples:**
- `examples/basic-setup.yml`
- `examples/comprehensive-setup.yml`
- `examples/selective-setup.yml`
- `examples/python-project.yml`
- `examples/nodejs-project.yml`

**Configuration:**
- `.editorconfig` — Code style consistency

---

## Roadmap

### v1.1.0 (Planned)
- [ ] Workflow version auto-update tooling
- [ ] Additional SAST tools (Bearer, Horusec)
- [ ] More container security workflows (Trivy, Grype)
- [ ] Kubernetes policy scanners (OPA, Kyverno)

### v1.2.0 (Planned)
- [ ] Secret detection workflows (Gitleaks, TruffleHog)
- [ ] License compliance workflows
- [ ] SBOM (Software Bill of Materials) generation workflows
- [ ] GitHub Pages documentation

### v2.0.0 (Future)
- [ ] Workflow composer tool (CLI to generate custom stacks)
- [ ] Integration test suite for all workflows
- [ ] Organization-level workflow templates
- [ ] Reusable workflow variants (`.github/workflows/reusable-*.yml`)

[Unreleased]: https://github.com/jvzhu/GrowKudos/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/jvzhu/GrowKudos/releases/tag/v1.0.0
