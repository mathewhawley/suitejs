var path = require('path');
var prettier = require('prettier');

var prettierOpts = {
  singleQuote: true,
  trailingComma: 'es5',
};

/**
 * Populates component template with given data
 *
 * @param {String} viewBox
 * @param {String} name
 * @param {String} children
 * @returns {String}
 */
exports.component = function componentTemplate(viewBox, name, children) {
  return format(`
    import React from 'react';
    import IconBase from '@suitejs/icon-base';

    function ${name}(props) {
      return (
        <IconBase viewBox="${viewBox}" {...props}>
          ${children}
        </IconBase>
      );
    }

    export default ${name};
  `);
};

/**
 * Build an es module export statement. Export prefixed with root directory name
 *
 * @param {String} rootDir directory this file sits in
 * @param {String} subDirs directories from rootDir to this file
 * @param {String} filename name of this file
 * @returns {String}
 */
exports.exportStatement = function exportStatementTemplate(
  rootDir,
  subDirs,
  name
) {
  var filepath = path.join(subDirs, name);
  var nameSpace = capitalize(rootDir);
  return format(
    `export {default as ${nameSpace + name} } from './${filepath}';\n`
  );
};

/**
 * Format a string with Prettier
 * https://github.com/prettier/prettier#options
 *
 * @param {String} str javascript code string
 * @param {Object} [opts="prettierOpts"]
 * @returns {String}
 */
function format(str, opts = prettierOpts) {
  return prettier.format(str, opts);
}

/**
 * Capitalize the first letter of a string
 *
 * @param {String} str
 * @returns {String}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
