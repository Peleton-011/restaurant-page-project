import restaurantPic from "../assets/images/restaurant-img.jpeg";

function component() {
	const page = document.createElement("div");
	page.className = "container bg-img";

	page.style.backgroundImage = `url(${restaurantPic})`;

	const card = document.createElement("section");
	card.className = "img-card";

	//Titles for the card over image

	const titles = document.createElement("hgroup");

	const title = document.createElement("h2");

	title.innerHTML = `The Best Stop in all of Spaceway
        X - <span style="filter: hue-rotate(-30deg)">\u00A713</span>`;
	title.className = "glowy-text";
	titles.appendChild(title);

	const japTitle = document.createElement("h2");

	japTitle.innerHTML = `スペースウェイX - <span style="filter: hue-rotate(-30deg)">\u00A713 </span>のベストストップ`;
	japTitle.className = "glowy-text";
	titles.appendChild(japTitle);

	card.appendChild(titles);

	//______

	const desc = document.createElement("p");
	desc.className = "text-shadow";

	desc.innerHTML = `
    Hydrogen-3 running out?<br>
	<span class="jap-text">水素3が不足する？</span><br><br>
    Need a nice meal to take a breather?<br>
	<span class="jap-text">ほっと一息つくのに美味しい食事が必要？</span><br><br>
    Want a drink while you wait for your FTL drive to cool down?<br>
	<span class="jap-text">光より速いドライブが冷めるのを待つ間、飲み物はいかがですか？</span><br><br>
    <strong><em class="highlight">We've Got You Covered!</em> &nbsp;&nbsp;|&nbsp;&nbsp;
	<span class="jap-text highlight">私たちは、あなたをサポートしています！</span></strong><br><br>
    `;

	card.appendChild(desc);

	page.appendChild(card);

	return page;
}

function main({target: parent, tabs}) {
	parent.appendChild(component());
}

export { main };
