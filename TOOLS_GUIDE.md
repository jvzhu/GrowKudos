# Tools Guide

A detailed guide to every security tool category included in GrowKudos, with configuration tips, common use cases, and integration advice.

---

## Table of Contents

- [SAST — Static Application Security Testing](#sast--static-application-security-testing)
- [SCA — Software Composition Analysis](#sca--software-composition-analysis)
- [DAST — Dynamic Application Security Testing](#dast--dynamic-application-security-testing)
- [Container Security](#container-security)
- [Infrastructure as Code Security](#infrastructure-as-code-security)
- [Code Quality](#code-quality)
- [Supply Chain Security](#supply-chain-security)
- [Fuzz Testing](#fuzz-testing)
- [Multi-Category Tools](#multi-category-tools)

---

## SAST — Static Application Security Testing

SAST tools analyze your source code **without running it**, looking for patterns that indicate security vulnerabilities like SQL injection, XSS, hard-coded secrets, and insecure cryptography.

**When to use SAST:**
- Every commit and PR (fast tools like Bandit, Semgrep, DevSkim)
- On a schedule for deep analysis (CodeQL, Checkmarx, Veracode)
- As a merge gate to prevent new vulnerabilities

---

### Bandit

**File:** `bandit.yml`  
**Language:** Python only  
**Cost:** Free / Open Source

Bandit is the most widely used Python security linter. It performs Abstract Syntax Tree (AST) analysis to find common Python security issues.

**What it finds:**
- Hardcoded passwords and secrets (`B105`, `B106`, `B107`)
- Use of dangerous functions (`eval`, `exec`, `os.system`)
- Insecure use of cryptography (weak algorithms, small key sizes)
- SQL injection risks
- XML vulnerabilities (XXE)
- Shell injection via `subprocess`

**Configuration:**
```yaml
# .bandit configuration file
[bandit]
exclude: tests,docs
skips: B101,B601  # Skip assert statements and shell injection in tests
```

**Common customization in the workflow:**
```yaml
- name: Run Bandit
  run: bandit -r . -f json -o bandit-results.json
  continue-on-error: true  # Don't fail CI, just report
```

---

### CodeQL

**File:** `codeql.yml`  
**Language:** C, C++, C#, Java, JavaScript, TypeScript, Python, Ruby, Go, Swift  
**Cost:** Free for public repos; included with GitHub Advanced Security for private repos

CodeQL is GitHub's semantic code analysis engine. It models your code as a database and runs queries to find complex vulnerabilities that simple pattern-matching misses.

**What it finds:**
- SQL injection (data-flow tracking from source to sink)
- Cross-site scripting (XSS)
- Path traversal vulnerabilities
- Command injection
- Unsafe deserialization
- Insecure randomness
- Cryptographic weaknesses

**Key feature — data flow analysis:** CodeQL traces how user-controlled data flows through your application, even across function calls and files, to find injection vulnerabilities.

**Configuration options:**
```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: python, javascript    # Specify languages
    queries: security-and-quality    # Use extended query pack
    config-file: ./.github/codeql/codeql-config.yml  # Custom config
```

**Custom CodeQL config (`.github/codeql/codeql-config.yml`):**
```yaml
name: "Custom CodeQL Config"
queries:
  - uses: security-and-quality
paths-ignore:
  - "tests/**"
  - "docs/**"
```

---

### Semgrep

**File:** `semgrep.yml`  
**Language:** 30+ languages including Python, JavaScript, TypeScript, Java, Go, Ruby, PHP, C, C++  
**Cost:** Free (CLI); optional cloud dashboard with `SEMGREP_APP_TOKEN`

Semgrep uses lightweight pattern matching with an expressive rule syntax. It has 3,000+ community rules and allows you to write custom rules without learning a query language.

**What it finds (with community rules):**
- OWASP Top 10 vulnerabilities
- Framework-specific issues (Django, Flask, Express, Spring, etc.)
- Secret detection
- Insecure coding patterns
- Custom business logic violations

**Run with specific rulesets:**
```yaml
- name: Run Semgrep
  run: semgrep scan --config "p/owasp-top-ten" --config "p/python" .
```

**Write custom rules:**
```yaml
# .semgrep/custom-rules.yml
rules:
  - id: no-print-statements
    pattern: print(...)
    message: "Remove debug print statements before production"
    languages: [python]
    severity: WARNING
```

---

### Pyre & Pysa

**Files:** `pyre.yml`, `pysa.yml`  
**Language:** Python  
**Cost:** Free / Open Source (Meta/Facebook)

**Pyre** is a fast Python type checker. **Pysa** (Python Static Analyzer) is built on top of Pyre and performs taint analysis to find security vulnerabilities.

**Pysa finds:**
- SQL injection
- Remote code execution
- XSS vulnerabilities
- Server-side request forgery (SSRF)
- Path traversal

**Pysa requires a `pyproject.toml` or `.pyre_configuration`:**
```json
{
  "source_directories": ["."],
  "taint_models_path": ".pysa_models"
}
```

---

### DevSkim

**File:** `devskim.yml`  
**Language:** Multi-language (C, C++, C#, Java, Python, JavaScript, TypeScript, PHP, Ruby, and more)  
**Cost:** Free / Open Source (Microsoft)

DevSkim provides IDE-style security analysis optimized for CI pipelines. It flags specific vulnerable API calls and coding patterns.

**What it finds:**
- Use of deprecated/broken cryptographic algorithms (MD5, SHA1, DES)
- Banned function calls (`strcpy`, `gets` in C/C++)
- Hardcoded credentials
- Overly permissive CORS headers
- SQL query construction patterns

---

### OSSAR

**File:** `ossar.yml`  
**Language:** JavaScript, TypeScript, Python, C#, Go, Java  
**Cost:** Free (Microsoft Open Source Security Analysis Runs)

OSSAR is a GitHub Actions wrapper that runs multiple Microsoft security tools in parallel and aggregates results into SARIF format.

---

### Checkmarx / Checkmarx One

**Files:** `checkmarx.yml`, `checkmarx-one.yml`  
**Language:** 35+ languages  
**Cost:** Commercial license required

**Required secrets:**
- `CHECKMARX_URL` — Checkmarx server URL
- `CHECKMARX_USERNAME` — Username
- `CHECKMARX_PASSWORD` — Password
- `CHECKMARX_CLIENT_SECRET` — (for Checkmarx One)

Checkmarx is an enterprise SAST platform with deep vulnerability analysis and compliance reporting. Checkmarx One is the cloud-native version.

---

### Fortify

**File:** `fortify.yml`  
**Language:** 35+ languages  
**Cost:** Commercial

**Required secrets:**
- For Fortify on Demand: `FOD_URL`, `FOD_API_KEY`, `FOD_API_SECRET`
- For SSC: `SSC_URL`, `SSC_TOKEN`

Fortify (by OpenText/Micro Focus) is an enterprise SAST solution with strong compliance mapping (PCI-DSS, HIPAA, GDPR, CWE, SANS Top 25).

---

### Veracode

**File:** `veracode.yml`  
**Language:** Multi-language  
**Cost:** Commercial

**Required secrets:**
- `VERACODE_API_ID`
- `VERACODE_API_KEY`

Veracode combines SAST, SCA, and DAST. Its workflow submission model allows both policy scan and pipeline scan modes.

---

## SCA — Software Composition Analysis

SCA tools inventory your third-party dependencies and check them against vulnerability databases to find components with known CVEs.

**Why SCA matters:** The majority of modern application code comes from open-source dependencies. Tools like npm, pip, Maven, and Gradle make it easy to add hundreds of packages, but each package introduces potential vulnerabilities.

---

### GitHub Dependency Review

**File:** `dependency-review.yml`  
**Language:** All (based on lock files)  
**Cost:** Free

The simplest way to start with SCA. Dependency Review runs on every PR and blocks merges that introduce vulnerable dependencies.

**What it checks:**
- `package-lock.json`, `yarn.lock` (npm/yarn)
- `requirements.txt`, `Pipfile.lock` (Python)
- `pom.xml`, `build.gradle` (Java)
- `go.sum` (Go)
- `Gemfile.lock` (Ruby)
- `composer.lock` (PHP)
- `Cargo.lock` (Rust)
- And more

**Configuration options:**
```yaml
- name: Dependency Review
  uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: moderate    # Options: low, moderate, high, critical
    allow-licenses: MIT, Apache-2.0, BSD-2-Clause  # Allowlist licenses
    deny-licenses: GPL-3.0        # Denylist specific licenses
```

---

### OSV Scanner

**File:** `osv-scanner.yml`  
**Language:** Go, npm, PyPI, Maven, Cargo, NuGet, RubyGems, and more  
**Cost:** Free / Open Source (Google)

OSV Scanner uses the [Open Source Vulnerability database](https://osv.dev), which aggregates CVEs from GitHub Advisory Database, NVD, and project-specific advisories.

**Advantages over other tools:**
- Checks transitive dependencies
- Uses multiple vulnerability sources
- Free and open source
- Fast execution

---

### Snyk

**File:** `snyk-security.yml`  
**Language:** npm, Python, Java, .NET, Ruby, Go, PHP, Docker  
**Cost:** Free tier available; `SNYK_TOKEN` required

Snyk is one of the most developer-friendly SCA tools. Features include:
- Automatic fix PRs for vulnerable dependencies
- License compliance checking
- Container image scanning
- IaC scanning (Terraform, CloudFormation, Kubernetes)

---

### Debricked

**File:** `debricked.yml`  
**Language:** 11+ languages  
**Cost:** Free tier; `DEBRICKED_TOKEN` required

Debricked focuses on **automated remediation** — it not only finds vulnerable dependencies but also suggests and can auto-apply fixes. Strong license compliance features.

---

### CRDA (Red Hat Code Ready Dependency Analytics)

**File:** `crda.yml`  
**Language:** Java (Maven), Node.js, Python, Go  
**Cost:** Free; `CRDA_KEY` required

CRDA combines vulnerability data from Red Hat's security team and Snyk. It provides a risk score for your dependency tree.

---

### Frogbot

**Files:** `frogbot-scan-and-fix.yml`, `frogbot-scan-pr.yml`  
**Language:** Multi-language  
**Cost:** JFrog platform subscription; `JF_URL`, `JF_ACCESS_TOKEN` required

Two workflow variants:
- **`frogbot-scan-pr.yml`**: Scans PRs and comments with findings
- **`frogbot-scan-and-fix.yml`**: Scans and automatically opens fix PRs

---

## DAST — Dynamic Application Security Testing

DAST tools test your **running application** by sending malformed inputs and observing responses. Unlike SAST, DAST finds vulnerabilities in the deployed behavior of your app.

**When to use DAST:**
- After building/deploying a test instance
- Against staging environments
- For API security testing

---

### StackHawk

**File:** `stackhawk.yml`  
**Target:** REST and GraphQL APIs  
**Cost:** Free tier; `HAWK_API_KEY` required

StackHawk is designed specifically for developer workflows. It uses OWASP ZAP under the hood but provides a polished experience optimized for CI/CD.

**Requires:**
1. A running application (you'll need to start it in the workflow)
2. A `stackhawk.yml` configuration file in your repo
3. `HAWK_API_KEY` secret

**Example `stackhawk.yml` config:**
```yaml
app:
  applicationId: ${APP_ID}
  env: Development
  host: http://localhost:8080
```

---

### APIsec

**File:** `apisec-scan.yml`  
**Target:** REST APIs  
**Cost:** Free tier; `APISEC_*` secrets required

APIsec generates comprehensive test cases from your OpenAPI (Swagger) specification and tests for business logic flaws alongside technical vulnerabilities.

---

### NeuraLegion (Bright Security)

**File:** `neuralegion.yml`  
**Target:** REST APIs, GraphQL, Web apps  
**Cost:** Free tier; `BRIGHT_TOKEN` required

NeuraLegion uses AI-powered scanning with a very low false-positive rate. Supports both "scan" and "re-test" modes for efficient CI/CD integration.

---

### EthicalCheck

**File:** `ethicalcheck.yml`  
**Target:** REST APIs  
**Cost:** Free tier; `ETHICALCHECK_*` secrets required

EthicalCheck can test APIs using a specification file (OpenAPI/Swagger) without needing a running application, making it easy to integrate.

---

## Container Security

Container security tools scan Docker images for OS package vulnerabilities, misconfigurations, and embedded secrets.

---

### Sysdig

**File:** `sysdig-scan.yml`  
**Target:** Docker/OCI container images  
**Cost:** Commercial; `SYSDIG_SECURE_TOKEN` required

Sysdig Secure provides runtime security as well as image scanning. The CI workflow scans images before they reach production, checking for:
- OS package CVEs
- Application dependency CVEs
- Misconfigurations
- Embedded secrets

---

## Infrastructure as Code Security

IaC security tools validate your infrastructure definitions before deployment to catch overly permissive configurations, security misconfigurations, and compliance violations.

---

### AWS CloudFormation Policy Validator

**File:** `policy-validator-cfn.yml`  
**Target:** AWS CloudFormation templates  
**Cost:** Free (AWS tool); AWS credentials required

Validates IAM policies in CloudFormation templates against AWS's best practices and identifies overly permissive policies (`*` actions, `*` resources).

**Required:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`

---

### AWS Terraform Policy Validator

**File:** `policy-validator-tf.yml`  
**Target:** Terraform configurations  
**Cost:** Free (AWS tool); AWS credentials required

Same validation as CloudFormation validator but for Terraform configurations. Runs `terraform plan` and validates the resulting IAM policies.

---

## Code Quality

---

### Codacy

**File:** `codacy.yml`  
**Language:** 40+ languages  
**Cost:** Free for public repos; `CODACY_PROJECT_TOKEN` required

Codacy aggregates results from 30+ static analysis tools and provides a quality dashboard tracking trends over time. Checks code style, security, code coverage, and code complexity.

---

### Pylint

**File:** `pylint.yml`  
**Language:** Python  
**Cost:** Free / Open Source

Pylint is Python's most comprehensive static analysis tool, checking:
- Code style (PEP 8 compliance)
- Error detection (undefined variables, wrong argument counts)
- Refactoring suggestions
- Basic security checks (using `pylint-security` plugin)

---

## Supply Chain Security

### OSSF SLSA Generator

**File:** `generator-generic-ossf-slsa3-publish.yml`  
**Cost:** Free

SLSA (Supply-chain Levels for Software Artifacts) is a framework for securing the software build process. Level 3 provides:
- Signed build provenance
- Hermetic, reproducible builds
- Protection against build tampering

**How it works:** The workflow generates a cryptographically signed attestation that proves your artifact was built from a specific source commit, by a specific workflow, without modification.

---

## Fuzz Testing

Fuzz testing sends random/malformed inputs to your application to discover crashes, memory issues, and unhandled edge cases that could be security vulnerabilities.

### Mayhem for API

**File:** `mayhem-for-api.yml`  
**Target:** REST APIs  
**Cost:** Commercial; `MAYHEM_TOKEN` required

Mayhem uses AI-guided fuzzing to discover novel API vulnerabilities beyond what rule-based tools find. It generates a test corpus that evolves based on code coverage feedback.

---

## Multi-Category Tools

Some tools span multiple categories:

### Snyk
- SCA (dependency scanning)
- Container scanning
- IaC scanning (optional)

### Microsoft Defender for DevOps (`defender-for-devops.yml`)
- SAST (via Bandit, ESLint)
- SCA (dependency scanning)
- IaC scanning
- Secret detection
Requires Azure DevOps/Defender subscription.

### Synopsys (`synopsys-action.yml`, `synopsys-io.yml`)
Synopsys offers both Black Duck (SCA) and Coverity (SAST) through their unified Polaris platform. Both workflow files are included for different integration styles.
