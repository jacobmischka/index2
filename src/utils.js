export function jsonOrThrow(response) {
	if (response.ok)
		return response.json();

	throw new Error(response.statusText);
}

export function getContents(path) {
	return fetch(`/?path=${path}`).then(jsonOrThrow);
}

export function nodeSorter(a, b) {
	if (a.type === 'directory' && b.type === 'file')
		return -1;
	if (a.type === 'file' && b.type === 'directory')
		return 1;

	const aName = a.name.toLowerCase();
	const bName = b.name.toLowerCase();

	if (aName < bName)
		return -1;
	if (aName > bName)
		return 1;

	return 0;
}

export function sortNodes(nodes) {
	nodes = nodes.slice();
	nodes.sort(nodeSorter);

	return nodes;
}

export function traverseTree(contents, nodeCallback) {
	const newContents = [];

	for (let node of contents) {
		let newNode = Object.assign({}, node);
		let calledBackNode = nodeCallback(newNode);
		if (calledBackNode)
			newNode = calledBackNode;

		if (newNode.type === 'directory' && newNode.children)
			newNode.children = traverseTree(newNode.children, nodeCallback);

		newContents.push(newNode);
	}

	return newContents;
}

export function flattenTree(contents) {
	const flatContents = [];

	if (contents && Array.isArray(contents) && contents.length > 0) {
		traverseTree(contents, node => {
			flatContents.push(node);
		});
	}

	return flatContents;
}

export function recursivelyFlattenChildren(contents) {
	return traverseTree(contents, node => {
		node = Object.assign({}, node);

		if (node.type === 'directory')
			node.flatChildren = flattenTree(node.children);

		return node;
	});
}

export function getBasename(name) {
	return (name.includes('.') && name.lastIndexOf('.') > 0)
		? name.substring(0, name.lastIndexOf('.'))
		: name;
}

export function getExtension(name) {
	return (name.includes('.') && name.lastIndexOf('.') > 0)
		? name.substring(name.lastIndexOf('.'))
		: '';
}
