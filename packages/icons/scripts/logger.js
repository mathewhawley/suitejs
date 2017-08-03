var chalk = require('chalk');

exports.error = function logError(fnName, err) {
  console.error(chalk.white.bgRed(` [ERROR] ${fnName} \n`), err);
};

exports.success = function logError(msg) {
  console.log(chalk.black.bgGreen(` [DONE] `), msg);
};
