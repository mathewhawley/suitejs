var path = require('path');
var fs = require('fs-extra');
var walk = require('walk');
var SVGO = require('svgo');
var logger = require('./logger');
var svgoConfig = require('../svgo.json');

const DIR_INPUT = path.join(process.cwd(), 'svg/raw');
const DIR_OUTPUT = path.join(process.cwd(), 'svg/optim');

var svgo = new SVGO(svgoConfig);
var walker = walk.walk(DIR_INPUT, { followLinks: false });

walker.on('file', fileHandler);
walker.on('error', errorsHandler);
walker.on('end', endHandler);

/**
 * A 'walk' file event listener. Will process SVG files
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {String} root file location
 * @param {Object} stat file stats
 * @param {Function} next read next file
 */
function fileHandler(root, { name }, next) {
  if (path.extname(name) === '.svg') {
    processSvgFile(root, name);
  }
  next();
}

/**
 * A 'walk' error event listener. Logs out all error messages
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {String} root file location
 * @param {Object[]} stats list of errors
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
  logger.success('Finished optimizing SVG files.');
}

/**
 * Read given file and pass data through to SVGO's optimize method
 *
 * @param {String} filepath
 * @param {String} filename
 */
function processSvgFile(filepath, filename) {
  var [, subDirs] = filepath.split(DIR_INPUT);
  var fileSrc = path.join(DIR_INPUT, subDirs, filename);
  var fileDest = path.join(DIR_OUTPUT, subDirs, filename);
  fs.readFile(fileSrc, function readFileCb(err, data) {
    if (err) {
      logger.error('readFileCb', err);
    } else {
      svgo.optimize(data, writeFileTo(fileDest));
    }
  });
}

/**
 * Creates a callback for SVGO's 'optimize' method. Writes the resulting data
 * to the given destination
 *
 * @param {String} dest write location
 * @returns {Function} optimizeCb 'svgo.optimize' callback
 */
function writeFileTo(fileDest) {
  return function optimizeCb(result) {
    fs.outputFile(fileDest, result.data).catch(function outputFileError(err) {
      logger.error('outputFileError', err);
    });
  };
}
