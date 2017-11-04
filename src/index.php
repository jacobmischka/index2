<?php
	const FORMAT = 'c';

	function getContents($directory) {
		$contents = [];

		// FIXME: This is not safe.
		foreach (new DirectoryIterator("./{$directory}") as $fileInfo) {
			if ($fileInfo->isDot())
				continue;

			$contents[] = getFileData($fileInfo);
		}

		return json_encode($contents, JSON_PRETTY_PRINT);
	}

	function stripDotSlash($path) {
		$path = str_replace('./', '', $path);
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
		$path = stripDotSlash($fileInfo->getPath()) . '/' . $fileInfo->getFilename();

		return [
			'type' => getFileType($fileInfo->getType()),
			'name' => $fileInfo->getFilename(),
			'size' => $fileInfo->getSize(),
			'lastModified' => date(FORMAT, $fileInfo->getMTime()),
			'path' => $path
		];
	}

	if (!empty($_GET['path'])) {
		header('Content-Type: application/json');
		echo getContents($_GET['path']);
	} else {
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
	</head>
	<body>
		<main></main>
	</body>
</html>

<?php
	}
