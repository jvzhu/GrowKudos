## Description

<!-- Briefly describe what this PR does -->

## Type of Change

- [ ] New workflow (adding a new security tool)
- [ ] Workflow update (fixing or improving an existing workflow)
- [ ] Documentation update
- [ ] New example
- [ ] Other (describe below)

## Workflow Details (for new/updated workflows)

**Workflow file:** `.github/workflows/[filename].yml`  
**Tool name:**  
**Tool category:** SAST / SCA / DAST / Container / IaC / Quality / Other  
**Tool website:**  
**Secrets required:** (list any `${{ secrets.* }}` values needed, or "None")

## Testing

- [ ] I have tested this workflow on a real repository
- [ ] The workflow runs successfully end-to-end
- [ ] SARIF upload works (if applicable)
- [ ] Tested on both passing and failing scan scenarios

## Documentation Updated

- [ ] Added tool to `TOOLS.md`
- [ ] Added/updated entry in `README.md`
- [ ] Added section to `TOOLS_GUIDE.md`
- [ ] Added row to `COMPARISON_MATRIX.md`
- [ ] Not applicable (documentation-only PR)

## Quality Checklist

- [ ] No hardcoded secrets or credentials
- [ ] `permissions:` block uses minimum required permissions
- [ ] Uses `actions/checkout@v4` or later
- [ ] Comment header describes the tool with links
- [ ] Follows naming convention (`tool-name.yml`, kebab-case)

## Related Issues

Closes #(issue number)

## Additional Notes

<!-- Any other context, screenshots, or information -->
