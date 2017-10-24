import archive from './assets/archive.svg';
import code from './assets/code.svg';
import directory from './assets/directory.svg';
import document from './assets/document.svg';
import executable from './assets/executable.svg';
import file from './assets/file.svg';
import html from './assets/html.svg';
import image from './assets/image.svg';
import music from './assets/music.svg';
import spreadsheet from './assets/spreadsheet.svg';
import video from './assets/video.svg';

// This could use some work.
export function getIcon(extension, fileType) {

	if (fileType === 'directory')
		return directory;

	if (extension.includes('.tar.'))
		return archive;

	switch (extension.toLowerCase()) {
		case '.zip':
		case '.iso':
		case '.gz':
		case '.xz':
		case '.z':
		case '.bz2':
		case '.7z':
		case '.apk':
		case '.dmg':
		case '.jar':
		case '.pak':
		case '.rar':
		case '.war':
			return archive;
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
		case '.xlsx':
		case '.xls':
		case '.xlsm':
		case '.xlsb':
		case '.ods':
			return spreadsheet;
		case '.mp4':
		case '.mov':
		case '.mkv':
		case '.flv':
		case '.webm':
		case '.vob':
		case '.ogv':
		case '.avi':
		case '.amv':
		case '.wmv':
		case '.m4v':
		case '.mpv':
		case '.mpg':
		case '.mpeg':
			return video;
		case '.mp3':
		case '.ogg':
		case '.flac':
		case '.m4a':
		case '.oga':
		case '.opus':
		case '.wav':
			return music;
		case '.sh':
		case '.bash':
		case '.zsh':
		case '.exe':
			return executable;
		case '.txt':
		case '.md':
		case '.markdown':
		case '.mdown':
		case '.rtf':
		case '.docx':
		case '.doc':
		case '.odt':
			return document;
	}

	return file;
}
