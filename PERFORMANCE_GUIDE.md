# Performance Guide

Tips and techniques for keeping security scanning fast without sacrificing coverage.

---

## Table of Contents

- [Understanding Scan Performance](#understanding-scan-performance)
- [Parallelization](#parallelization)
- [Caching Strategies](#caching-strategies)
- [Path Filtering](#path-filtering)
- [Trigger Optimization](#trigger-optimization)
- [Tool-Specific Optimizations](#tool-specific-optimizations)
- [Monitoring CI Performance](#monitoring-ci-performance)
- [Cost Optimization](#cost-optimization)

---

## Understanding Scan Performance

### Typical Scan Times

Understanding how long each category of scan takes helps set expectations:

| Tool | Typical Duration | Notes |
|------|-----------------|-------|
| Bandit | 30s – 2 min | Very fast; scales with code size |
| Semgrep | 1 – 5 min | Fast; depends on ruleset size |
| DevSkim | 30s – 2 min | Fast pattern matching |
| CodeQL | 5 – 30 min | Slow but thorough; scales with code size and complexity |
| OSV Scanner | 30s – 2 min | Fast; network-dependent |
| Dependency Review | 30s – 1 min | Fast GitHub native check |
| Snyk | 1 – 5 min | Depends on dependency tree size |
| StackHawk | 5 – 20 min | Depends on API surface area |

### The Biggest Performance Win: Parallelization

Run independent scans in parallel by putting them in separate jobs:

```yaml
jobs:
  bandit:          # Runs in parallel
    runs-on: ubuntu-latest
    ...
  
  codeql:          # Runs in parallel
    runs-on: ubuntu-latest
    ...
  
  osv-scanner:     # Runs in parallel
    runs-on: ubuntu-latest
    ...
```

Total pipeline time = slowest single job, not sum of all jobs.

---

## Parallelization

### Split by Category

```yaml
jobs:
  # SAST jobs run in parallel
  sast-bandit:
    runs-on: ubuntu-latest
    ...
  
  sast-codeql:
    runs-on: ubuntu-latest
    ...
  
  sast-semgrep:
    runs-on: ubuntu-latest
    ...
  
  # SCA jobs run in parallel (and parallel to SAST)
  sca-osv:
    runs-on: ubuntu-latest
    ...
  
  sca-dependency-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    ...
```

### Use CodeQL Matrix for Multi-Language Projects

CodeQL's matrix strategy runs language scans in parallel:

```yaml
jobs:
  codeql:
    strategy:
      matrix:
        language: [ 'python', 'javascript-typescript', 'java-kotlin' ]
      fail-fast: false    # Don't cancel other languages if one fails
    steps:
      - uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
```

---

## Caching Strategies

### Cache CodeQL Databases

CodeQL can cache its database between runs, dramatically reducing analysis time for large codebases:

```yaml
- name: Cache CodeQL database
  uses: actions/cache@v4
  with:
    path: ${{ runner.temp }}/codeql-db
    key: codeql-${{ matrix.language }}-${{ github.sha }}
    restore-keys: |
      codeql-${{ matrix.language }}-
```

### Cache Tool Installations

Avoid re-downloading tools on every run:

```yaml
- name: Cache pip packages
  uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: pip-${{ hashFiles('**/requirements.txt') }}
    restore-keys: pip-

- name: Install Bandit
  run: pip install bandit[toml]
```

### Cache Node Modules

For Node.js projects, cache `node_modules`:

```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: npm-

- name: Install dependencies
  run: npm ci
```

---

## Path Filtering

### Only Scan Relevant Files

Path filters prevent unnecessary workflow runs when only non-code files change:

```yaml
on:
  push:
    branches: [ "main" ]
    paths:
      # Only run when source code changes
      - 'src/**'
      - 'lib/**'
      - '*.py'
      - '*.js'
      - '*.ts'
      # Always run when dependencies change
      - 'requirements*.txt'
      - 'package*.json'
      - 'Pipfile*'
      - 'pom.xml'
      - 'go.sum'
    paths-ignore:
      # Skip documentation-only changes
      - 'docs/**'
      - '*.md'
      - '.github/ISSUE_TEMPLATE/**'
      - 'examples/**'
```

### Separate Triggers for Dependency Scans

Dependencies and code change on different cadences. Use separate path triggers:

```yaml
# Separate SCA trigger — only runs when dependencies change
on:
  push:
    paths:
      - 'requirements*.txt'
      - 'Pipfile.lock'
      - 'package-lock.json'
      - 'yarn.lock'
      - 'pom.xml'
      - 'go.sum'
      - 'Cargo.lock'
```

---

## Trigger Optimization

### Skip CI on Draft PRs

Avoid burning minutes on draft work-in-progress PRs:

```yaml
on:
  pull_request:
    types: [ opened, synchronize, reopened, ready_for_review ]

jobs:
  security:
    if: github.event.pull_request.draft == false
    ...
```

### Skip Dependabot PRs for Some Scans

Dependabot PRs don't need SAST scanning (it's updating dependencies, not your code):

```yaml
jobs:
  sast:
    if: github.actor != 'dependabot[bot]'
    ...
```

### Use `concurrency` to Cancel Stale Runs

Cancel in-progress runs when a newer commit arrives:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This is especially valuable for CodeQL, which can take 20+ minutes.

---

## Tool-Specific Optimizations

### CodeQL

**1. Use the right query pack:**
```yaml
# 'security-extended' is fastest for pure security
# 'security-and-quality' adds code quality rules (slower)
queries: security-extended
```

**2. Skip autobuild when possible:**
For interpreted languages (Python, Ruby, JavaScript), CodeQL doesn't need to build:
```yaml
# Remove the autobuild step for interpreted languages
# - name: Autobuild
#   uses: github/codeql-action/autobuild@v3
```

**3. Limit scan scope with config file:**
```yaml
# .github/codeql/codeql-config.yml
paths-ignore:
  - "tests/**"
  - "vendor/**"
  - "node_modules/**"
  - "**/*.test.py"
```

### Semgrep

**1. Run only relevant rulesets:**
```yaml
# Instead of all rules:
run: semgrep scan --config auto .

# Run specific rulesets:
run: semgrep scan --config "p/python" --config "p/owasp-top-ten" .
```

**2. Exclude test and generated files:**
```yaml
run: semgrep scan --config auto --exclude-rule tests --exclude "**/*.min.js" .
```

**3. Use `--jobs` for parallel scanning:**
```yaml
run: semgrep scan --config auto --jobs 4 .
```

### Bandit

**1. Skip specific tests that generate noise:**
```yaml
run: bandit -r . -s B101,B311,B324  # Skip assert, random, MD5 checks
```

**2. Use confidence filtering:**
```yaml
run: bandit -r . --confidence-level medium --severity-level medium
```

**3. Exclude test directories:**
```yaml
run: bandit -r . -x ./tests,./venv,./node_modules
```

### OSV Scanner

**1. Skip lockfile scanning if you only want manifest scanning:**
```yaml
run: osv-scanner --no-ignore -r .
```

**2. Scan specific directories only:**
```yaml
run: osv-scanner --recursive src/ lib/
```

---

## Monitoring CI Performance

### Track Workflow Duration

Use GitHub's built-in metrics to track scan duration over time:

1. Go to **Actions** tab
2. Select a workflow
3. Click **···** → **View workflow metrics** (if available)

Or use the GitHub API to extract timing data.

### Set Timeouts

Prevent stuck jobs from burning minutes indefinitely:

```yaml
jobs:
  codeql:
    timeout-minutes: 30    # Fail if CodeQL takes longer than 30 minutes
    ...
```

### Alert on Slow Scans

Add a step that warns if scans are taking too long:

```yaml
- name: Check scan duration
  if: always()
  run: |
    echo "Scan completed at $(date)"
    # Add duration tracking as needed
```

---

## Cost Optimization

### GitHub Actions Minutes

Private repositories consume Actions minutes. Optimize to reduce costs:

| Strategy | Savings |
|----------|---------|
| Parallelization | Reduces wall-clock time |
| Caching | Reduces setup time |
| Path filters | Skips unnecessary runs |
| Cancel in progress | Stops stale runs |
| Move slow scans to scheduled | Moves burden to off-peak |

### Split Fast and Slow Scans

Run fast scans on every commit; slow scans on a schedule:

```yaml
# Fast scans (< 2 min) — run on every PR and push
on:
  push:
  pull_request:

jobs:
  fast-scan:
    # Bandit, OSV Scanner, Dependency Review
    ...

---
# Slow scans (5-30 min) — run weekly
on:
  schedule:
    - cron: '0 6 * * 1'

jobs:
  deep-scan:
    # CodeQL, Semgrep (full ruleset), StackHawk
    ...
```

### Use Self-Hosted Runners for Expensive Scans

Self-hosted runners don't consume GitHub Actions minutes. If you have infrastructure available, consider running CodeQL or other expensive scans on self-hosted runners.

```yaml
jobs:
  codeql:
    runs-on: self-hosted    # Use your own runner
    ...
```

---

## Summary: Performance Checklist

- [ ] Jobs run in parallel (not sequentially)
- [ ] CodeQL uses appropriate query pack
- [ ] Dependencies are cached with `actions/cache`
- [ ] Path filters skip documentation-only changes
- [ ] `concurrency` cancels stale CodeQL runs
- [ ] Dependabot PRs skip SAST scans
- [ ] Draft PRs skip scans until ready
- [ ] `timeout-minutes` set on all jobs
- [ ] Slow scans moved to weekly schedule
- [ ] Test/vendor directories excluded from scans
