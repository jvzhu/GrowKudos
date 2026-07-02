# Security Scanning Best Practices

This guide provides recommendations for getting the most value from security scanning in your CI/CD pipeline.

---

## 1. Start with the Free Tier

Before investing in paid tools, implement the free baseline:

| Priority | Tool | Reason |
|----------|------|--------|
| 1 | **CodeQL** | Deep semantic SAST — catches complex vulnerabilities |
| 2 | **Dependency Review** | Blocks vulnerable dependencies in PRs — zero config |
| 3 | **Semgrep** (OSS rules) | Fast pattern-based SAST with community rules |
| 4 | **OSV Scanner** | Scheduled dependency scanning with broad DB coverage |

This free stack catches the majority of common vulnerabilities.

---

## 2. Layer Your Scanning

No single tool catches everything. Use multiple tools at different stages:

```
Developer → Push → PR → Merge → Deploy
              │     │     │        │
              │     │     │        └── Container scan (Sysdig)
              │     │     └────────── Full SAST (CodeQL)
              │     └──────────────── Dependency Review
              └────────────────────── IDE / Pre-commit (DevSkim)
```

---

## 3. Fail Fast, Fix Fast

**Do:**
- Block PRs on high/critical severity findings
- Surface findings in PR comments (not just the Security tab)
- Set up GitHub Security Advisories to track fixes

**Don't:**
- Fail builds on low-severity findings (this causes alert fatigue)
- Ignore findings indefinitely
- Disable security workflows to speed up CI

---

## 4. Manage False Positives

False positives are inevitable. Handle them systematically:

1. **Investigate first**: Confirm it is actually a false positive
2. **Suppress with context**: Use inline suppression comments that explain *why*:
   ```python
   result = subprocess.run(cmd, shell=True)  # nosec B602 - cmd is validated against allowlist
   ```
3. **Track suppressions**: Code review all `nosec`, `# nosemgrep`, `// lgtm` annotations
4. **Review periodically**: Suppressed findings should be re-evaluated quarterly

---

## 5. Use SARIF for Centralised Visibility

All GrowKudos workflows upload SARIF results to GitHub's Security tab. This gives you:

- Centralised finding management
- Deduplication across tools
- Historical trending
- GitHub Dependabot integration

---

## 6. Protect Your Secrets

Security scanning workflows often require API tokens:

- **Never hardcode tokens** in workflow files
- **Always use GitHub Secrets**: `${{ secrets.SNYK_TOKEN }}`
- **Rotate tokens regularly** (every 90 days)
- **Use minimum permissions**: Only grant secrets.read scope where needed
- **Audit secret access**: Review which workflows use which secrets

---

## 7. Permissions Principle of Least Privilege

All workflows should declare the minimum permissions needed:

```yaml
permissions:
  contents: read
  security-events: write
  actions: read  # only if needed
```

Avoid using `permissions: write-all` — it grants more access than any security tool needs.

---

## 8. Keep Action Versions Pinned (But Updated)

- Use specific version tags (e.g. `actions/checkout@v4`) rather than `@main` or `@master`
- Subscribe to Dependabot alerts for GitHub Actions to get notified of updates
- Review changelogs when updating action versions

---

## 9. Schedule Scans, Not Just PRs

Some vulnerability classes are only discovered over time (new CVEs against existing dependencies). Run scheduled scans weekly:

```yaml
schedule:
  - cron: '0 6 * * 1'  # Every Monday at 6am UTC
```

---

## 10. DAST Requires a Running Application

DAST workflows (StackHawk, NeuraLegion, etc.) test a live application. Best practices:

- Run DAST against a **staging environment** — never production
- Ensure test data is safe to scan (no real PII/PCI data)
- Use authentication configuration so the scanner can reach protected endpoints
- Rate-limit DAST to avoid overwhelming your staging environment

---

## 11. IaC Scanning Before Deployment

Always run IaC scanning (Terraform, CloudFormation) before applying infrastructure changes:

- Add IaC scanning as a PR gate — block merges with critical IaC issues
- Scan all IaC changes, not just new infrastructure
- Use separate policies for development and production environments

---

## 12. Document Your Security Posture

Maintain a `SECURITY.md` (already included in GrowKudos) that documents:

- Which security tools are in use
- How to report vulnerabilities
- SLAs for fixing security issues
- The team or individual responsible for security reviews

---

## 13. Dependency Management Hygiene

Beyond scanning, good dependency hygiene reduces your attack surface:

- Enable Dependabot for automated dependency updates
- Regularly prune unused dependencies
- Prefer well-maintained packages with active security policies
- Pin direct dependencies to specific versions in production

---

## 14. Treat Security Findings Like Bugs

Security findings should go through your normal bug-tracking process:

- Create issues for every confirmed finding
- Prioritise by severity (Critical → High → Medium → Low)
- Set fix SLAs: Critical: 24h, High: 7 days, Medium: 30 days, Low: 90 days
- Track progress in your sprint/backlog

---

## 15. Review Your Security Setup Periodically

Security tooling evolves quickly. Every quarter:

- Review which tools are in use and whether they're still providing value
- Check for new tools that may fill gaps in your current coverage
- Update action versions
- Re-evaluate suppressed/accepted risks
