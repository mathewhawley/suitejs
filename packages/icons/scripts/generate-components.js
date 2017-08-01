var path = require('path');
var walk = require('walk');
var fs = require('fs-extra');
var cheerio = require('cheerio');
var templates = require('./templates');
var logger = require('./logger');

const DIR_INPUT = path.join(process.cwd(), 'svg/optim');
const DIR_OUTPUT = path.join(process.cwd(), 'src');

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
  createEntryPoint(...args);
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
    processSvgFile(root, name);
    appendToEntry(root, name);
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
 * Create an 'index.js' file in a top-level directory
 *
 * @param {String} pathname
 * @param {Object} stats directory stats
 * @param {Function} next read next directory
 */
function createEntryPoint(pathname, stats, next) {
  var [, subDirs] = pathname.split(DIR_INPUT);
  if (!subDirs) {
    let filepath = path.join(DIR_OUTPUT, stats.name, 'index.js');
    fs
      .ensureFile(filepath)
      .then(() => next())
      .catch(function ensureFileFail(err) {
        logger.error('createEntryPoint', err);
      });
  }
  next();
}

/**
 * Reads from SVG file, specifies file to write to
 *
 * @param {String} pathname
 * @param {String} filename
 */
function processSvgFile(pathname, filename) {
  var [, subDirs] = pathname.split(DIR_INPUT);
  var { name } = path.parse(filename);
  var srcFile = path.join(DIR_INPUT, subDirs, filename);
  var outFile = path.join(DIR_OUTPUT, subDirs, `${name}.js`);
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
 * Appends file export statement to entry file (created by createEntryPoint)
 *
 * @param {String} pathname
 * @param {String} filename
 */
function appendToEntry(pathname, filename) {
  var [, subDirs] = pathname.split(DIR_INPUT);
  var [, rootDir, ...rest] = subDirs.split('/');

  var entryFilepath = path.join(DIR_OUTPUT, rootDir, 'index.js');
  var { name } = path.parse(filename);

  var content = templates.exportStatement(rootDir, rest.join('/'), name);

  fs.appendFile(entryFilepath, content).catch(function appendFileError(err) {
    logger.error('appendFile', err);
  });
}
