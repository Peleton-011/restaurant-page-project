import restaurantPic from "../assets/images/restaurant-img.jpeg";

function component() {
	const element = document.createElement("div");
	element.className = "container bg-img";

	element.style.backgroundImage = `url(${restaurantPic})`;

	const card = document.createElement("section");
	card.className = "img-card";

	const title = document.createElement("h2");

	title.innerHTML = `The Best Stop in all of Spaceway
        X - <span style="filter: hue-rotate(-30deg)">\u00A713</span>`;
	title.className = "glowy-text";
	card.appendChild(title);

	//______

	const desc = document.createElement("p");
	desc.className = "text-shadow";

	desc.innerHTML = `
    Hydrogen-3 running out?<br><br>
    Need a nice meal to take a breather?<br><br>
    Want a drink while you wait for your FTL drive to cool down?<br><br>
    <strong><em style="filter: hue-rotate(-30deg); font-size: 1.5rem">We've Got You Covered!</em></strong><br><br>
    `;

	card.appendChild(desc);

	element.appendChild(card);

	return element;
}

function main(parent) {
	parent.appendChild(component());
}

export { main };
