## Description

<!-- Describe what this PR does. If it adds a new workflow, explain the tool. -->

## Type of Change

- [ ] New workflow (adds a new security scanning tool)
- [ ] Workflow improvement (updates/fixes an existing workflow)
- [ ] Documentation update
- [ ] npm package change (index.js, package.json)
- [ ] Bug fix
- [ ] Other (describe below)

## Checklist

### For new workflows
- [ ] Workflow is placed in `.github/workflows/`
- [ ] Workflow file name matches the tool name (e.g. `trivy.yml`)
- [ ] Workflow has `push`, `pull_request`, and optionally `schedule` triggers
- [ ] Workflow uses `permissions:` to restrict the GITHUB_TOKEN
- [ ] No hardcoded secrets — all credentials use `${{ secrets.* }}`
- [ ] Workflow uploads SARIF results to GitHub Security tab (if supported)
- [ ] Workflow uses latest stable action versions (e.g. `actions/checkout@v4`)
- [ ] `index.js` updated with the new workflow metadata
- [ ] `TOOLS_GUIDE.md` updated with documentation for the new tool
- [ ] `COMPARISON_MATRIX.md` updated if applicable
- [ ] `README.md` tool matrix updated
- [ ] `CHANGELOG.md` updated

### For all PRs
- [ ] I have read [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] I have tested this change
- [ ] I have updated relevant documentation

## Related Issues

<!-- Link related issues: Closes #123, Fixes #456 -->

## Additional Notes

<!-- Any extra context reviewers should know -->
