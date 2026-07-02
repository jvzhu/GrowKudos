'use strict';

/**
 * @jvzhu/growkudos
 *
 * A collection of 30+ GitHub Actions security scanning workflows for
 * comprehensive DevSecOps pipelines.
 *
 * @module @jvzhu/growkudos
 */

const path = require('path');
const fs = require('fs');

/**
 * Workflow metadata for all included security scanning tools.
 */
const WORKFLOWS = {
  // Static Application Security Testing (SAST)
  bandit: {
    name: 'Bandit',
    file: 'bandit.yml',
    category: 'sast',
    language: ['python'],
    description: 'Security linter for Python code',
    license: 'Apache-2.0',
    free: true,
  },
  codeql: {
    name: 'CodeQL',
    file: 'codeql.yml',
    category: 'sast',
    language: ['javascript', 'python', 'java', 'go', 'ruby', 'cpp', 'csharp'],
    description: "GitHub's semantic code analysis engine",
    license: 'Proprietary',
    free: true,
  },
  semgrep: {
    name: 'Semgrep',
    file: 'semgrep.yml',
    category: 'sast',
    language: ['javascript', 'python', 'java', 'go', 'ruby', 'typescript', 'php'],
    description: 'Fast, open-source static analysis for finding bugs and enforcing code standards',
    license: 'LGPL-2.1',
    free: true,
  },
  devskim: {
    name: 'DevSkim',
    file: 'devskim.yml',
    category: 'sast',
    language: ['multiple'],
    description: "Microsoft's security linter with IDE plugins",
    license: 'MIT',
    free: true,
  },
  pyre: {
    name: 'Pyre',
    file: 'pyre.yml',
    category: 'sast',
    language: ['python'],
    description: "Facebook's performant type-checker for Python",
    license: 'MIT',
    free: true,
  },
  pysa: {
    name: 'Pysa',
    file: 'pysa.yml',
    category: 'sast',
    language: ['python'],
    description: "Facebook's security-focused static analyzer for Python",
    license: 'MIT',
    free: true,
  },
  checkmarx: {
    name: 'Checkmarx',
    file: 'checkmarx.yml',
    category: 'sast',
    language: ['multiple'],
    description: 'Enterprise-grade SAST solution',
    license: 'Proprietary',
    free: false,
  },
  'checkmarx-one': {
    name: 'Checkmarx One',
    file: 'checkmarx-one.yml',
    category: 'sast',
    language: ['multiple'],
    description: 'Checkmarx cloud-native application security platform',
    license: 'Proprietary',
    free: false,
  },
  fortify: {
    name: 'Fortify',
    file: 'fortify.yml',
    category: 'sast',
    language: ['multiple'],
    description: 'Micro Focus Fortify static code analyzer',
    license: 'Proprietary',
    free: false,
  },
  ossar: {
    name: 'OSSAR',
    file: 'ossar.yml',
    category: 'sast',
    language: ['multiple'],
    description: 'Open Source Static Analysis Runner by Microsoft',
    license: 'MIT',
    free: true,
  },
  'jfrog-sast': {
    name: 'JFrog SAST',
    file: 'jfrog-sast.yml',
    category: 'sast',
    language: ['multiple'],
    description: 'JFrog Advanced Security static analysis',
    license: 'Proprietary',
    free: false,
  },
  pylint: {
    name: 'Pylint',
    file: 'pylint.yml',
    category: 'sast',
    language: ['python'],
    description: 'Python code quality and error checker',
    license: 'GPL-2.0',
    free: true,
  },

  // Dynamic Application Security Testing (DAST)
  neuralegion: {
    name: 'NeuraLegion (Bright)',
    file: 'neuralegion.yml',
    category: 'dast',
    language: ['multiple'],
    description: 'AI-powered DAST scanner for APIs and web apps',
    license: 'Proprietary',
    free: false,
  },
  'mayhem-for-api': {
    name: 'Mayhem for API',
    file: 'mayhem-for-api.yml',
    category: 'dast',
    language: ['multiple'],
    description: 'Automated API security testing using fuzz testing',
    license: 'Proprietary',
    free: false,
  },
  stackhawk: {
    name: 'StackHawk',
    file: 'stackhawk.yml',
    category: 'dast',
    language: ['multiple'],
    description: 'DAST scanner that runs in CI/CD',
    license: 'Proprietary',
    free: false,
  },
  'apisec-scan': {
    name: 'APIsec Scan',
    file: 'apisec-scan.yml',
    category: 'dast',
    language: ['multiple'],
    description: 'API security testing platform',
    license: 'Proprietary',
    free: false,
  },
  ethicalcheck: {
    name: 'EthicalCheck',
    file: 'ethicalcheck.yml',
    category: 'dast',
    language: ['multiple'],
    description: 'Automated API security testing',
    license: 'Proprietary',
    free: false,
  },

  // Dependency & Software Composition Analysis (SCA)
  'dependency-review': {
    name: 'Dependency Review',
    file: 'dependency-review.yml',
    category: 'sca',
    language: ['multiple'],
    description: "GitHub's built-in dependency vulnerability scanner for pull requests",
    license: 'MIT',
    free: true,
  },
  'osv-scanner': {
    name: 'OSV Scanner',
    file: 'osv-scanner.yml',
    category: 'sca',
    language: ['multiple'],
    description: "Google's open-source vulnerability scanner",
    license: 'Apache-2.0',
    free: true,
  },
  debricked: {
    name: 'Debricked',
    file: 'debricked.yml',
    category: 'sca',
    language: ['multiple'],
    description: 'Open source dependency management and security',
    license: 'Proprietary',
    free: false,
  },
  snyk: {
    name: 'Snyk Security',
    file: 'snyk-security.yml',
    category: 'sca',
    language: ['multiple'],
    description: 'Developer security platform for dependencies, containers, and IaC',
    license: 'Proprietary',
    free: false,
  },
  crda: {
    name: 'CRDA',
    file: 'crda.yml',
    category: 'sca',
    language: ['multiple'],
    description: 'Red Hat Code Ready Dependency Analytics',
    license: 'Apache-2.0',
    free: true,
  },
  endorlabs: {
    name: 'Endor Labs',
    file: 'endorlabs.yml',
    category: 'sca',
    language: ['multiple'],
    description: 'Dependency lifecycle management and security',
    license: 'Proprietary',
    free: false,
  },
  'frogbot-scan-pr': {
    name: 'Frogbot Scan PR',
    file: 'frogbot-scan-pr.yml',
    category: 'sca',
    language: ['multiple'],
    description: 'JFrog Frogbot scans pull requests for security issues',
    license: 'Apache-2.0',
    free: false,
  },
  'frogbot-scan-and-fix': {
    name: 'Frogbot Scan and Fix',
    file: 'frogbot-scan-and-fix.yml',
    category: 'sca',
    language: ['multiple'],
    description: 'JFrog Frogbot auto-fixes security vulnerabilities',
    license: 'Apache-2.0',
    free: false,
  },

  // Container Security
  'sysdig-scan': {
    name: 'Sysdig Secure',
    file: 'sysdig-scan.yml',
    category: 'container',
    language: ['docker'],
    description: 'Container and cloud security scanning',
    license: 'Proprietary',
    free: false,
  },
  'black-duck': {
    name: 'Black Duck',
    file: 'black-duck-security-scan-ci.yml',
    category: 'container',
    language: ['multiple'],
    description: 'Synopsys Black Duck open-source security and license compliance',
    license: 'Proprietary',
    free: false,
  },

  // Infrastructure as Code (IaC) Security
  'policy-validator-cfn': {
    name: 'Policy Validator (CloudFormation)',
    file: 'policy-validator-cfn.yml',
    category: 'iac',
    language: ['cloudformation'],
    description: 'AWS IAM policy validator for CloudFormation templates',
    license: 'Apache-2.0',
    free: true,
  },
  'policy-validator-tf': {
    name: 'Policy Validator (Terraform)',
    file: 'policy-validator-tf.yml',
    category: 'iac',
    language: ['terraform'],
    description: 'AWS IAM policy validator for Terraform configurations',
    license: 'Apache-2.0',
    free: true,
  },

  // Enterprise / Comprehensive Platforms
  veracode: {
    name: 'Veracode',
    file: 'veracode.yml',
    category: 'enterprise',
    language: ['multiple'],
    description: 'Enterprise application security testing platform',
    license: 'Proprietary',
    free: false,
  },
  'synopsys-action': {
    name: 'Synopsys Action',
    file: 'synopsys-action.yml',
    category: 'enterprise',
    language: ['multiple'],
    description: 'Synopsys application security testing',
    license: 'Proprietary',
    free: false,
  },
  'synopsys-io': {
    name: 'Synopsys IO',
    file: 'synopsys-io.yml',
    category: 'enterprise',
    language: ['multiple'],
    description: 'Synopsys Intelligent Orchestration for DevSecOps',
    license: 'Proprietary',
    free: false,
  },

  // Supply Chain Security
  'slsa-publish': {
    name: 'SLSA Generic Publisher',
    file: 'generator-generic-ossf-slsa3-publish.yml',
    category: 'supply-chain',
    language: ['multiple'],
    description: 'OSSF SLSA Level 3 provenance generation for supply chain security',
    license: 'Apache-2.0',
    free: true,
  },

  // Code Quality & Multi-purpose
  codacy: {
    name: 'Codacy',
    file: 'codacy.yml',
    category: 'quality',
    language: ['multiple'],
    description: 'Automated code quality and security reviews',
    license: 'Proprietary',
    free: false,
  },
  'defender-for-devops': {
    name: 'Microsoft Defender for DevOps',
    file: 'defender-for-devops.yml',
    category: 'enterprise',
    language: ['multiple'],
    description: 'Microsoft security scanning via Azure DevOps integration',
    license: 'Proprietary',
    free: false,
  },
};

/**
 * Returns the absolute path to the workflows directory.
 * @returns {string} Path to .github/workflows/
 */
function getWorkflowsDir() {
  return path.join(__dirname, '.github', 'workflows');
}

/**
 * Returns a list of all workflow names (keys).
 * @returns {string[]} Array of workflow identifiers
 */
function listWorkflows() {
  return Object.keys(WORKFLOWS);
}

/**
 * Returns all unique categories available.
 * @returns {string[]} Array of category names
 */
function getCategories() {
  return [...new Set(Object.values(WORKFLOWS).map((w) => w.category))];
}

/**
 * Returns workflows filtered by category.
 * @param {string} category - One of: sast, dast, sca, container, iac, enterprise, supply-chain, quality
 * @returns {Object} Filtered workflow metadata object
 */
function getWorkflowsByCategory(category) {
  return Object.fromEntries(
    Object.entries(WORKFLOWS).filter(([, w]) => w.category === category)
  );
}

/**
 * Returns workflows that support a given programming language.
 * @param {string} language - Language identifier (e.g. 'python', 'javascript')
 * @returns {Object} Filtered workflow metadata object
 */
function getWorkflowsByLanguage(language) {
  return Object.fromEntries(
    Object.entries(WORKFLOWS).filter(
      ([, w]) => w.language.includes(language) || w.language.includes('multiple')
    )
  );
}

/**
 * Returns only the free/open-source workflows.
 * @returns {Object} Free workflows metadata object
 */
function getFreeWorkflows() {
  return Object.fromEntries(Object.entries(WORKFLOWS).filter(([, w]) => w.free));
}

/**
 * Returns the full file path for a given workflow.
 * @param {string} workflowId - Workflow identifier key
 * @returns {string|null} Absolute path to the workflow file, or null if not found
 */
function getWorkflowPath(workflowId) {
  const workflow = WORKFLOWS[workflowId];
  if (!workflow) return null;
  const filePath = path.join(getWorkflowsDir(), workflow.file);
  return fs.existsSync(filePath) ? filePath : null;
}

/**
 * Returns the YAML content of a workflow file.
 * @param {string} workflowId - Workflow identifier key
 * @returns {string|null} YAML content, or null if not found
 */
function getWorkflowContent(workflowId) {
  const filePath = getWorkflowPath(workflowId);
  if (!filePath) return null;
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = {
  WORKFLOWS,
  getWorkflowsDir,
  listWorkflows,
  getCategories,
  getWorkflowsByCategory,
  getWorkflowsByLanguage,
  getFreeWorkflows,
  getWorkflowPath,
  getWorkflowContent,
};
