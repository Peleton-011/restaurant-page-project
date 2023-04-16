function component() {
	const element = document.createElement("div");
	const btn = document.createElement("button");

	// Lodash, now imported by this script
	element.innerHTML = "Contact page";

	element.appendChild(btn);

	return element;
}

function main({target: parent, tabs}) {
	parent.appendChild(component());
}

export { main };
