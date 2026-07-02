# Frequently Asked Questions

Answers to common questions about GrowKudos and security scanning with GitHub Actions.

---

## General Questions

### What is GrowKudos?

GrowKudos is a curated collection of 42+ GitHub Actions workflow templates for application security scanning. Copy workflows to your `.github/workflows/` directory to instantly add security scanning to any repository.

### Is GrowKudos free to use?

Yes — GrowKudos itself is MIT-licensed and free. However, many of the security tools it references have their own pricing. See the [Cost Summary in COMPARISON_MATRIX.md](COMPARISON_MATRIX.md#cost-summary) for details on which tools are free vs. commercial.

### Do I need to install any software?

No. GitHub Actions run in the cloud. You just need to add a `.yml` file to your repository and GitHub handles everything else.

### Will these workflows work on private repositories?

Most workflows work on both public and private repositories. CodeQL requires **GitHub Advanced Security** for private repositories. Other free tools (Bandit, OSV Scanner, Dependency Review, Semgrep, etc.) work on private repos without any additional subscription.

---

## Getting Started Questions

### Which tool should I start with?

For most projects:
1. **`codeql.yml`** — Deep code analysis, no setup needed
2. **`dependency-review.yml`** — Immediate dependency security on PRs
3. **`osv-scanner.yml`** — Broader dependency scanning

For Python projects, also add `bandit.yml`. See [GETTING_STARTED.md](GETTING_STARTED.md).

### How do I add a workflow to my repository?

1. Create the directory: `mkdir -p .github/workflows/`
2. Copy the desired `.yml` file into that directory
3. Commit and push

The workflow runs automatically on the next push or PR. See [GETTING_STARTED.md](GETTING_STARTED.md) for detailed instructions.

### How many workflows can I add?

There's no limit from GitHub's side. However, running many concurrent workflow jobs may slow down your CI or consume GitHub Actions minutes quickly for private repos. Start with 2-3 tools and expand from there.

---

## Configuration Questions

### Do I need to modify the workflow files?

For most free tools (CodeQL, Bandit, OSV Scanner), you can use the files as-is. You may want to customize:
- The `language:` field in CodeQL to match your project's languages
- The trigger events (`on:` block) to match your branch names
- The schedule (cron expression) if you want different scan timing

### Where do I store API keys and tokens?

In GitHub Secrets: **Settings → Secrets and variables → Actions → New repository secret**

Never put tokens directly in workflow files. Always use `${{ secrets.SECRET_NAME }}`.

### How do I change which branches trigger a scan?

Edit the `on:` section:

```yaml
on:
  push:
    branches: [ "main", "develop", "staging" ]
  pull_request:
    branches: [ "main" ]
```

### Can I run scans only on changed files?

Yes, use path filters:

```yaml
on:
  push:
    paths:
      - '**.py'           # Only Python files
      - 'requirements*.txt'
    paths-ignore:
      - 'docs/**'
      - '*.md'
```

---

## Results Questions

### Where do I see scan results?

- **SARIF-compatible tools**: Results appear in **Security tab → Code scanning alerts**
- **Other tools**: Results appear in the **Actions tab** job logs
- **Dependency scanning tools**: May also appear in **Security tab → Dependabot**

### Why is the Security tab not showing results?

Common reasons:
1. The workflow hasn't run yet (push a commit to trigger it)
2. The workflow failed — check the Actions tab for errors
3. The `permissions: security-events: write` is missing from the workflow
4. You're on a private repository without GitHub Advanced Security (for some tools)

### My scan found many issues. What do I do?

Don't panic! Start with **Critical** and **High** severity findings. Common approaches:

1. **Fix immediately**: Genuine security vulnerabilities in production code
2. **Accept risk**: Business decision to acknowledge known issue
3. **Suppress / ignore**: False positives (see tool-specific ignore files)
4. **Track as technical debt**: Create issues for Low/Medium findings

### How do I suppress false positives?

Each tool has its own ignore mechanism:

**Bandit:**
```python
subprocess.call(args)  # nosec B603
```

**Semgrep:**
```javascript
dangerous_function(); // nosemgrep
```

**CodeQL:** Use `.github/codeql/codeql-config.yml` to add paths to ignore.

**OSV Scanner:** Create `.osv-scanner-ignore.json` in your repo.

---

## Tool-Specific Questions

### CodeQL is slow. Can I speed it up?

Yes, several options:
1. Only scan changed languages (not all languages in the matrix)
2. Use path filters to skip documentation and test files
3. Cache the CodeQL database between runs
4. Reduce query set (`security-and-quality` is thorough; `security-extended` is slightly faster)

See [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) for more tips.

### Bandit has too many false positives. How do I reduce them?

Configure Bandit with a `.bandit` config file:

```ini
[bandit]
skips: B101,B311  # Skip assert statements and pseudo-random generators in tests
exclude: tests,docs,venv
```

Or use severity/confidence filtering in the workflow:
```bash
bandit -r . --severity-level medium --confidence-level medium
```

### Can I use multiple tools of the same category?

Yes! Using multiple SAST tools is common because they catch different vulnerability patterns. For example:
- CodeQL for deep semantic analysis
- Semgrep for fast pattern matching
- Bandit for Python-specific checks

The results are aggregated in the Security tab.

### Which DAST tool should I use?

If you're new to DAST: **StackHawk** — best developer experience, good documentation, free tier.

If you need no running application: **EthicalCheck** — can test from an OpenAPI spec.

If you want AI-powered scanning: **NeuraLegion (Bright)** — low false-positive rate.

---

## GitHub Actions Questions

### What is SARIF?

SARIF (Static Analysis Results Interchange Format) is a JSON-based format for static analysis results. GitHub natively understands SARIF and displays results in the Security tab. Most modern security tools support SARIF output.

### My workflow fails with "Resource not accessible by integration"

This typically means missing permissions. Add to your workflow:
```yaml
permissions:
  contents: read
  security-events: write
```

### Can I run these workflows on self-hosted runners?

Yes, change `runs-on: ubuntu-latest` to `runs-on: self-hosted` (or your custom runner label). Ensure the runner has internet access to download the required Docker images and tools.

### How do I see how many GitHub Actions minutes I'm using?

Go to **Settings → Billing → Usage this month** to see Actions minutes consumed. Public repos have unlimited free minutes; private repos have a monthly allowance.

### What's the difference between `push` and `pull_request` triggers?

- **`push`**: Runs after code is committed to the branch
- **`pull_request`**: Runs on PR creation and updates, can block merges

For security scanning, use both: `pull_request` to catch issues before merge, `push` to scan the main branch.

---

## Contributing Questions

### How do I add a new tool workflow?

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions. The short version:

1. Fork the repository
2. Create `.github/workflows/tool-name.yml` following the template
3. Update `TOOLS.md`, `README.md`, `TOOLS_GUIDE.md`, and `COMPARISON_MATRIX.md`
4. Open a pull request

### I found a broken workflow. How do I report it?

Open an issue using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md). Include the workflow filename, error message, and your repository context.

### Can I contribute documentation improvements?

Absolutely! Documentation improvements are very welcome. Open a PR with your changes. No need to open an issue first for small fixes.
