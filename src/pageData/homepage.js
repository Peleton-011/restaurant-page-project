import restaurantPic from "../assets/images/restaurant-img.jpeg";

function component() {
	const element = document.createElement("div");

	element.style.background = `url(${restaurantPic})`;

	const header = document.createElement("h2");

	header.innerHTML = `The perfect stop in all of Space Highway 
        <span style="filter: hue-rotate(-30deg)">011</span>
         - 
        <span style="filter: hue-rotate(-30deg)">\u00A713</span>`;

	element.appendChild(header);
	return element;
}

function main(parent) {
	parent.appendChild(component());
}

export { main };
