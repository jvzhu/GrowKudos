# Tool Comparison Matrix

Use this matrix to choose the right security scanning tool for your project.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Supported |
| ❌ | Not supported |
| ⚠️ | Partial / limited support |
| 💲 | Paid feature |
| 🆓 | Free |

---

## SAST Comparison

| Feature | Bandit | CodeQL | Semgrep | DevSkim | Pyre/Pysa | OSSAR | Checkmarx | Fortify |
|---------|--------|--------|---------|---------|-----------|-------|-----------|---------|
| **Cost** | 🆓 | 🆓/💲 | 🆓/💲 | 🆓 | 🆓 | 🆓 | 💲 | 💲 |
| **Python** | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| **JavaScript** | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Java** | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Go** | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **C/C++** | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **C#** | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Ruby** | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **PHP** | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **SARIF upload** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Custom rules** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Taint analysis** | ❌ | ✅ | ⚠️ | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Secrets detection** | ⚠️ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **False positive rate** | Low | Low | Low | Medium | Low | Medium | Low | Low |
| **Analysis speed** | Fast | Slow | Fast | Fast | Medium | Medium | Slow | Slow |
| **Setup complexity** | Low | Low | Low | Low | Medium | Low | High | High |

---

## SCA Comparison

| Feature | Dep. Review | OSV Scanner | Snyk | Debricked | CRDA | Endor Labs | Frogbot |
|---------|-------------|-------------|------|-----------|------|------------|---------|
| **Cost** | 🆓 | 🆓 | 🆓/💲 | 💲 | 🆓 | 💲 | 💲 |
| **npm/Node.js** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Python (pip)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Java (Maven/Gradle)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Go modules** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ruby (Gems)** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **.NET (NuGet)** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Rust (Cargo)** | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Auto-fix PRs** | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ |
| **License compliance** | ❌ | ❌ | 💲 | ✅ | ❌ | ✅ | ✅ |
| **Reachability analysis** | ❌ | ❌ | 💲 | ❌ | ❌ | ✅ | ❌ |
| **PR blocking** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Policy management** | ⚠️ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **SBOM generation** | ❌ | ❌ | 💲 | ✅ | ❌ | ✅ | ❌ |
| **Setup complexity** | Low | Low | Low | Medium | Low | Medium | Medium |

---

## DAST Comparison

| Feature | NeuraLegion | Mayhem for API | StackHawk | APIsec | EthicalCheck |
|---------|-------------|----------------|-----------|--------|--------------|
| **Cost** | 💲 | 💲 | 💲 | 💲 | 💲 |
| **Web app scanning** | ✅ | ⚠️ | ✅ | ❌ | ❌ |
| **REST API scanning** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **GraphQL scanning** | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| **SOAP scanning** | ❌ | ✅ | ❌ | ✅ | ❌ |
| **Authentication support** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **OpenAPI/Swagger** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Zero-config** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **OWASP Top 10** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CI/CD integration** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **SARIF upload** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **False positive rate** | Low | Low | Medium | Low | Medium |
| **Setup complexity** | Medium | High | Medium | Medium | Low |

---

## Recommended Stacks by Project Type

### Python Web Application

| Priority | Tool | Purpose |
|----------|------|---------|
| 1 | Bandit | Python-specific SAST |
| 2 | CodeQL | Deep semantic SAST |
| 3 | Dependency Review | PR-time SCA |
| 4 | OSV Scanner | Scheduled SCA |
| 5 | Pysa | Taint analysis for web apps |
| Optional | StackHawk | DAST if app is deployed |

### Node.js / JavaScript Application

| Priority | Tool | Purpose |
|----------|------|---------|
| 1 | CodeQL | Deep SAST |
| 2 | Semgrep | Pattern-based SAST |
| 3 | Dependency Review | PR-time SCA |
| 4 | Snyk | Enhanced SCA with auto-fix |
| Optional | StackHawk | DAST if app is deployed |

### Java / Spring Application

| Priority | Tool | Purpose |
|----------|------|---------|
| 1 | CodeQL | Deep SAST |
| 2 | Semgrep | Pattern-based SAST |
| 3 | CRDA | Java-optimised SCA |
| 4 | Dependency Review | PR-time SCA |
| Optional | StackHawk | DAST |

### Microservices with Docker

| Priority | Tool | Purpose |
|----------|------|---------|
| 1 | CodeQL / Semgrep | Code SAST |
| 2 | Dependency Review | SCA |
| 3 | Sysdig / Black Duck | Container scanning |
| 4 | SLSA Publisher | Supply chain security |

### AWS Infrastructure

| Priority | Tool | Purpose |
|----------|------|---------|
| 1 | Policy Validator (CFN/TF) | IaC security |
| 2 | Snyk | IaC + dependency scanning |
| 3 | Defender for DevOps | Centralised findings |

---

## Cost Summary

| Tool | Free Tier | Entry Paid | Enterprise |
|------|-----------|-----------|------------|
| Bandit | Unlimited | — | — |
| CodeQL | Public repos | GitHub Advanced Security | GitHub Advanced Security |
| Semgrep | Community rules | Pro (~$40/dev/mo) | Contact |
| Snyk | 200 tests/mo | Team (~$25/dev/mo) | Contact |
| StackHawk | 1 app free | Starter (~$99/mo) | Contact |
| Checkmarx One | — | Contact | Contact |
| Veracode | — | Contact | Contact |
| Sysdig | Trial only | Contact | Contact |
| Codacy | Open-source free | Team (~$15/dev/mo) | Contact |

*Pricing is approximate and subject to change. Check vendor websites for current pricing.*
