var chalk = require('chalk');

var packageScopes = [];
var otherScopes = ['root'];

/**
 * Takes a string and optional color and colorizes characters up to, but not
 * including including the first ':'
 *
 * If provided, the color must exist on the 'chalk' API:
 * https://github.com/chalk/chalk#colors
 */
function colorizeCommitType(str, color = 'blue') {
  return str.replace(/(.+)(:)/, chalk[color]('$1') + '$2');
}

module.exports = {
  types: [
    {
      value: 'feat',
      name: colorizeCommitType('feat: add or change a feature'),
    },
    {
      value: 'fix',
      name: colorizeCommitType('fix: a bug fix'),
    },
    {
      value: 'refactor',
      name: colorizeCommitType(
        'refactor: a change that neither fixes a bug or adds/changes a feature – includes formatting changes'
      ),
    },
    {
      value: 'test',
      name: colorizeCommitType('test: add/update tests'),
    },
    {
      value: 'docs',
      name: colorizeCommitType('docs: documentation additions/changes'),
    },
    {
      value: 'chore',
      name: colorizeCommitType(
        'chore: changes to tooling/project configuration'
      ),
    },
    {
      value: 'perf',
      name: colorizeCommitType('perf: changes that improve performance'),
    },
  ],
  scopes: [...packageScopes, ...otherScopes],
  scopeOverrides: {
    feat: packageScopes,
    fix: packageScopes,
    refactor: packageScopes,
    test: packageScopes,
    perf: packageScopes,
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
};
