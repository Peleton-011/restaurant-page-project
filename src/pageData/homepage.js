import restaurantPic from "../assets/images/restaurant-img.jpeg";

import content from "./pageContent/homepage.json";

function makeHeader(title) {
	const titles = document.createElement("hgroup");
	const en = document.createElement("h2");

	en.innerHTML = title.en;
	en.className = "glowy-text";
	titles.appendChild(en);

	const jp = document.createElement("h2");

	jp.innerHTML = title.jp;
	jp.className = "glowy-text";
	titles.appendChild(jp);

	return titles;
}

function card({ callToAction }) {
	const cardData = content.card;

	const card = document.createElement("section");
	card.className = "img-card";

	//Titles for the card over image
	const title = makeHeader(cardData.title)
	card.appendChild(title);

	//______

	const desc = document.createElement("p");
	desc.className = "text-shadow";

	desc.innerHTML = `
    <br>
	<span class="jap-text"></span><br><br>
    <br>
	<span class="jap-text"></span><br><br>
    <br>
	<span class="jap-text"></span><br><br>
    	<strong>
			<button class="link">	
				<em class="highlight"></em> 
			</button>	
			&nbsp;&nbsp;|&nbsp;&nbsp;
			<button class="link">	
				<span class="jap-text highlight"></span>
			</button>	
		</strong>
	<br><br>
    `;
	//We've Got You Covered!
	//私たちは、あなたをサポートしています！

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
