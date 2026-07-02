# GrowKudos Tool Registry

Complete registry of all security scanning tools included in GrowKudos.

---

## SAST — Static Application Security Testing

| ID | Name | File | Languages | Free | License |
|----|------|------|-----------|------|---------|
| `bandit` | Bandit | `bandit.yml` | Python | ✅ | Apache-2.0 |
| `codeql` | CodeQL | `codeql.yml` | Multi | ✅* | GitHub proprietary |
| `semgrep` | Semgrep | `semgrep.yml` | Multi | ✅ | LGPL-2.1 |
| `devskim` | DevSkim | `devskim.yml` | Multi | ✅ | MIT |
| `pyre` | Pyre | `pyre.yml` | Python | ✅ | MIT |
| `pysa` | Pysa | `pysa.yml` | Python | ✅ | MIT |
| `pylint` | Pylint | `pylint.yml` | Python | ✅ | GPL-2.0 |
| `ossar` | OSSAR | `ossar.yml` | Multi | ✅ | MIT |
| `checkmarx` | Checkmarx | `checkmarx.yml` | Multi | ❌ | Proprietary |
| `checkmarx-one` | Checkmarx One | `checkmarx-one.yml` | Multi | ❌ | Proprietary |
| `fortify` | Fortify | `fortify.yml` | Multi | ❌ | Proprietary |
| `jfrog-sast` | JFrog SAST | `jfrog-sast.yml` | Multi | ❌ | Proprietary |

*Free for public repositories; paid for private repositories via GitHub Advanced Security.

---

## DAST — Dynamic Application Security Testing

| ID | Name | File | Prerequisites | Free | License |
|----|------|------|--------------|------|---------|
| `neuralegion` | NeuraLegion (Bright) | `neuralegion.yml` | Running app endpoint; `BRIGHT_TOKEN` | ❌ | Proprietary |
| `mayhem-for-api` | Mayhem for API | `mayhem-for-api.yml` | OpenAPI spec; `MAYHEM_TOKEN` | ❌ | Proprietary |
| `stackhawk` | StackHawk | `stackhawk.yml` | `.stackhawk.yml`; `HAWK_API_KEY` | ❌ | Proprietary |
| `apisec-scan` | APIsec Scan | `apisec-scan.yml` | APIsec account | ❌ | Proprietary |
| `ethicalcheck` | EthicalCheck | `ethicalcheck.yml` | EthicalCheck account | ❌ | Proprietary |

---

## SCA — Software Composition Analysis

| ID | Name | File | Auto-fix PRs | Free | License |
|----|------|------|-------------|------|---------|
| `dependency-review` | Dependency Review | `dependency-review.yml` | ❌ | ✅ | MIT |
| `osv-scanner` | OSV Scanner | `osv-scanner.yml` | ❌ | ✅ | Apache-2.0 |
| `snyk` | Snyk Security | `snyk-security.yml` | ✅ | ❌ | Proprietary |
| `debricked` | Debricked | `debricked.yml` | ✅ | ❌ | Proprietary |
| `crda` | CRDA | `crda.yml` | ❌ | ✅ | Apache-2.0 |
| `endorlabs` | Endor Labs | `endorlabs.yml` | ❌ | ❌ | Proprietary |
| `frogbot-scan-pr` | Frogbot Scan PR | `frogbot-scan-pr.yml` | ❌ | ❌ | Apache-2.0 |
| `frogbot-scan-and-fix` | Frogbot Scan & Fix | `frogbot-scan-and-fix.yml` | ✅ | ❌ | Apache-2.0 |

---

## Container Security

| ID | Name | File | Free | License |
|----|------|------|------|---------|
| `sysdig-scan` | Sysdig Secure | `sysdig-scan.yml` | ❌ | Proprietary |
| `black-duck` | Black Duck | `black-duck-security-scan-ci.yml` | ❌ | Proprietary |

---

## Infrastructure as Code (IaC)

| ID | Name | File | IaC Type | Free | License |
|----|------|------|---------|------|---------|
| `policy-validator-cfn` | Policy Validator (CFN) | `policy-validator-cfn.yml` | CloudFormation | ✅ | Apache-2.0 |
| `policy-validator-tf` | Policy Validator (TF) | `policy-validator-tf.yml` | Terraform | ✅ | Apache-2.0 |

---

## Enterprise Platforms

| ID | Name | File | Free | License |
|----|------|------|------|---------|
| `veracode` | Veracode | `veracode.yml` | ❌ | Proprietary |
| `synopsys-action` | Synopsys Action | `synopsys-action.yml` | ❌ | Proprietary |
| `synopsys-io` | Synopsys IO | `synopsys-io.yml` | ❌ | Proprietary |
| `defender-for-devops` | Defender for DevOps | `defender-for-devops.yml` | ❌ | Proprietary |

---

## Supply Chain Security

| ID | Name | File | Free | License |
|----|------|------|------|---------|
| `slsa-publish` | SLSA Generic Publisher | `generator-generic-ossf-slsa3-publish.yml` | ✅ | Apache-2.0 |

---

## Code Quality

| ID | Name | File | Free | License |
|----|------|------|------|---------|
| `codacy` | Codacy | `codacy.yml` | ❌* | Proprietary |

*Free for open-source repositories.

---

## Additional Workflows

These workflows are included in the repository but are not security scanning tools:

| File | Purpose |
|------|---------|
| `python-app.yml` | Python application CI/CD template |
| `python-package.yml` | Python package build and test |
| `python-package-conda.yml` | Python package build with Conda |
| `python-publish.yml` | Python package publishing to PyPI |
| `azure-webapps-python.yml` | Deploy Python app to Azure Web Apps |
| `azure-functions-app-python.yml` | Deploy Python Azure Functions |
| `django.yml` | Django application CI |
| `npm-publish.yml` | Publish @jvzhu/growkudos to GitHub Packages |
