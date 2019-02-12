#!/usr/bin/env node
import { _ } from 'streamline-runtime';
import { help, alias, options, argv, Arguments } from 'yargs';
import { createIcons } from './helpers';

interface IArgs extends Arguments {
	androidSrc?: string;
	androidOutput?: string;
	iosSrc?: string;
	iosOutput?: string;
	webSrc?: string;
	webOutput?: string;
	windowsSrc?: string;
	windowsOutput?: string;
	platform?: Array<string>;
}

help('h');
alias('h', 'help');
options({
	as: {
		alias: 'androidSrc',
		nargs: 1,
		describe: 'Source of android icon file',
		default: './icon-android.png',
		normalize: true
	},
	ao: {
		alias: 'androidOutput',
		nargs: 1,
		describe: 'Output path where android icons will be saved',
		default: './assets/android/icons/',
		normalize: true
	},
	is: {
		alias: 'iosSrc',
		nargs: 1,
		describe: 'Source of ios icon file',
		default: './icon-ios.png',
		normalize: true
	},
	io: {
		alias: 'iosOutput',
		nargs: 1,
		describe: 'Output path where ios icons will be saved',
		default: './assets/ios/icons/',
		normalize: true
	},
	websrc: {
		alias: 'webSrc',
		nargs: 1,
		describe: 'Source of web icon file',
		default: './icon-android.png',
		normalize: true
	},
	webout: {
		alias: 'webOutput',
		nargs: 1,
		describe: 'Output path where web icons will be saved',
		default: './assets/web/icons/',
		normalize: true
	},
	winsrc: {
		alias: 'windowsSrc',
		nargs: 1,
		describe: 'Source of windows icon file',
		default: './icon-android.png',
		normalize: true
	},
	winout: {
		alias: 'windowsOutput',
		nargs: 1,
		describe: 'Output path where windows icons will be saved',
		default: './assets/windows/icons/',
		normalize: true
	},
	p: {
		alias: 'platform',
		describe: 'The platform for which the icons are created',
		choices: ['android', 'ios', 'web', 'windows'],
		default: ['android', 'ios', 'web', 'windows'],
		array: true
	}
});

_.run(__ => init(__, argv));

function init(__: _, args: IArgs): void {
	args.platform.forEach_(__, (___, platform) => {
		console.log(`Creating ${platform} Icons`.yellow);
		return createIcons(___, platform, args[`${platform}Src`], args[`${platform}Output`]);
	});
}