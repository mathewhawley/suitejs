var path = require('path');
var fs = require('fs-extra');
var walk = require('walk');
var chalk = require('chalk');
var SVGO = require('svgo');
var svgoConfig = require('../svgo.json');

const DIR_INPUT = path.join(__dirname, '..', 'svg/raw');
const DIR_OUTPUT = path.join(__dirname, '..', 'svg/optim');

var svgo = new SVGO(svgoConfig);
var walker = walk.walk(DIR_INPUT, { followLinks: false });

walker.on('file', fileHandler);
walker.on('error', errorsHandler);
walker.on('end', endHandler);

/**
 * A 'walk' file event listener
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {String} root file location
 * @param {Object} stat file stats
 * @param {Function} next read next file
 */
function fileHandler(root, { name: filename }, next) {
  if (path.extname(filename) === '.svg') {
    processSvgFile(root, filename);
  }
  next();
}

/**
 * A 'walk' error event listener
 * https://git.daplie.com/Daplie/node-walk
 *
 * @param {String} root file location
 * @param {Object[]} stats list of errors
 * @param {Function} next read next <file></file>
 */
function errorsHandler(root, stats, next) {
  stats.forEach(function logError(n) {
    console.error(chalk.red(`[ERROR]: ${n.name}`));
    console.error(
      chalk.red(n.error.message || `${n.error.code}: ${n.error.path}`)
    );
  });
}

/**
 * A 'walk' end event listener
 * https://git.daplie.com/Daplie/node-walk
 */
function endHandler() {
  console.log(chalk.green('Finished optimizing SVG files.'));
}

/**
 * Read given file and pass data through to SVGO's optimize method
 *
 * @param {String} filepath
 * @param {String} filename
 */
function processSvgFile(filepath, filename) {
  var [, subDirs] = filepath.split(DIR_INPUT);
  var src = path.join(DIR_INPUT, subDirs, filename);
  var dest = path.join(DIR_OUTPUT, subDirs, filename);

  fs.readFile(src, function readFileCb(err, data) {
    if (err) {
      console.error(err);
    } else {
      svgo.optimize(data, writeFileTo(dest));
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
function writeFileTo(dest) {
  return function optimizeCb(result) {
    fs.outputFile(dest, result.data).catch(function outputFileError(err) {
      console.error(err);
    });
  };
}
