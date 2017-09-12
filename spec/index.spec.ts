import { createAndroidIcons, createIosIcons, createWebIcons, createWindowsIcons, isInArray } from '../lib/helpers';
import { _ } from 'streamline-runtime';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { iconsList } from '../lib/iconsList';

describe('Platforms Icons', () => {

	let access: jasmine.Spy;
	let mkdir: jasmine.Spy;
	let defaultfn: jasmine.Spy;
	let resize: jasmine.Spy;
	let toFile: jasmine.Spy;

	const args: any = {
		androidSrc: '../icon-android.png',
		androidOutput: 'res/android/icons',
		iosSrc: '../icon-ios.png',
		iosOutput: 'res/ios/icons',
		webSrc: '../icon-android.png',
		webOutput: 'res/web/icons',
		windowsSrc: '../icon-android.png',
		windowsOutput: 'res/windows/icons'
	};

	const platformsArray: Array<string> = ['android', 'ios', 'web', 'windows', 'all'];

	beforeEach(() => {
		access = jasmine.createSpy('access');
		mkdir = jasmine.createSpy('mkdir');

		defaultfn = jasmine.createSpy('default');
		resize = jasmine.createSpy('resize');
		toFile = jasmine.createSpy('toFile');

		resize.and.returnValue({ toFile: toFile });
		defaultfn.and.returnValue({ resize: resize });

		(fs as any).access = access;
		(fs as any).mkdir = mkdir;

		(sharp as any).default = defaultfn;


	});

	describe('isInArray Function', () => {

		it('should return true if specified platform is on the platforms array', () => {
			expect(isInArray(platformsArray, 'all')).toBe(true);
		});

		it('should return false if specified platform is not on the platforms array', () => {
			expect(isInArray(platformsArray, 'safari')).toBe(false);
		});

	});

	describe('createAndroidIcons Function', () => {

		iconsList.android.forEach(icon => {
			it(`should try to create ${icon.name} icon`, () => {
				createAndroidIcons(_, args.androidSrc, args.androidOutput);
				expect(access).toHaveBeenCalledWith(args.androidOutput, _);
				expect(defaultfn).toHaveBeenCalledWith(args.androidSrc);
				expect(toFile).toHaveBeenCalledWith(jasmine.stringMatching(`${args.androidOutput}/${icon.name}`));
			});
		});

		it('should try to create icon', () => {
			let called: number = 0;
			access.and.callFake(() => {
				called++;
				if (called === 1) {
					throw new Error('No se encontró el directorio');
				}
			});
			createAndroidIcons(_, args.androidSrc, args.androidOutput);
			expect(mkdir).toHaveBeenCalledWith(args.androidOutput, _);
		});

	});

	describe('createIosIcons Function', () => {

		iconsList.ios.forEach(icon => {
			it(`should try to create ${icon.name} icon`, () => {
				createIosIcons(_, args.iosSrc, args.iosOutput);
				expect(access).toHaveBeenCalledWith(args.iosOutput, _);
				expect(defaultfn).toHaveBeenCalledWith(args.iosSrc);
				expect(toFile).toHaveBeenCalledWith(jasmine.stringMatching(`${args.iosOutput}/${icon.name}`));
			});
		});

		it('should try to create icon', () => {
			let called: number = 0;
			access.and.callFake(() => {
				called++;
				if (called === 1) {
					throw new Error('No se encontró el directorio');
				}
			});
			createIosIcons(_, args.iosSrc, args.iosOutput);
			expect(mkdir).toHaveBeenCalledWith(args.iosOutput, _);
		});

	});

	describe('createWebIcons Function', () => {

		iconsList.web.forEach(icon => {
			it(`should try to create ${icon.name} icon`, () => {
				createWebIcons(_, args.webSrc, args.webOutput);
				expect(access).toHaveBeenCalledWith(args.webOutput, _);
				expect(defaultfn).toHaveBeenCalledWith(args.webSrc);
				expect(toFile).toHaveBeenCalledWith(jasmine.stringMatching(`${args.webOutput}/${icon.name}`));
			});
		});

		it('should try to create icon', () => {
			let called: number = 0;
			access.and.callFake(() => {
				called++;
				if (called === 1) {
					throw new Error('No se encontró el directorio');
				}
			});
			createWebIcons(_, args.webSrc, args.webOutput);
			expect(mkdir).toHaveBeenCalledWith(args.webOutput, _);
		});

	});

	describe('createWindowsIcons Function', () => {

		iconsList.windows.forEach(icon => {
			it(`should try to create ${icon.name} icon`, () => {
				createWindowsIcons(_, args.windowsSrc, args.windowsOutput);
				expect(access).toHaveBeenCalledWith(args.windowsOutput, _);
				expect(defaultfn).toHaveBeenCalledWith(args.windowsSrc);
				expect(toFile).toHaveBeenCalledWith(jasmine.stringMatching(`${args.windowsOutput}/${icon.name}`));
			});
		});

		it('should try to create icon', () => {
			let called: number = 0;
			access.and.callFake(() => {
				called++;
				if (called === 1) {
					throw new Error('No se encontró el directorio');
				}
			});
			createWindowsIcons(_, args.windowsSrc, args.windowsOutput);
			expect(mkdir).toHaveBeenCalledWith(args.windowsOutput, _);
		});

	});

});