# Performance Guide

Tips for keeping security scanning fast in your CI/CD pipeline.

---

## Why Performance Matters

Security scanning can add 5–30+ minutes to your CI pipeline if not managed well. Long pipelines frustrate developers, cause people to skip security checks, or lead to skipping CI entirely. This guide shows how to keep scanning fast and efficient.

---

## 1. Run Jobs in Parallel

GitHub Actions runs jobs in parallel by default when they have no dependencies. Structure your security workflow so tools run concurrently:

```yaml
jobs:
  codeql:      # runs in parallel with semgrep and dependency-review
    ...
  semgrep:     # runs in parallel with codeql and dependency-review
    ...
  dependency-review:  # runs in parallel with codeql and semgrep
    ...
```

**Impact:** Reduces total pipeline time by the duration of your slowest tool, not the sum.

---

## 2. Cache Dependencies

Tools that install packages (pip, npm) benefit significantly from caching:

```yaml
- name: Set up Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'
    cache: 'pip'  # Caches pip packages automatically

- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # Caches npm packages automatically
```

For tools installed via pip:

```yaml
- name: Cache Semgrep
  uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: ${{ runner.os }}-semgrep-${{ hashFiles('**/requirements-security.txt') }}
    restore-keys: ${{ runner.os }}-semgrep-

- name: Install Semgrep
  run: pip install semgrep
```

---

## 3. Use `paths` Filters to Skip Unnecessary Runs

If security-relevant code hasn't changed, skip the scan:

```yaml
on:
  push:
    branches: [ "main" ]
    paths:
      - '**.py'
      - '**.js'
      - '**.ts'
      - 'requirements*.txt'
      - 'package*.json'
      - '.github/workflows/**'
```

> **Warning:** Don't add `paths` filters to your dependency review workflow — you want to catch every dependency change.

---

## 4. Separate Fast and Slow Scans

Split workflows by speed:

**Fast (< 2 min) — run on every PR:**
- Dependency Review
- Bandit (Python)
- DevSkim

**Medium (2–5 min) — run on every PR:**
- Semgrep
- CodeQL (small repos)
- OSV Scanner

**Slow (5+ min) — run on merge to main or on schedule:**
- CodeQL (large repos)
- Enterprise SAST (Checkmarx, Fortify, Veracode)
- DAST (StackHawk, NeuraLegion)

---

## 5. Matrix Builds for Multi-Language Repos

Use a matrix to scan multiple languages in parallel:

```yaml
strategy:
  fail-fast: false
  matrix:
    language: [ 'python', 'javascript', 'java' ]
```

This runs CodeQL for all three languages simultaneously rather than sequentially.

---

## 6. Concurrency Control

Prevent redundant scans when multiple pushes happen quickly:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This cancels the previous scan when a new push is made to the same branch.

---

## 7. Optimise CodeQL Build Steps

For compiled languages, CodeQL's autobuild is convenient but can be slow. Override it for faster builds:

```yaml
- name: Build (optimised)
  run: |
    # Skip tests during CodeQL analysis
    mvn -B package -DskipTests
    # or
    gradle assemble
```

---

## 8. Use `fail-fast: false` in Strategy Matrices

Prevent one language failure from cancelling all other language scans:

```yaml
strategy:
  fail-fast: false  # Don't cancel siblings on failure
  matrix:
    language: [ 'python', 'javascript' ]
```

---

## 9. Set Reasonable Timeouts

Prevent stuck scans from blocking your pipeline indefinitely:

```yaml
jobs:
  codeql:
    timeout-minutes: 30  # Cancel if it takes longer than 30 minutes
    ...
```

---

## 10. Monitor Pipeline Duration Over Time

Track your security pipeline duration using GitHub Actions metrics or a dashboard. If scanning time increases significantly:

- Check for new dependencies that slow down tool initialization
- Review whether cache is being hit (look for "Cache restored" log messages)
- Consider moving slow tools to scheduled scans only

---

## Benchmark: Expected Scan Times

| Tool | Small repo (<10k LOC) | Medium repo (10k–100k LOC) | Large repo (>100k LOC) |
|------|----------------------|---------------------------|------------------------|
| Bandit | ~30s | ~1 min | ~3 min |
| CodeQL (Python) | ~2 min | ~5 min | ~15+ min |
| CodeQL (JavaScript) | ~3 min | ~7 min | ~20+ min |
| Semgrep | ~1 min | ~2 min | ~5 min |
| DevSkim | ~30s | ~1 min | ~2 min |
| Dependency Review | ~30s | ~1 min | ~2 min |
| OSV Scanner | ~1 min | ~2 min | ~3 min |

*Times are approximate and depend on runner speed, network, and project complexity.*

---

## Quick Wins Checklist

- [ ] All independent security jobs run in parallel (no unnecessary `needs:` dependencies)
- [ ] Python setup uses `cache: 'pip'`
- [ ] Node.js setup uses `cache: 'npm'`
- [ ] `paths:` filters added where appropriate
- [ ] `concurrency:` with `cancel-in-progress: true` set
- [ ] Slow tools (DAST, enterprise SAST) moved to scheduled runs
- [ ] `fail-fast: false` set on matrix strategies
- [ ] Job-level `timeout-minutes:` set
