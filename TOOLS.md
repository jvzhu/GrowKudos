# Tool Registry

A complete registry of all 42 workflow templates included in GrowKudos, organized by category with key metadata.

---

## Security Scanning Workflows

### SAST — Static Application Security Testing

| Workflow | Tool | Version / Maintained By | Languages | Secrets | SARIF | Docs |
|----------|------|------------------------|-----------|---------|-------|------|
| `bandit.yml` | Bandit | PyCQA | Python | None | ✅ | [Bandit docs](https://bandit.readthedocs.io) |
| `codeql.yml` | CodeQL | GitHub | C, C++, C#, Go, Java, JS, TS, Python, Ruby, Swift | None | ✅ | [CodeQL docs](https://docs.github.com/en/code-security/code-scanning) |
| `semgrep.yml` | Semgrep | Semgrep Inc. | 30+ | `SEMGREP_APP_TOKEN` (optional) | ✅ | [Semgrep docs](https://semgrep.dev/docs) |
| `pyre.yml` | Pyre | Meta (Facebook) | Python | None | ✅ | [Pyre docs](https://pyre-check.org) |
| `pysa.yml` | Pysa | Meta (Facebook) | Python | None | ✅ | [Pysa docs](https://pyre-check.org/docs/pysa-basics) |
| `devskim.yml` | DevSkim | Microsoft | Multi-language | None | ✅ | [DevSkim docs](https://github.com/microsoft/DevSkim) |
| `ossar.yml` | OSSAR | Microsoft | Multi-language | None | ✅ | [OSSAR docs](https://github.com/github/ossar-action) |
| `checkmarx.yml` | Checkmarx | Checkmarx | 35+ | `CHECKMARX_*` | ✅ | [Checkmarx docs](https://checkmarx.com/cxsast-source-code-scanning) |
| `checkmarx-one.yml` | Checkmarx One | Checkmarx | 35+ | `CHECKMARX_*` | ✅ | [Checkmarx One docs](https://checkmarx.com/product/application-security-platform) |
| `fortify.yml` | Fortify | OpenText | 35+ | `FOD_*` or `SSC_*` | ✅ | [Fortify docs](https://www.microfocus.com/en-us/cyberres/application-security/static-code-analyzer) |
| `jfrog-sast.yml` | JFrog SAST | JFrog | Multi-language | `JF_URL`, `JF_ACCESS_TOKEN` | ✅ | [JFrog SAST docs](https://docs.jfrog-applications.jfrog.io/jfrog-applications/frogbot/scan-github-repositories-with-frogbot/scan-pull-requests) |
| `veracode.yml` | Veracode | Veracode | Multi-language | `VERACODE_API_ID`, `VERACODE_API_KEY` | ✅ | [Veracode docs](https://docs.veracode.com) |

### SCA — Software Composition Analysis

| Workflow | Tool | Maintained By | Languages | Secrets | SARIF | Docs |
|----------|------|--------------|-----------|---------|-------|------|
| `dependency-review.yml` | Dependency Review | GitHub | All | None | ✅ | [Docs](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review) |
| `osv-scanner.yml` | OSV Scanner | Google | Multi | None | ✅ | [OSV Scanner docs](https://google.github.io/osv-scanner) |
| `snyk-security.yml` | Snyk | Snyk | Multi | `SNYK_TOKEN` | ✅ | [Snyk docs](https://docs.snyk.io) |
| `debricked.yml` | Debricked | Debricked | 11+ | `DEBRICKED_TOKEN` | — | [Debricked docs](https://docs.debricked.com) |
| `crda.yml` | CRDA | Red Hat | Java, Node.js, Python, Go | `CRDA_KEY` | — | [CRDA docs](https://github.com/redhat-actions/crda) |
| `endorlabs.yml` | Endor Labs | Endor Labs | Multi | `ENDOR_*` | ✅ | [Endor Labs docs](https://docs.endorlabs.com) |
| `synopsys-action.yml` | Synopsys | Synopsys | Multi | `BRIDGE_*` | — | [Synopsys docs](https://documentation.blackduck.com) |
| `synopsys-io.yml` | Synopsys IO | Synopsys | Multi | `BRIDGE_*` | — | [Synopsys IO docs](https://documentation.blackduck.com) |
| `black-duck-security-scan-ci.yml` | Black Duck | Synopsys | Multi | `BLACKDUCK_API_TOKEN` | — | [Black Duck docs](https://documentation.blackduck.com) |
| `frogbot-scan-and-fix.yml` | Frogbot | JFrog | Multi | `JF_URL`, `JF_ACCESS_TOKEN` | — | [Frogbot docs](https://docs.jfrog-applications.jfrog.io/jfrog-applications/frogbot) |
| `frogbot-scan-pr.yml` | Frogbot PR | JFrog | Multi | `JF_URL`, `JF_ACCESS_TOKEN` | — | [Frogbot docs](https://docs.jfrog-applications.jfrog.io/jfrog-applications/frogbot) |

### DAST — Dynamic Application Security Testing

| Workflow | Tool | Maintained By | Target | Secrets | SARIF | Docs |
|----------|------|--------------|--------|---------|-------|------|
| `stackhawk.yml` | StackHawk | StackHawk | REST/GraphQL APIs | `HAWK_API_KEY` | ✅ | [StackHawk docs](https://docs.stackhawk.com) |
| `apisec-scan.yml` | APIsec | APIsec | REST APIs | `APISEC_*` | — | [APIsec docs](https://www.apisec.ai/documentation) |
| `neuralegion.yml` | NeuraLegion (Bright) | Bright Security | REST/GraphQL/Web | `BRIGHT_TOKEN` | — | [Bright docs](https://docs.brightsec.com) |
| `ethicalcheck.yml` | EthicalCheck | Traceable AI | REST APIs | `ETHICALCHECK_*` | — | [EthicalCheck docs](https://www.ethicalcheck.dev) |
| `mayhem-for-api.yml` | Mayhem for API | ForAllSecure | REST APIs | `MAYHEM_TOKEN` | ✅ | [Mayhem docs](https://forallsecure.com/mayhem-for-api) |

### Container Security

| Workflow | Tool | Maintained By | Target | Secrets | SARIF | Docs |
|----------|------|--------------|--------|---------|-------|------|
| `sysdig-scan.yml` | Sysdig | Sysdig | Container images | `SYSDIG_SECURE_TOKEN` | ✅ | [Sysdig docs](https://docs.sysdig.com) |

### Infrastructure as Code Security

| Workflow | Tool | Maintained By | Target | Secrets | SARIF | Docs |
|----------|------|--------------|--------|---------|-------|------|
| `policy-validator-cfn.yml` | AWS CFN Policy Validator | AWS | CloudFormation | AWS credentials | ✅ | [AWS docs](https://github.com/aws-actions/cloudformation-aws-iam-policy-validator) |
| `policy-validator-tf.yml` | AWS TF Policy Validator | AWS | Terraform | AWS credentials | ✅ | [AWS docs](https://github.com/aws-actions/terraform-aws-iam-policy-validator) |

### Code Quality

| Workflow | Tool | Maintained By | Languages | Secrets | SARIF | Docs |
|----------|------|--------------|-----------|---------|-------|------|
| `codacy.yml` | Codacy | Codacy | 40+ | `CODACY_PROJECT_TOKEN` | ✅ | [Codacy docs](https://docs.codacy.com) |
| `pylint.yml` | Pylint | PyCQA | Python | None | — | [Pylint docs](https://pylint.pycqa.org) |

### Supply Chain Security

| Workflow | Tool | Maintained By | Purpose | Secrets | Docs |
|----------|------|--------------|---------|---------|------|
| `generator-generic-ossf-slsa3-publish.yml` | OSSF SLSA Generator | OSSF | Build provenance attestation | None | [SLSA docs](https://slsa.dev) |

### Microsoft Security

| Workflow | Tool | Maintained By | Category | Secrets | SARIF | Docs |
|----------|------|--------------|----------|---------|-------|------|
| `defender-for-devops.yml` | Microsoft Defender for DevOps | Microsoft | Multi-category | Azure credentials | ✅ | [Defender docs](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-devops-introduction) |

---

## CI/CD & Deployment Workflows (Python-focused)

| Workflow | Purpose | Runtime |
|----------|---------|---------|
| `python-app.yml` | Build, test, and lint a Python application | Python 3.x |
| `python-package.yml` | Build and test a Python package across multiple Python versions | Python 3.x |
| `python-publish.yml` | Build and publish a Python package to PyPI | Python 3.x |
| `python-package-conda.yml` | Build and test a Python package using Conda | Miniconda |
| `django.yml` | Run tests for a Django application | Python + Django |
| `azure-webapps-python.yml` | Deploy a Python web app to Azure Web Apps | Azure |
| `azure-functions-app-python.yml` | Deploy a Python app to Azure Functions | Azure |

---

## Summary Statistics

| Category | Count |
|----------|-------|
| SAST | 12 |
| SCA | 11 |
| DAST | 5 |
| Container Security | 1 |
| IaC Security | 2 |
| Code Quality | 2 |
| Supply Chain | 1 |
| Microsoft Security | 1 |
| CI/CD & Deployment | 7 |
| **Total** | **42** |

---

## Tools with Free Tiers

| Tool | Type | Free Tier Details |
|------|------|------------------|
| Bandit | SAST | Fully open source |
| CodeQL | SAST | Free for public repos; GitHub Advanced Security for private |
| Semgrep | SAST | Free CLI; cloud features limited |
| Pyre/Pysa | SAST | Fully open source |
| DevSkim | SAST | Fully open source |
| OSSAR | SAST | Free Microsoft tool |
| Dependency Review | SCA | Free GitHub feature |
| OSV Scanner | SCA | Fully open source |
| Snyk | SCA | 200 tests/month free |
| Debricked | SCA | Free tier for small teams |
| CRDA | SCA | Free with registration |
| Frogbot | SCA | Free JFrog tier |
| StackHawk | DAST | Free tier available |
| APIsec | DAST | Free tier available |
| NeuraLegion | DAST | Free tier available |
| EthicalCheck | DAST | Free tier available |
| Codacy | Quality | Free for public repos |
| Pylint | Quality | Fully open source |
| OSSF SLSA | Supply Chain | Fully open source |
| AWS Validators | IaC | Free (AWS account required) |
