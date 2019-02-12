import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { iconsList } from './iconsList';
import { PNG2ICNS, PNG2ICO_BMP, HERMITE } from 'png2icons';

export function createIcons(_: Streamline._, type: string, source: string, output: string): void {
	try {
		mkdirp(_, `${output}/icon`);
		iconsList[type].forEach(icon => 
			sharp(source).resize(icon.width, icon.height).toBuffer((err, buffer) => {
				if (err) { return logError(type, err); }
				if (/\.ic(o|ns)$/.test(icon.name)) {
					buffer = (/\.ico$/.test(icon.name) ? PNG2ICO_BMP : PNG2ICNS)(buffer, HERMITE, false, 0);
				}
				fs.writeFile(`${output}/${icon.name}`, buffer, error => {
					if (error) { return logError(type, error); }
				});
			})
		);
	} catch (e) {
		logError(type, e);
	}
}

function logError(type: string, error: any): void {
	console.log(`Error creating ${type} icons.`.red);
	console.log(`${JSON.stringify(error)}`.red);
}

function mkdirp(_: Streamline._, filepath: string): void {
	const dirname: string = path.dirname(filepath);
	try {
		fs.access(dirname, _);
	} catch (e) {
		mkdirp(_, dirname);
		fs.mkdir(dirname, _)
	}
}