# Security Scanning Best Practices

A guide to getting the most value from security scanning in your CI/CD pipeline while minimizing noise and developer friction.

---

## Table of Contents

- [Foundational Principles](#foundational-principles)
- [Choosing What to Scan](#choosing-what-to-scan)
- [Triggering Scans](#triggering-scans)
- [Handling Results](#handling-results)
- [Managing False Positives](#managing-false-positives)
- [Secrets Management](#secrets-management)
- [Branch Protection Integration](#branch-protection-integration)
- [Triage and Remediation](#triage-and-remediation)
- [Building a Security Culture](#building-a-security-culture)

---

## Foundational Principles

### 1. Shift Left

The earlier you find a vulnerability, the cheaper it is to fix:

```
Developer's IDE     PR check     Merge to main     Production
     |                 |               |                |
  Cheapest ────────────────────────────────────── Most Expensive
```

Configure tools to run on every PR so developers get feedback while the code is fresh in their minds.

### 2. Start Small, Expand Gradually

Don't add 10 tools at once. Developer frustration from excessive CI noise causes teams to ignore or bypass security tools.

**Recommended progression:**
1. **Week 1**: Add `dependency-review.yml` (PRs only, no false positives)
2. **Week 2**: Add `codeql.yml` or `bandit.yml` (tune before enforcing)
3. **Month 1**: Add SCA tool (Snyk or OSV Scanner)
4. **Quarter 1**: Evaluate results and add more coverage

### 3. Fix What You Find

Running scanners without acting on results provides false confidence. Establish a process:
- Assign ownership of security findings
- Include security debt in sprint planning
- Track metrics (new vs. resolved findings)

### 4. Use Multiple Tools

No single tool catches everything. A layered approach provides better coverage:

| Layer | Example Tools | What They Catch |
|-------|--------------|----------------|
| SAST | CodeQL + Semgrep | Code-level vulnerabilities |
| SCA | OSV Scanner + Dependency Review | Known vulnerable dependencies |
| DAST | StackHawk | Runtime vulnerabilities |
| Secrets | Built-in GitHub secret scanning | Committed credentials |

---

## Choosing What to Scan

### Scan Everything in Source Control

```yaml
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
```

### Exclude Non-Code Directories

Use path filters to skip scanning documentation, generated files, and test fixtures that generate noise:

```yaml
on:
  push:
    paths:
      - 'src/**'
      - 'lib/**'
    paths-ignore:
      - 'docs/**'
      - '*.md'
      - '.github/**'
      - 'tests/fixtures/**'
```

### Scan Dependencies Separately from Code

Run SAST and SCA tools in separate jobs:
- SAST tools (CodeQL, Bandit) can run in parallel
- SCA tools (OSV Scanner, Dependency Review) are usually faster

```yaml
jobs:
  sast:
    # CodeQL job
  sca:
    # OSV Scanner job
  # Run independently, don't make one depend on the other
```

---

## Triggering Scans

### Use Both Push and PR Triggers

```yaml
on:
  push:
    branches: [ "main" ]          # Scan committed code
  pull_request:
    branches: [ "main" ]          # Scan incoming changes
  schedule:
    - cron: '0 6 * * 1'           # Weekly for new CVEs in existing code
```

### Why Schedule Matters

Your code doesn't change, but vulnerability databases do. A dependency that was safe when you committed it may have a CVE published months later. Weekly scans catch these retroactive vulnerabilities.

### Skip Redundant Scans

Configure paths-ignore to skip scans when only documentation changes:

```yaml
on:
  push:
    paths-ignore:
      - '*.md'
      - 'docs/**'
      - '.gitignore'
      - 'LICENSE'
```

---

## Handling Results

### Use the GitHub Security Tab

All tools that output SARIF integrate with GitHub's Security tab:
- Centralized view of all findings
- Severity filtering
- Assignment to developers
- Dismissal with justification

### Prioritize by Severity

| Severity | Response Time | Action |
|----------|--------------|--------|
| Critical | Immediate | Block PRs, fix now |
| High | Same sprint | Fix before release |
| Medium | Next sprint | Schedule fix |
| Low | Backlog | Fix when convenient |
| Informational | Review | Accept or dismiss |

### Set Realistic Thresholds

For new projects, start with permissive thresholds and tighten over time:

```yaml
# Start: only fail on critical
- uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: critical

# After addressing critical issues, lower to high
    fail-on-severity: high

# Goal: fail on moderate
    fail-on-severity: moderate
```

---

## Managing False Positives

False positives are unavoidable. Here's how to manage them without degrading scan quality.

### Use Tool-Specific Suppressions

Each tool has a way to suppress specific findings:

**Bandit** — inline comment:
```python
result = subprocess.run(cmd, shell=True)  # nosec B602 - cmd is not user-controlled
```

**Semgrep** — inline comment:
```javascript
eval(safeTemplate)  // nosemgrep: dangerous-eval - template is validated before use
```

**CodeQL** — `.github/codeql/codeql-config.yml`:
```yaml
paths-ignore:
  - "tests/**"       # Don't scan test files
  - "vendor/**"      # Don't scan third-party code
```

### Document Suppressions

Always add a comment explaining WHY a finding is suppressed:
```python
# BAD: no explanation
hashlib.md5(data)  # nosec

# GOOD: explains the business reason
hashlib.md5(data)  # nosec B324 - MD5 used for non-security checksum (cache key only)
```

### Track Accepted Risks

Create a `SECURITY_EXCEPTIONS.md` file documenting accepted security risks:

```markdown
## Accepted Security Exceptions

| Rule | Location | Reason | Reviewer | Expires |
|------|----------|--------|---------|---------|
| B324 (MD5) | utils/cache.py | Non-security checksum | @reviewer | 2027-01 |
```

---

## Secrets Management

### Never Commit Secrets

Use GitHub Secrets for all sensitive values:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}  # Good
  # API_KEY: "sk_live_abc123"      # Never do this
```

### Use Minimum Required Permissions

Follow the principle of least privilege for workflow permissions:

```yaml
permissions:
  contents: read           # Minimum for checkout
  security-events: write   # Only if uploading SARIF
  # Don't add permissions you don't need
```

### Rotate Secrets Regularly

Establish a rotation schedule:
- API tokens: Every 6-12 months
- Service account tokens: Annually
- Immediately if potentially exposed

---

## Branch Protection Integration

Use branch protection rules to enforce security scanning as a merge gate:

1. Go to **Settings → Branches → Branch protection rules**
2. Add a rule for your main branch
3. Enable **Require status checks to pass before merging**
4. Select the security scan jobs

```yaml
# Required status checks to configure:
# - CodeQL / Python Analysis (required)
# - Dependency Review (required, PRs only)
# - Bandit Security Scan (required)
```

### Start with Non-Blocking Scans

When first introducing security scanning, use `continue-on-error: true` to avoid blocking developers:

```yaml
- name: Run Security Scan
  continue-on-error: true  # Review results before enforcing
```

Remove `continue-on-error` once you've tuned the tool and addressed initial findings.

---

## Triage and Remediation

### Security Finding Lifecycle

```
New Finding
    │
    ├─→ Confirm: Is this a real vulnerability?
    │       │
    │       ├─ No  → Dismiss with explanation (false positive)
    │       │
    │       └─ Yes → Is it exploitable in our context?
    │                   │
    │                   ├─ No  → Accept risk, document exception
    │                   │
    │                   └─ Yes → Fix it!
```

### Remediation SLAs

Establish and enforce SLAs for security fixes:

| Severity | SLA |
|----------|-----|
| Critical | 24 hours |
| High | 7 days |
| Medium | 30 days |
| Low | 90 days |

### Tracking Security Debt

Use GitHub Issues with a `security` label to track security findings:

```bash
# Create an issue from the Security tab finding
# Label: security, severity:high
# Assign to: responsible developer
# Due date: Set based on SLA
```

---

## Building a Security Culture

### Make Security Feedback Actionable

Good security feedback includes:
- What the vulnerability is
- Why it's a problem
- How to fix it
- A code example

CodeQL and Semgrep are especially good at providing remediation guidance alongside findings.

### Don't Block on Every Finding

Start with `continue-on-error: true` and only enforce blocking checks on high/critical findings. Developer buy-in is essential for sustainable security.

### Celebrate Security Improvements

Track and share metrics:
- Number of vulnerabilities found and fixed
- Mean time to remediate
- Coverage improvements
- CVEs caught before production

### Security as Code Review

Include security scanning results in code review discussions. Treat security findings the same as bugs — they belong in the definition of done.
