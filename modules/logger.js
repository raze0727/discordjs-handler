const { default: chalk } = require("chalk")

module.exports = { log, warn, error }

function log(message) {
    console.log(chalk.green(`[Log] ${message}`));
}

function warn(message) {
    console.log(chalk.hex('#FFA500')(`[Warn] ${message}`));
}

function error(message) {
    console.log(chalk.red(`[Error] ${message}`));
}