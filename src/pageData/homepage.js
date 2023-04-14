import restaurantPic from "../assets/images/restaurant-img.jpeg";

function component() {
	const element = document.createElement("div");
    element.className = "container bg-img";

	element.style.backgroundImage = `url(${restaurantPic})`;

	const header = document.createElement("h2");


	header.innerHTML = `The perfect stop in all of Space Highway 
        <span style="filter: hue-rotate(-30deg)">011</span>
         - 
        <span style="filter: hue-rotate(-30deg)">\u00A713</span>`;
    header.className = "glowy-text";
	element.appendChild(header);

    //______

    const desc = document.createElement("article");

    desc.innerHTML = ``

	return element;
}

function main(parent) {
	parent.appendChild(component());
}

export { main };
