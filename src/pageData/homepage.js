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

function makeDescription({ descData, ctoData }) {
	const desc = document.createElement("p");
	desc.className = "text-shadow";

	const descHTML = descData.reduce((acc, item) => {
		acc += item.en + "<br>";
		acc += `<span class="jap-text">${item.jp}</span>` + "<br><br>";
		return acc;
	}, "");

	desc.innerHTML = descHTML;

	desc.innerHTML += makeCTO(ctoData).outerHTML;

	desc.innerHTML += "<br><br>";

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

	return cto;
}

function card({ callToAction, cardData }) {
	const card = document.createElement("section");
	card.className = "img-card";

	//Titles for the card over image
	const title = makeHeader(cardData.title);
	card.appendChild(title);

	//Description for the card over image

	const desc = makeDescription({
		descData: cardData.desc,
		ctoData: cardData.cto,
	});
	card.appendChild(desc);

	card.querySelectorAll("button.link").forEach((btn) => {
		btn.addEventListener("click", callToAction);
	});

	return card;
}

async function bgImgSection({ callToAction, content }) {
	const pic = await getImage(content.bgImgSection.img);
	const page = document.createElement("div");
	page.className = "container bg-img";

	page.style.backgroundImage = `url(${pic})`;

	const cardElem = card({
		callToAction,
		cardData: content.bgImgSection.card,
	});

	page.appendChild(cardElem);

	return page;
}

async function modal({ callToAction, modalData }) {
	const pic = await getImage(modalData.img);
	const img = document.createElement("img");
	img.src = pic; 

	const cardElem = card({
		callToAction,
		cardData: modalData.card,
	});

	cardElem.appendChild(img);

	return cardElem;
}

async function getImage(name) {
	const img = await import(`../assets/images/homepage/${name}`);
	// console.log(JSON.stringify(img.default, null, 2));
	return img.default;
}

async function main({ target: parent, tabs }) {
	const goToContactPage = () => {
		const contactIndex = tabs.findIndex((tab) => tab.name === "Contact");
		tabs[contactIndex].script({
			target: document.getElementById("Contact-btn"),
		});
	};

	parent.appendChild(
		await bgImgSection({
			callToAction: goToContactPage,
			content,
		})
	);

	const modals = document.createElement("section");

	for (let i = 0; i < content.modals.length; i++) {
		const modalData = content.modals[i];
		modals.appendChild(
			await modal({
				callToAction: () => console.log("testy log! c:"),
				modalData,
			})
		);
		
	}

	parent.appendChild(modals);
}

export { main };
