var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

/**
 * Returns a list of all directories inside a given directory, including hidden
 *
 * @param {String} srcPath A directory path
 * @returns {String[]} List of directories in srcPath
 */
function getDirs(srcPath) {
  return fs.readdirSync(srcPath).filter(function isDirectory(file) {
    return fs.lstatSync(path.join(srcPath, file)).isDirectory();
  });
}

/**
 * Takes a string and colorizes characters up to, but not including the first
 * ':' character. If provided, the color argument must exist on the 'chalk' API:
 * https://github.com/chalk/chalk#colors
 *
 * @param {String} str A string of the pattern: "foo: bar"
 * @param {String} [color='green'] A color name
 * @returns {String}
 */
function colorizeCommitType(str, color = 'green') {
  return str.replace(/(^.+?)(:)/, chalk[color]('$1') + '$2');
}

var packageScopes = getDirs('./packages');
var otherScopes = ['root'];

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
    {
      value: 'release',
      name: colorizeCommitType(
        'release: version bumps, change log updates and release prep'
      ),
    },
  ],
  scopes: [...packageScopes, ...otherScopes],
  scopeOverrides: {
    feat: packageScopes,
    fix: packageScopes,
    refactor: packageScopes,
    test: packageScopes,
    perf: packageScopes,
    release: packageScopes,
  },
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
};
