import { _ } from 'streamline-runtime';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { iconsList } from './iconsList';

export function createAndroidIcons(_: _, source: string, output: string): void {
	try {
		mkdirp(_, `${output}/file`);
		iconsList.android.forEach(icon => {
			sharp(source)
				.resize(icon.width, icon.height)
				.toFile(`${output}/${icon.name}`);
		});
	} catch (e) {
		console.log('Error creating android icons.'.red);
		console.log(`${e}`.red);
	}
}

export function createIosIcons(_: _, source: string, output: string): void {
	try {
		mkdirp(_, `${output}/file`);
		iconsList.ios.forEach(icon => {
			sharp(source)
				.resize(icon.width, icon.height)
				.toFile(`${output}/${icon.name}`);
		});
	} catch (e) {
		console.log('Error creating ios icons.'.red);
		console.log(`${e}`.red);
	}
}

export function createWebIcons(_: _, source: string, output: string): void {
	try {
		mkdirp(_, `${output}/file`);
		iconsList.web.forEach(icon => {
			sharp(source)
				.resize(icon.width, icon.height)
				.toFile(`${output}/${icon.name}`);
		});
	} catch (e) {
		console.log('Error creating web icons.'.red);
		console.log(`${e}`.red);
	}
}

export function createWindowsIcons(_: _, source: string, output: string): void {
	try {
		mkdirp(_, `${output}/file`);
		iconsList.windows.forEach(icon => {
			sharp(source)
				.resize(icon.width, icon.height)
				.toFile(`${output}/${icon.name}`);
		});
	} catch (e) {
		console.log('Error creating windows icons.'.red);
		console.log(`${e}`.red);
	}
}

export function isInArray (array: Array<any>, platform: string): any {
	let i: any;
	for (i = 0; i < array.length; i++) {
		if (array[i].match(platform)) {
			return true;
		}
	}
	return false;
}

function mkdirp(_: _, filepath: string): void {
	const dirname: string = path.dirname(filepath);
	try {
		fs.access(dirname, _);
	} catch (e) {
		mkdirp(_, dirname);
		fs.mkdir(dirname, _);
	}
}