var path = require('path');
var prettier = require('prettier');
var commonTags = require('common-tags');

const CDN_URL =
  'https://cdn.rawgit.com/suitejs/suitejs/master/packages/icons/svg/';

var prettierOpts = {
  singleQuote: true,
  trailingComma: 'es5',
};

/**
 * Populates the head of an icon 'map' markdown file
 *
 * @param {String} title name of the icon set
 * @returns {String}
 */
exports.iconMap = function iconMapTemplate(title) {
  return commonTags.stripIndents`
    # ${title}

    | Icon | Name | Location |
    | --- | --- | --- |
  `;
};

/**
 * Builds a markdown table row for an icon set
 *
 * @example
 * | ![SpFacebook](https:// ... ) | `SpFacebook` | `@suitejs/icons/sp` |
 *
 * @param {String} filepath relative path to SVG file
 * @param {String} iconName namespaced SVG file name
 * @param {String} setName set that the icon belongs to
 * @returns {String}
 */
exports.iconMapRow = function iconMapRowTemplate(filepath, iconName, setName) {
  var img = `![${iconName}](${CDN_URL}${filepath})`;
  var exportedName = capitalize(iconName);
  var importPath = `@suitejs/icons/${setName}`;
  return `\n| ${img} | \`${exportedName}\` | \`${importPath}\` |`;
};

/**
 * Populates component template with given data
 *
 * @param {String} viewBox
 * @param {String} name
 * @param {String} htmlStr
 * @returns {String}
 */
exports.component = function componentTemplate(viewBox, name, htmlStr) {
  var children = htmlStr.replace('fill-opacity', 'fillOpacity');
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
 * @param {String} name file name
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
