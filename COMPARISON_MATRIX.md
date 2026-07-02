# Tool Comparison Matrix

A comprehensive side-by-side comparison of all security tools included in GrowKudos to help you choose the right combination for your project.

---

## Quick Comparison: Free vs. Commercial Tools

### Free / Open Source Tools (No License Cost)

| Tool | Category | Languages | Setup Complexity | Scan Speed | SARIF |
|------|----------|-----------|-----------------|------------|-------|
| Bandit | SAST | Python | ⭐ Easy | ⚡ Fast | ✅ |
| CodeQL | SAST | 10+ | ⭐⭐ Medium | 🐢 Slow (thorough) | ✅ |
| Semgrep | SAST | 30+ | ⭐ Easy | ⚡ Fast | ✅ |
| Pyre / Pysa | SAST | Python | ⭐⭐ Medium | ⚡ Fast | ✅ |
| DevSkim | SAST | Multi | ⭐ Easy | ⚡ Fast | ✅ |
| OSSAR | SAST | Multi | ⭐ Easy | ⚡ Fast | ✅ |
| Dependency Review | SCA | All | ⭐ Easy | ⚡ Fast | ✅ |
| OSV Scanner | SCA | Multi | ⭐ Easy | ⚡ Fast | ✅ |
| Snyk | SCA/SAST | Multi | ⭐⭐ Medium | ⚡ Fast | ✅ |
| Debricked | SCA | Multi | ⭐⭐ Medium | ⚡ Fast | — |
| CRDA | SCA | 4 languages | ⭐⭐ Medium | ⚡ Fast | — |
| Frogbot | SCA | Multi | ⭐⭐ Medium | ⚡ Fast | — |
| StackHawk | DAST | REST/GraphQL | ⭐⭐ Medium | 🐢 Medium | ✅ |
| APIsec | DAST | REST | ⭐⭐ Medium | 🐢 Medium | — |
| NeuraLegion | DAST | REST/GraphQL | ⭐⭐ Medium | 🐢 Medium | — |
| EthicalCheck | DAST | REST | ⭐ Easy | 🐢 Medium | — |
| AWS CFN Validator | IaC | CloudFormation | ⭐⭐ Medium | ⚡ Fast | ✅ |
| AWS TF Validator | IaC | Terraform | ⭐⭐ Medium | ⚡ Fast | ✅ |
| Codacy | Quality | 40+ | ⭐⭐ Medium | ⚡ Fast | ✅ |
| Pylint | Quality | Python | ⭐ Easy | ⚡ Fast | — |
| OSSF SLSA | Supply Chain | All | ⭐⭐ Medium | ⚡ Fast | — |

### Commercial Tools (License Required)

| Tool | Category | Languages | Setup Complexity | Pricing Model |
|------|----------|-----------|-----------------|---------------|
| Checkmarx | SAST | 35+ | ⭐⭐⭐ Complex | Per scan / subscription |
| Checkmarx One | SAST | 35+ | ⭐⭐⭐ Complex | SaaS subscription |
| Fortify | SAST | 35+ | ⭐⭐⭐ Complex | Enterprise license |
| Veracode | SAST/SCA/DAST | Multi | ⭐⭐⭐ Complex | Enterprise subscription |
| JFrog SAST | SAST | Multi | ⭐⭐ Medium | JFrog platform |
| Endor Labs | SCA | Multi | ⭐⭐ Medium | SaaS subscription |
| Synopsys | SCA/SAST | Multi | ⭐⭐⭐ Complex | Enterprise license |
| Black Duck | SCA | Multi | ⭐⭐⭐ Complex | Enterprise license |
| Sysdig | Container | Docker | ⭐⭐ Medium | SaaS subscription |
| Mayhem | DAST/Fuzz | REST | ⭐⭐⭐ Complex | Commercial |
| Defender for DevOps | Multi | Multi | ⭐⭐ Medium | Azure subscription |

---

## SAST Tool Comparison

| Feature | Bandit | CodeQL | Semgrep | DevSkim | Checkmarx | Veracode | Fortify |
|---------|--------|--------|---------|---------|-----------|----------|---------|
| **Python** | ✅ Primary | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **JavaScript/TypeScript** | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Java** | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Go** | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **C/C++** | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **C#** | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ruby** | — | ✅ | ✅ | — | ✅ | ✅ | — |
| **PHP** | — | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Data Flow Analysis** | — | ✅ | Partial | — | ✅ | ✅ | ✅ |
| **Custom Rules** | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| **SARIF Output** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **GitHub Integration** | ✅ Native | ✅ Native | ✅ | ✅ | ✅ | ✅ | ✅ |
| **License** | Open Source | Free (public) | Free tier | Open Source | Commercial | Commercial | Commercial |

---

## SCA Tool Comparison

| Feature | Dep. Review | OSV Scanner | Snyk | Debricked | CRDA | Black Duck |
|---------|-------------|-------------|------|-----------|------|------------|
| **npm/yarn** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Python pip** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Maven/Gradle** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Go modules** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Cargo (Rust)** | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| **NuGet (.NET)** | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| **RubyGems** | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| **License Compliance** | ✅ | — | ✅ | ✅ | — | ✅ |
| **Auto Fix PRs** | — | — | ✅ | ✅ | — | — |
| **Transitive Deps** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Container Images** | — | — | ✅ | — | — | ✅ |
| **PR Comments** | ✅ | — | ✅ | ✅ | ✅ | — |
| **Free Tier** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## DAST Tool Comparison

| Feature | StackHawk | APIsec | NeuraLegion | EthicalCheck | Mayhem |
|---------|-----------|--------|-------------|--------------|--------|
| **REST API** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **GraphQL** | ✅ | — | ✅ | — | — |
| **SOAP** | — | — | ✅ | — | — |
| **Web App** | — | — | ✅ | — | — |
| **OpenAPI Import** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Needs Running App** | ✅ | Partial | ✅ | — | ✅ |
| **AI/ML Powered** | — | — | ✅ | — | ✅ |
| **Auto-remediation** | — | — | — | — | — |
| **SARIF Output** | ✅ | — | — | — | ✅ |
| **Free Tier** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **OWASP API Top 10** | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Scoring by Use Case

### Best for Python Projects

| Rank | Tool | Reason |
|------|------|--------|
| 1 | Bandit | Purpose-built for Python, very accurate |
| 2 | Pysa | Taint analysis for injection vulnerabilities |
| 3 | CodeQL | Deep semantic analysis |
| 4 | Semgrep | Fast with Python-specific rulesets |
| 5 | Pylint | Code quality + some security |

### Best for JavaScript/Node.js Projects

| Rank | Tool | Reason |
|------|------|--------|
| 1 | CodeQL | Strong JS/TS support |
| 2 | Semgrep | Large JS ruleset |
| 3 | Snyk | Excellent npm/yarn SCA |
| 4 | OSV Scanner | Fast dependency scanning |
| 5 | StackHawk | API testing if applicable |

### Best for Java Projects

| Rank | Tool | Reason |
|------|------|--------|
| 1 | CodeQL | Deep Java analysis |
| 2 | Semgrep | Java rules available |
| 3 | OSV Scanner | Maven/Gradle SCA |
| 4 | CRDA | Java SCA via Red Hat |
| 5 | Snyk | Comprehensive SCA |

### Best for API Security

| Rank | Tool | Reason |
|------|------|--------|
| 1 | StackHawk | Best developer UX, OWASP coverage |
| 2 | NeuraLegion | AI-powered, low false positives |
| 3 | APIsec | Good for OpenAPI-first teams |
| 4 | EthicalCheck | No running app needed |

### Best for Enterprise Compliance

| Rank | Tool | Reason |
|------|------|--------|
| 1 | Veracode | Policy-based, strong compliance reports |
| 2 | Fortify | PCI-DSS, HIPAA, CWE mapping |
| 3 | Checkmarx One | Modern cloud SAST, broad language support |
| 4 | Black Duck | License compliance + SCA |

---

## Vulnerability Coverage by OWASP Top 10

| OWASP Category | Bandit | CodeQL | Semgrep | Snyk | StackHawk |
|----------------|--------|--------|---------|------|-----------|
| A01: Broken Access Control | — | ✅ | ✅ | — | ✅ |
| A02: Cryptographic Failures | ✅ | ✅ | ✅ | ✅ | ✅ |
| A03: Injection | ✅ | ✅ | ✅ | — | ✅ |
| A04: Insecure Design | — | ✅ | ✅ | — | — |
| A05: Security Misconfiguration | ✅ | ✅ | ✅ | ✅ | ✅ |
| A06: Vulnerable Components | — | — | — | ✅ | — |
| A07: Auth Failures | — | ✅ | ✅ | — | ✅ |
| A08: Software/Data Integrity | — | ✅ | ✅ | ✅ | — |
| A09: Logging Failures | — | ✅ | ✅ | — | — |
| A10: Server-Side Request Forgery | ✅ | ✅ | ✅ | — | ✅ |

---

## Integration Complexity

### Zero Configuration (copy workflow, done)

- Bandit
- DevSkim
- OSSAR
- Dependency Review
- Pylint

### Minimal Configuration (add 1-2 secrets)

- Semgrep (`SEMGREP_APP_TOKEN` optional)
- Snyk (`SNYK_TOKEN`)
- Debricked (`DEBRICKED_TOKEN`)
- Codacy (`CODACY_PROJECT_TOKEN`)
- OSV Scanner (no secrets)

### Medium Configuration (secrets + app setup)

- StackHawk (API key + `stackhawk.yml` config + running app)
- APIsec (secrets + OpenAPI spec)
- NeuraLegion (token + scan config)
- Frogbot (JFrog credentials)

### Complex Setup (enterprise configuration)

- Checkmarx (server URL, credentials, project config)
- Fortify (FoD or SSC configuration)
- Veracode (API credentials, policy configuration)
- Sysdig (token + image configuration)
- Synopsys (Polaris platform configuration)

---

## Cost Summary

### Always Free

| Tool | Notes |
|------|-------|
| Bandit | Open source |
| CodeQL | Free for public repos; GitHub Advanced Security for private |
| Pyre/Pysa | Open source |
| DevSkim | Open source |
| OSSAR | Free Microsoft tool |
| Dependency Review | Free GitHub feature |
| OSV Scanner | Open source (Google) |
| Pylint | Open source |
| AWS CFN/TF Validator | Free AWS tool (AWS account needed) |
| OSSF SLSA Generator | Open source |

### Free Tier Available

| Tool | Free Tier Limits |
|------|-----------------|
| Semgrep | Unlimited open-source scans; cloud dashboard limited |
| Snyk | 200 tests/month for open source; limited for private |
| Debricked | Limited scans/month for small teams |
| CRDA | Free with Red Hat account |
| Frogbot | Free JFrog tier; limited scan counts |
| StackHawk | Limited scans/month |
| APIsec | Limited API tests |
| NeuraLegion | Limited scans |
| EthicalCheck | Limited free scans |
| Codacy | Free for public repos; paid for private |

### Commercial Only

| Tool | Typical Use Case |
|------|-----------------|
| Checkmarx / Checkmarx One | Mid-to-large enterprise |
| Fortify | Regulated industries (finance, healthcare, defense) |
| Veracode | Enterprise with compliance requirements |
| JFrog SAST | Teams already using JFrog platform |
| Endor Labs | Advanced SCA with reachability analysis |
| Synopsys / Black Duck | Enterprise open-source management |
| Sysdig | Container-first organizations |
| Mayhem | Teams requiring fuzzing |
| Defender for DevOps | Organizations on Azure |
