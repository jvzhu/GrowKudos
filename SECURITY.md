# Security Policy

## Supported Versions

GrowKudos is a collection of GitHub Actions workflow templates. We maintain the latest version on the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main) | :white_check_mark: |
| Older commits | :x: |

## Reporting a Vulnerability

If you discover a security vulnerability in a GrowKudos workflow template — for example, a workflow that could expose secrets, use an insecure action, or introduce a supply chain risk — please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please use one of the following:
- **GitHub's private vulnerability reporting**: [Report a vulnerability](https://github.com/jvzhu/GrowKudos/security/advisories/new) (preferred)
- **Email**: Open a GitHub issue marked `[SECURITY]` in the title if private reporting is unavailable

### What to Include

- Description of the vulnerability
- Which workflow file(s) are affected
- Potential impact
- Steps to reproduce or proof of concept (if applicable)
- Suggested fix (if you have one)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 7 days
- **Fix or mitigation**: As soon as possible, typically within 14 days for critical issues

### Scope

Security issues in scope:
- Workflows that expose secrets or credentials
- Workflows that could allow code injection
- Workflows that use compromised or malicious actions
- Insecure action version pinning that introduces supply chain risk

Out of scope:
- Vulnerabilities in the third-party security tools themselves (report to the tool vendor)
- General bugs or incorrect results from security tools

Thank you for helping keep GrowKudos and its users safe! 🔒
