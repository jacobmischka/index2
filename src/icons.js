import archive from './assets/archive.svg';
import arrow from './assets/arrow.svg';
import code from './assets/code.svg';
import directory from './assets/directory.svg';
import document from './assets/document.svg';
import executable from './assets/executable.svg';
import file from './assets/file.svg';
import html from './assets/html.svg';
import image from './assets/image.svg';
import music from './assets/music.svg';
import search from './assets/search.svg';
import spreadsheet from './assets/spreadsheet.svg';
import video from './assets/video.svg';

export function getIcon(extension, fileType) {
	if (fileType === 'directory')
		return directory;

	if (extension.includes('.tar.'))
		return archive;

	switch (extension.toLowerCase()) {
		case '.html':
		case '.svg':
			return html;
		case '.jpg':
		case '.png':
		case '.gif':
		case '.bmp':
		case '.jpeg':
			return image;
		case '.js':
		case '.mjs':
		case '.php':
		case '.rs':
		case '.py':
			return code;
		// TODO: More
	}

	return file;
}
