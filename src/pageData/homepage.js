import restaurantPic from "../assets/images/restaurant-img.jpeg";

import content from "./pageContent/homepage.json";

function makeHeader(titleData) {
	const titles = document.createElement("hgroup");
	const en = document.createElement("h2");

	en.innerHTML = titleData.en;
	en.className = "glowy-text";
	titles.appendChild(en);

	const jp = document.createElement("h2");

	jp.innerHTML = titleData.jp;
	jp.className = "glowy-text";
	titles.appendChild(jp);

	return titles;
}

function makeDescription(descData) {
	const desc = document.createElement("p");
	desc.className = "text-shadow";

	const descHTML = descData.reduce((acc, item) => {
		acc += item.en + "<br>";
		acc += `<span class="jap-text">${item.jp}</span>` + "<br><br>";
		return acc;
	}, "");

	desc.innerHTML = descHTML;
	
	//We've Got You Covered!
	//私たちは、あなたをサポートしています！

	return desc;
}

function card({ callToAction }) {
	const cardData = content.card;

	const card = document.createElement("section");
	card.className = "img-card";

	//Titles for the card over image
	const title = makeHeader(cardData.title);
	card.appendChild(title);

	//______

	const desc = makeDescription(cardData.desc);

	card.appendChild(desc);

	card.querySelectorAll("button.link").forEach((btn) => {
		btn.addEventListener("click", callToAction);
	});

	return card;
}

function bgImgSection({ callToAction }) {
	const page = document.createElement("div");
	page.className = "container bg-img";

	page.style.backgroundImage = `url(${restaurantPic})`;

	const cardElem = card({ callToAction });

	page.appendChild(cardElem);

	return page;
}

function main({ target: parent, tabs }) {
	const goToContactPage = () => {
		const contactIndex = tabs.findIndex((tab) => tab.name === "Contact");
		tabs[contactIndex].script({
			target: document.getElementById("Contact-btn"),
		});
	};
	parent.appendChild(bgImgSection({ callToAction: goToContactPage }));
}

export { main };
