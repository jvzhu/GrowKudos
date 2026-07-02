# Tools Guide

Detailed documentation for every security scanning tool included in GrowKudos.

---

## Table of Contents

- [SAST Tools](#sast-tools)
- [DAST Tools](#dast-tools)
- [SCA Tools](#sca-tools)
- [Container Security](#container-security)
- [Infrastructure as Code](#infrastructure-as-code)
- [Enterprise Platforms](#enterprise-platforms)
- [Supply Chain Security](#supply-chain-security)
- [Code Quality](#code-quality)

---

## SAST Tools

### Bandit

**File:** `bandit.yml`  
**License:** Apache-2.0  
**Cost:** Free  
**Languages:** Python  

Bandit is a security linter for Python developed by the PyCQA community. It scans Python ASTs for common security issues such as hardcoded passwords, SQL injection, use of insecure functions, and more.

**When to use:** Any Python project. Lightweight and fast — ideal as a first-pass security check.

**Configuration:** Create a `.bandit` file in your repo root:

```ini
[bandit]
skips = B101,B601
exclude_dirs = tests,venv
```

**Key checks:** Hardcoded passwords, SQL injection, shell injection, use of `pickle`, unsafe YAML loading, weak cryptography.

---

### CodeQL

**File:** `codeql.yml`  
**License:** GitHub proprietary (free for public repos)  
**Cost:** Free (public repos), paid (private repos)  
**Languages:** JavaScript, TypeScript, Python, Java, C/C++, C#, Go, Ruby, Kotlin, Swift  

CodeQL is GitHub's semantic code analysis engine. It builds a database of your code and runs queries against it to find security vulnerabilities. The query library is maintained by GitHub Security Lab and the community.

**When to use:** Most projects — it provides deep semantic analysis that catches complex vulnerabilities pattern-based tools miss.

**Key checks:** SQL injection, XSS, path traversal, code injection, deserialization, CSRF, and many more language-specific checks.

---

### Semgrep

**File:** `semgrep.yml`  
**License:** LGPL-2.1 (OSS engine), Pro rules paid  
**Cost:** Free (community rules)  
**Languages:** JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, C/C++, Kotlin, Scala, Rust, and more  

Semgrep is a fast, open-source static analysis tool that uses pattern matching. It has thousands of community-contributed rules and a straightforward rule syntax for writing custom checks.

**When to use:** Any project. Particularly good for enforcing custom security policies and team-specific coding standards.

**Key checks:** Depends on selected rulesets. The `p/default` ruleset covers OWASP Top 10, secrets detection, and security anti-patterns.

---

### DevSkim

**File:** `devskim.yml`  
**License:** MIT  
**Cost:** Free  
**Languages:** Multiple (language-agnostic pattern matching)  

DevSkim is Microsoft's security linter that looks for dangerous API usage, hardcoded secrets, and other security problems using a rule engine with IDE plugins.

**When to use:** Multi-language projects or when you want IDE-integrated security checks.

---

### Pyre

**File:** `pyre.yml`  
**License:** MIT  
**Cost:** Free  
**Languages:** Python  

Pyre is a performant type checker for Python from Meta. It performs gradual typing analysis and can catch type errors that lead to security vulnerabilities.

**When to use:** Python projects with type annotations, or projects wanting to adopt type safety incrementally.

---

### Pysa

**File:** `pysa.yml`  
**License:** MIT  
**Cost:** Free  
**Languages:** Python  

Pysa (Python Static Analyzer) is a security-focused taint analysis tool from Meta that is built on top of Pyre. It tracks user-controlled data flows through your code to detect injection vulnerabilities.

**When to use:** Python web applications (Django, Flask) where you want taint-based analysis for injection vulnerabilities.

**Key checks:** SQL injection, XSS, SSRF, remote code execution through taint propagation.

---

### Pylint

**File:** `pylint.yml`  
**License:** GPL-2.0  
**Cost:** Free  
**Languages:** Python  

Pylint is a comprehensive Python code analyser that catches errors, enforces coding standards, and identifies security-related bad practices.

**When to use:** Python projects wanting both code quality and security linting in one tool.

---

### OSSAR

**File:** `ossar.yml`  
**License:** MIT  
**Cost:** Free  
**Languages:** Multiple  

Open Source Static Analysis Runner (OSSAR) by Microsoft runs multiple open-source analysers in a single workflow step, including ESLint security rules, Credscan, and the Template Analyzer.

**When to use:** Projects wanting broad SAST coverage with minimal configuration.

---

### Checkmarx / Checkmarx One

**Files:** `checkmarx.yml`, `checkmarx-one.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple (30+ languages)  

Checkmarx is an enterprise SAST platform with deep analysis capabilities and policy management. Checkmarx One is their cloud-native SaaS platform.

**Prerequisites:** Checkmarx subscription and API credentials stored as GitHub secrets.

---

### Fortify

**File:** `fortify.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple (27+ languages)  

Micro Focus Fortify is an enterprise static code analyser with broad language support and comprehensive vulnerability categorisation based on CWE/SANS Top 25.

**Prerequisites:** Fortify subscription; `FTF_CI_TOKEN` GitHub secret.

---

### JFrog SAST

**File:** `jfrog-sast.yml`  
**License:** Proprietary  
**Cost:** Paid (part of JFrog Advanced Security)  
**Languages:** Multiple  

JFrog Advanced Security includes SAST capabilities integrated with the JFrog Platform for end-to-end DevSecOps.

---

## DAST Tools

### NeuraLegion (Bright)

**File:** `neuralegion.yml`  
**License:** Proprietary  
**Cost:** Paid (free tier available)  
**Languages:** N/A (tests running app)  

NeuraLegion (now Bright Security) is an AI-powered DAST scanner that tests APIs and web applications by crawling and fuzzing endpoints.

**Prerequisites:** Running application endpoint; `BRIGHT_TOKEN` GitHub secret.

---

### Mayhem for API

**File:** `mayhem-for-api.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** N/A  

Mayhem for API uses fuzz testing to discover vulnerabilities in REST APIs, GraphQL, and SOAP services.

**Prerequisites:** OpenAPI/Swagger spec; running API endpoint; `MAYHEM_TOKEN` GitHub secret.

---

### StackHawk

**File:** `stackhawk.yml`  
**License:** Proprietary  
**Cost:** Paid (free trial available)  
**Languages:** N/A  

StackHawk is a developer-centric DAST tool that integrates natively with CI/CD. It is based on OWASP ZAP.

**Prerequisites:** `.stackhawk.yml` configuration file; `HAWK_API_KEY` GitHub secret.

---

### APIsec Scan

**File:** `apisec-scan.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** N/A  

APIsec is an API security testing platform that validates API implementations against a comprehensive set of security checks.

---

### EthicalCheck

**File:** `ethicalcheck.yml`  
**License:** Proprietary  
**Cost:** Paid (free tier available)  
**Languages:** N/A  

EthicalCheck provides automated, zero-configuration API security testing that identifies OWASP API Top 10 vulnerabilities.

---

## SCA Tools

### Dependency Review

**File:** `dependency-review.yml`  
**License:** MIT  
**Cost:** Free  
**Languages:** All (package manager agnostic)  

GitHub's built-in dependency review action blocks pull requests that introduce dependencies with known vulnerabilities, based on the GitHub Advisory Database.

**When to use:** Every project — this should be the minimum baseline for dependency security.

---

### OSV Scanner

**File:** `osv-scanner.yml`  
**License:** Apache-2.0  
**Cost:** Free  
**Languages:** All major ecosystems  

Google's OSV Scanner checks dependencies against the OSV (Open Source Vulnerabilities) database, which aggregates data from multiple vulnerability databases.

**When to use:** Any open-source project. Complements Dependency Review with broader database coverage.

---

### Snyk Security

**File:** `snyk-security.yml`  
**License:** Proprietary  
**Cost:** Paid (free tier for open-source projects)  
**Languages:** All major ecosystems  

Snyk is an industry-leading developer security platform that scans dependencies, containers, and IaC for vulnerabilities and can automatically open fix pull requests.

**Prerequisites:** `SNYK_TOKEN` GitHub secret from [app.snyk.io](https://app.snyk.io).

---

### Debricked

**File:** `debricked.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple  

Debricked provides SCA with automated fix suggestions and license compliance tracking.

---

### CRDA

**File:** `crda.yml`  
**License:** Apache-2.0  
**Cost:** Free  
**Languages:** Java (Maven/Gradle), Node.js, Python, Go  

Red Hat's Code Ready Dependency Analytics provides vulnerability scanning with detailed remediation guidance.

---

### Endor Labs

**File:** `endorlabs.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple  

Endor Labs focuses on reachability analysis — it only flags vulnerabilities in code paths actually reachable in your application, dramatically reducing false positives.

---

### Frogbot

**Files:** `frogbot-scan-pr.yml`, `frogbot-scan-and-fix.yml`  
**License:** Apache-2.0 (agent), JFrog Platform (server) proprietary  
**Cost:** Paid (JFrog Platform subscription)  
**Languages:** Multiple  

Frogbot is JFrog's automated PR scanning bot. The "scan-pr" variant reports vulnerabilities in PRs; the "scan-and-fix" variant automatically creates fix PRs.

---

## Container Security

### Sysdig Secure

**File:** `sysdig-scan.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** N/A (Docker image scanning)  

Sysdig Secure scans container images for OS package vulnerabilities and misconfigurations, and provides runtime security monitoring.

**Prerequisites:** `SYSDIG_SECURE_TOKEN` and `SYSDIG_SECURE_URL` GitHub secrets.

---

### Black Duck

**File:** `black-duck-security-scan-ci.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple + container scanning  

Synopsys Black Duck is a comprehensive open-source security and license compliance solution that supports containers, binaries, and source code.

---

## Infrastructure as Code

### Policy Validator for CloudFormation

**File:** `policy-validator-cfn.yml`  
**License:** Apache-2.0  
**Cost:** Free  
**Languages:** CloudFormation (YAML/JSON)  

AWS IAM Access Analyzer's policy validator checks CloudFormation templates for IAM policy issues including overly permissive policies and potential security risks.

**When to use:** Any AWS project using CloudFormation for infrastructure.

---

### Policy Validator for Terraform

**File:** `policy-validator-tf.yml`  
**License:** Apache-2.0  
**Cost:** Free  
**Languages:** Terraform (HCL)  

Same as above but for Terraform configurations.

**When to use:** Any AWS project using Terraform for infrastructure.

---

## Enterprise Platforms

### Veracode

**File:** `veracode.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple  

Veracode is a leading application security testing platform used widely in regulated industries. It supports SAST, DAST, SCA, and manual penetration testing.

**Prerequisites:** `VERACODE_API_ID` and `VERACODE_API_KEY` GitHub secrets.

---

### Synopsys Action / Synopsys IO

**Files:** `synopsys-action.yml`, `synopsys-io.yml`  
**License:** Proprietary  
**Cost:** Paid  
**Languages:** Multiple  

Synopsys Polaris and Coverity provide enterprise SAST, while Synopsys IO (Intelligent Orchestration) automatically selects which security tests to run based on code changes.

---

### Microsoft Defender for DevOps

**File:** `defender-for-devops.yml`  
**License:** Proprietary  
**Cost:** Part of Microsoft Defender for Cloud  
**Languages:** Multiple  

Integrates Microsoft Defender for Cloud security findings into GitHub's Security tab, covering infrastructure misconfigurations and code vulnerabilities.

---

## Supply Chain Security

### SLSA Generic Publisher

**File:** `generator-generic-ossf-slsa3-publish.yml`  
**License:** Apache-2.0  
**Cost:** Free  
**Languages:** N/A (any build artifact)  

Generates SLSA (Supply-chain Levels for Software Artifacts) Level 3 provenance for your build outputs, signed with Sigstore's keyless signing. This provides a verifiable record of how your software was built.

**When to use:** Any project publishing artifacts (binaries, packages, Docker images) to package registries.

---

## Code Quality

### Codacy

**File:** `codacy.yml`  
**License:** Proprietary  
**Cost:** Paid (free for open-source)  
**Languages:** Multiple  

Codacy provides automated code quality reviews covering security, code complexity, duplication, and style, with GitHub PR comments and a code quality dashboard.

**Prerequisites:** `CODACY_PROJECT_TOKEN` GitHub secret.
