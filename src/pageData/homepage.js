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

function makeDescription({descData, ctoData}) {
	const desc = document.createElement("p");
	desc.className = "text-shadow";

	const descHTML = descData.reduce((acc, item) => {
		acc += item.en + "<br>";
		acc += `<span class="jap-text">${item.jp}</span>` + "<br><br>";
		return acc;
	}, "");

	desc.innerHTML = descHTML;

	desc.innerHTML += makeCTO(ctoData).outerHTML;

	desc.innerHTML += "<br><br>"

	//We've Got You Covered!
	//私たちは、あなたをサポートしています！

	return desc;
}

function makeCTO(ctoData) {

	const cto = document.createElement("strong");

	const enBtn = document.createElement("button");
	enBtn.className = "link";
	const en = document.createElement("em");
	en.className = "highlight";
	en.innerHTML = ctoData.en;
	enBtn.appendChild(en);

	cto.appendChild(enBtn);
	cto.innerHTML += `&nbsp;&nbsp;|&nbsp;&nbsp;`;


	const jpBtn = document.createElement("button");
	jpBtn.className = "link";
	const jp = document.createElement("span");
	jp.className = "jap-text highlight";
	jp.innerHTML = ctoData.jp;
	jpBtn.appendChild(jp);

	cto.appendChild(jpBtn);

	const ass = `

	
    	<strong>
			<button class="link">	
				<em class="highlight"></em> 
			</button>	
			&nbsp;&nbsp;|&nbsp;&nbsp;
			<button class="link">	
				<span class="jap-text highlight"></span>
			</button>	
		</strong>
    `;
	return cto;
}

function card({ callToAction }) {
	const cardData = content.card;

	const card = document.createElement("section");
	card.className = "img-card";

	//Titles for the card over image
	const title = makeHeader(cardData.title);
	card.appendChild(title);

	//Description for the card over image

	const desc = makeDescription({descData: cardData.desc, ctoData: cardData.cto});
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
