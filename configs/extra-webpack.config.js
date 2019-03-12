const path = require('path');
const chalk = require('chalk');
const cwd = process.cwd();

console.log(chalk.blue('info'), chalk.gray('[extra-webpack.config.js]'), chalk.yellow('Applied extra webpack configurations!'));

function srcPath(subdir) {
	return path.join(cwd, 'src', subdir);
}

/**
 * These configs are merged with Angular CLI's webpack.config.js file.
 * See: https://codeburst.io/customizing-angular-cli-6-build-an-alternative-to-ng-eject-a48304cd3b21
 */
module.exports = {
	resolve: {
		alias: {
			theme: srcPath('app/theme'),
		},
	},
};