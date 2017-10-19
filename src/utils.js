export function nodeSorter(a, b) {
	if (a.type === 'directory' && b.type === 'file')
		return -1;
	if (a.type === 'file' && b.type === 'directory')
		return 1;

	return a.name - b.name;
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

		if (newNode.type === 'directory')
			newNode.children = traverseTree(newNode.children, nodeCallback);

		newContents.push(newNode);
	}

	return newContents;
}

export function flattenTree(contents) {
	const flatContents = [];

	traverseTree(contents, node => {
		flatContents.push(node);
	});

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
