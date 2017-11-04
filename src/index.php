<?php
	const FORMAT = 'c';
	date_default_timezone_set('UTC');

	function getContents($directory) {
		$contents = [];

		// FIXME: This is not safe.
		foreach (new DirectoryIterator("./{$directory}") as $fileInfo) {
			if ($fileInfo->isDot())
				continue;

			$contents[] = getFileData($fileInfo);
		}

		return $contents;
	}

	function streamSearchResults($directory, $query) {
		$matchIter = new RegexIterator(
			new RecursiveIteratorIterator(
				new RecursiveDirectoryIterator(
					"./{$directory}",
					FilesystemIterator::SKIP_DOTS
				),
				RecursiveIteratorIterator::SELF_FIRST
			),
			"/^.*{$query}[^\\/]*$/i",
			RecursiveRegexIterator::MATCH
		);

		$matchIter->rewind();

		while ($matchIter->valid()) {
			echo json_encode(getFileData($matchIter->current()));

			$matchIter->next();
			if ($matchIter->valid())
				echo ',';
		}
	}

	function stripDotSlash($path) {
		$path = str_replace('./', '', $path);
		if (strpos($path, '/') === 0)
			$path = substr($path, 1);
		return ($path == '.')
			? ''
			: $path;
	}

	function getFileType($type) {
		if ($type == 'dir')
			return 'directory';

		return $type;
	}

	function getFileData($fileInfo) {
		$path = stripDotSlash($fileInfo->getPath() . '/' . $fileInfo->getFilename());

		return [
			'type' => getFileType($fileInfo->getType()),
			'name' => $fileInfo->getFilename(),
			'size' => $fileInfo->getSize(),
			'lastModified' => date(FORMAT, $fileInfo->getMTime()),
			'path' => $path
		];
	}

	if (!empty($_GET['search'])) {
		header('Content-Type: application/json');
		$path = empty($_GET['path'])
			? '.'
			: $_GET['path'];

		echo '[';
		streamSearchResults($path, $_GET['search']);
		echo ']';
	} elseif (!empty($_GET['path'])) {
		header('Content-Type: application/json');
		echo json_encode(getContents($_GET['path']));
	} else {
?>

	<%= require('raw-loader!./index.html') %>

<?php
	}
