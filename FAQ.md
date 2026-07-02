# Frequently Asked Questions

## General

### What is GrowKudos?

GrowKudos is a curated collection of GitHub Actions workflow templates for application security scanning. It includes 30+ workflows covering SAST, DAST, SCA, container security, IaC scanning, and more. It is also published as an npm package (`@jvzhu/growkudos`) for programmatic access to workflow metadata.

### Who is GrowKudos for?

GrowKudos is for:
- **Developers** who want to add security scanning to their CI/CD pipeline quickly
- **DevSecOps engineers** building standardised security pipelines across multiple repositories
- **Security teams** who need a reference for available GitHub Actions security tools
- **Open-source maintainers** who want to add security scanning without extensive research

### Is GrowKudos free to use?

Yes, GrowKudos itself is MIT licensed. However, many of the security tools it provides workflows for are commercial products that require paid subscriptions. See the [Free vs. Paid Tools](README.md#free-vs-paid-tools) section for details.

---

## Using Workflows

### How do I add a workflow to my repository?

1. Browse the [`.github/workflows/`](.github/workflows/) directory
2. Find the workflow for your chosen tool
3. Copy the YAML file into your repository at `.github/workflows/<name>.yml`
4. Commit and push

That's it — GitHub Actions picks it up automatically.

### Can I use multiple workflows together?

Yes! Most workflows are independent and can run in parallel. See the [comprehensive-setup.yml](examples/comprehensive-setup.yml) example for a multi-tool pipeline.

### Do I need to configure anything?

Most free tools work out of the box. Paid tools require API keys stored as GitHub Secrets. See [GETTING_STARTED.md](GETTING_STARTED.md) for the list of required secrets.

### Where do I see the security findings?

All GrowKudos workflows upload results to GitHub's Security tab in SARIF format. Go to **your-repo → Security → Code scanning alerts**.

### Can I run workflows on pull requests only?

Yes, you can edit the `on:` trigger in any workflow. To run only on pull requests:

```yaml
on:
  pull_request:
    branches: [ "main" ]
```

### Can I run workflows on a schedule?

Yes. All included workflows support a `schedule:` trigger. To scan weekly on Monday at 6am UTC:

```yaml
on:
  schedule:
    - cron: '0 6 * * 1'
```

---

## npm Package

### Why is there an npm package for GitHub Actions workflows?

The npm package provides programmatic access to workflow metadata and file contents. This is useful for:
- Automation scripts that install security workflows across multiple repositories
- Build tools that dynamically configure security scanning
- Querying which tools support a given language or are free

### How do I install the npm package?

```bash
# Configure the registry
echo "@jvzhu:registry=https://npm.pkg.github.com" >> .npmrc

# Authenticate (requires GitHub token with read:packages scope)
npm login --scope=@jvzhu --registry=https://npm.pkg.github.com

# Install
npm install @jvzhu/growkudos
```

### Do I need a GitHub token to install the package?

Yes. GitHub Packages requires authentication even for public packages. You need a Personal Access Token (PAT) with `read:packages` scope. See [npm-USAGE.md](npm-USAGE.md) for details.

### Can I use the package in GitHub Actions?

Yes. In a GitHub Actions workflow, you can use `${{ secrets.GITHUB_TOKEN }}` to authenticate:

```yaml
- run: |
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc
    npm install @jvzhu/growkudos
```

---

## Security Findings

### I'm getting false positives. What should I do?

Most tools support configuration to suppress false positives:

- **Bandit**: Use `# nosec B101` inline comments or a `.bandit` config file
- **CodeQL**: Use `// lgtm[...]` annotations or a `codeql-config.yml` file
- **Semgrep**: Use `# nosemgrep:` inline annotations or `.semgrepignore`
- **DevSkim**: Add suppression comments per the DevSkim documentation

### How do I set a minimum severity threshold?

For **Dependency Review**:
```yaml
- uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: high  # critical, high, medium, low
```

For **Bandit**, use the `level` parameter in the workflow configuration.

### My workflow failed — how do I debug it?

1. Go to **Actions** tab in your repository
2. Click the failed workflow run
3. Expand the failed step to see the full log output
4. Check for missing secrets (look for `Error: secret not found`)
5. Check the tool documentation for the specific error message

---

## Contributing

### How do I add a new workflow?

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. The short version:
1. Fork the repository
2. Add the workflow to `.github/workflows/`
3. Update `index.js` with the tool metadata
4. Update `README.md`, `TOOLS.md`, `TOOLS_GUIDE.md`, and `COMPARISON_MATRIX.md`
5. Submit a pull request

### I found a bug in a workflow — where do I report it?

Open an issue using the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Can I request a new tool?

Yes! Open an issue using the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

---

## Licensing

### What license is GrowKudos under?

GrowKudos is MIT licensed. See [LICENSE](LICENSE).

### What about the tools the workflows use?

Each tool has its own license. The workflow files themselves are MIT licensed (as part of GrowKudos), but the security scanning tools they invoke are subject to their own terms. See [TOOLS_GUIDE.md](TOOLS_GUIDE.md) for individual tool licenses.
