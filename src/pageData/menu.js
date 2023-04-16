import { tvScreen } from "../components/tvScreen";
import bg from "../assets/images/cityscape.jpg";

function component() {
	const element = document.createElement("div");
	element.setAttribute("width", "100%");
	element.setAttribute("height", "100%");
	const btn = document.createElement("button");

	// Lodash, now imported by this script
	element.innerHTML = "Menu page";

	const screen = new tvScreen(bg);

	element.appendChild(screen.getDomObject());

	return element;
}

function main({target: parent, tabs}) {
	parent.appendChild(component());
}

export { main };
