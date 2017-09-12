#!/usr/bin/env node
import { _ } from 'streamline-runtime';
import { help, alias, options, argv, Arguments } from 'yargs';
import { createAndroidIcons, createIosIcons, createWebIcons, createWindowsIcons, isInArray } from './helpers';

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
		default: './res/android/icons/',
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
		default: './res/ios/icons/',
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
		default: './res/web/icons/',
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
		default: './res/windows/icons/',
		normalize: true
	},
	p: {
		alias: 'platform',
		describe: 'The platform for which the icons are created',
		choices: ['android', 'ios', 'web', 'windows', 'all'],
		default: 'all',
		array: true
	}
});

_.run(__ => init(__, argv));

function init(_: _, args: IArgs): void {
	if (isInArray(args.platform, 'all')) {
		console.log('Creating icons for all platforms'.yellow);
		createAndroidIcons(_, args.androidSrc, args.androidOutput);
		createIosIcons(_, args.iosSrc, args.iosOutput);
		createWebIcons(_, args.webSrc, args.webOutput);
		createWindowsIcons(_, args.windowsSrc, args.windowsOutput);
	}

	if (isInArray(args.platform, 'android')) {
		console.log('Creating Android Icons'.yellow);
		createAndroidIcons(_, args.androidSrc, args.androidOutput);
	}

	if (isInArray(args.platform, 'ios')) {
		console.log('Creating iOS Icons'.yellow);
		createIosIcons(_, args.iosSrc, args.iosOutput);
	}

	if (isInArray(args.platform, 'web')) {
		console.log('Creating Web Icons'.yellow);
		createWebIcons(_, args.webSrc, args.webOutput);
	}

	if (isInArray(args.platform, 'windows')) {
		console.log('Creating Windows Icons'.yellow);
		createWindowsIcons(_, args.windowsSrc, args.windowsOutput);
	}
}