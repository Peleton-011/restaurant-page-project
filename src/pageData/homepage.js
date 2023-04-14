import restaurantPic from "../assets/images/restaurant-img.jpeg";

function component() {
	const element = document.createElement("div");
    element.className = "container bg-img";

	element.style.backgroundImage = `url(${restaurantPic})`;


    const card = document.createElement("section");
    card.className = "img-card";

	const title = document.createElement("h2");


	title.innerHTML = `The best stop in all of Spaceway
        X - <span style="filter: hue-rotate(-30deg)">\u00A713</span>`;
    title.className = "glowy-text";
	card.appendChild(title);

    //______

    const desc = document.createElement("p");
    desc.className = "text-shadow";

    desc.innerHTML = `Testy test for testing purposes`

    card.appendChild(desc);

    element.appendChild(card);

	return element;
}

function main(parent) {
	parent.appendChild(component());
}

export { main };
