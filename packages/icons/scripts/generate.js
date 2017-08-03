/**
 * This script generates React icons from SVG files. Files are read from
 * <rootDir>/svg/ and outputs to <rootDir>/src/ following the same source
 * directory structure.
 *
 * Each icon set directory gets an index.js file and each icon is given
 * an export statement.
 *
 * It also generates a markdown file for each icon set under <rootDir>/docs/.
 * The markdown file has a table that displays each icon in the set.
 */

var path = require('path');
var walk = require('walk');
var fs = require('fs-extra');
var cheerio = require('cheerio');
var templates = require('./templates');
var logger = require('./logger');
var namespaces = require('./namespaces');

var cwd = process.cwd();

const DIR_INPUT = path.join(cwd, 'svg');
const DIR_OUTPUT = path.join(cwd, 'src');
const DIR_DOCS = path.join(cwd, 'docs');

var walker = walk.walk(DIR_INPUT, { followLinks: false });

walker.on('directory', directoryHandler);
walker.on('file', fileHandler);
walker.on('error', errorsHandler);
walker.on('end', endHandler);

/**
 * A 'walk' directory event listener
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {any} args
 */
function directoryHandler(...args) {
  createUtilityFiles(...args);
}

/**
 * A 'walk' file event listener. Will create React components from SVG files
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {String} root file location
 * @param {Object} stat file stats
 * @param {Function} next read next file
 */
function fileHandler(root, { name }, next) {
  if (path.extname(name) === '.svg') {
    let [, subdirs] = root.split(DIR_INPUT);
    processSvgFile(subdirs, name);
    addExportToEntry(subdirs, name);
    addRowToDoc(subdirs, name);
  }
  next();
}

/**
 * A 'walk' error event listener. Logs out all error messages
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {String} root file location
 * @param {Array} stats list of errors
 * @param {Function} next read next file
 */
function errorsHandler(root, stats, next) {
  stats.forEach(function logError(n) {
    logger.error(n.name, n.error.message || `${n.error.code}: ${n.error.path}`);
  });
  next();
}

/**
 * A 'walk' end event listener. Notifies when walk process is complete
 * https://git.daplie.com/Daplie/node-walk
 */
function endHandler() {
  logger.success('Finished generating components.');
}

/**
 * Creates utility files for an icon set
 *
 * @param {String} pathname
 * @param {Object} stats directory stats
 * @param {Function} next read next directory
 */
function createUtilityFiles(pathname, stats, next) {
  var [, subdirs] = pathname.split(DIR_INPUT);
  if (!subdirs) {
    createEntry(stats.name);
    createDoc(stats.name);
  }
  next();
}

/**
 * Create an index.js file for an icon set
 *
 * @param {String} dir sub-directory of DIR_INPUT
 * @return {Promise}
 */
function createEntry(dir) {
  var filepath = path.join(DIR_OUTPUT, dir, 'index.js');
  return fs.ensureFile(filepath).catch(function createSetIndexFail(err) {
    logger.error('createSetIndex', err);
  });
}

/**
 * Create an markdown file for an icon set
 *
 * @param {String} dir sub-directory of DIR_INPUT
 * @return {Promise}
 */
function createDoc(dir) {
  let filepath = path.join(DIR_DOCS, `${dir}.md`);
  return fs
    .outputFile(filepath, templates.iconMap(namespaces[dir]))
    .catch(function createDocFail(err) {
      logger.error('createDoc', err);
    });
}

/**
 * Reads from SVG file, specifies file to write to
 *
 * @param {String} subdirs sub-directories of DIR_INPUT
 * @param {String} filename
 */
function processSvgFile(subdirs, filename) {
  var { name } = path.parse(filename);
  var srcFile = path.join(DIR_INPUT, subdirs, filename);
  var outFile = path.join(DIR_OUTPUT, subdirs, `${name}.js`);
  fs.readFile(srcFile, 'utf-8', writeFile(outFile, name));
}

/**
 * Create callback for fs.readFile. Writes data to specified output file
 * https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md
 *
 * @param {String} outFile file path
 * @param {String} name name of file
 * @return {Promise}
 */
function writeFile(outFile, name) {
  return function readFileCb(err, data) {
    if (err) {
      logger.error('readFileCb', err);
      return;
    }
    fs
      .outputFile(outFile, buildComponent(data, name))
      .catch(function outputFileError(err) {
        logger.error('outputFileError', err);
      });
  };
}

/**
 * Extracts data from HTML string, returns populated component template string
 *
 * @param {String} data
 * @param {String} name
 * @returns {String}
 */
function buildComponent(data, name) {
  var $ = cheerio.load(data);
  var viewBox = $('svg').attr('viewBox');
  var children = $('svg').html();
  return templates.component(viewBox, name, children);
}

/**
 * Prepares data for adding icon export statement from icon set root directory
 *
 * @param {String} subdirs sub-directories of DIR_INPUT
 * @param {String} filename svg file
 */
function addExportToEntry(subdirs, filename) {
  var [, rootDir, ...rest] = subdirs.split('/');

  var entryFilepath = path.join(DIR_OUTPUT, rootDir, 'index.js');
  var { name } = path.parse(filename);

  var content = templates.exportStatement(rootDir, rest.join('/'), name);

  appendFile(entryFilepath, content);
}

/**
 * Prepares data for appending icon table row to markdown file
 *
 * @param {String} subdirs sub-directories of DIR_INPUT
 * @param {String} filename svg file
 */
function addRowToDoc(subdirs, filename) {
  var [, rootDir, ...rest] = subdirs.split('/');

  var mapFilepath = path.join(DIR_DOCS, `${rootDir}.md`);
  var { name } = path.parse(filename);
  var svgSrc = path.join(rootDir, rest.join('/'), `${name}.svg`);

  var content = templates.iconMapRow(svgSrc, rootDir + name, rootDir);

  appendFile(mapFilepath, content);
}

/**
 * Appends data to given filepath
 *
 * @param {String} filepath
 * @param {String} data
 */
function appendFile(filepath, data) {
  fs.appendFile(filepath, data).catch(function appendFileError(err) {
    logger.error('appendFileError', err);
  });
}
