import _ from "lodash";
import "./style.css";
import "./fonts.css";
import pageData from "./pageData/pages.json";
import BEPIS from "presa-bepis";

const tabs = [];

const filterID = "myFilter";

const setup = () => {
	//Add basic structure
	const nav = document.createElement("nav");
	const main = document.createElement("main");
	const heroText = makeSVG(pageData.title);

	document.body.innerHTML += heroText.outerHTML;
	document.body.appendChild(nav);
	document.body.appendChild(main);

	//Add buttons to switch between pages
	addTabs(pageData.pageList);

	// When the user scrolls the page, execute this function
	window.onscroll = makeNavSticky;

	const stickyDistance = 80;
	// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function makeNavSticky() {
		if (window.pageYOffset >= stickyDistance) {
			nav.classList.add("sticky");
		} else {
			nav.classList.remove("sticky");
		}
	}

	function makeSVG(title) {
		const filterSVG = new BEPIS(null, null, title);
		filterSVG.filter = filterID;
		const filter = filterSVG.filter;
		const text = filterSVG.text("Paradise 11", "", "");

		const shadow = 4;

		//colored source
		const cols = ["#000", "#FF14BD", "#BCED09", "#2B2D42", "#31202b"];
		const color1 = cols[4];
		const color2 = cols[1];
		const coloredSource = `COLORED_SOURCE_${color1}`;

		filter.colorize("SourceAlpha", coloredSource, color1, 1);

		//Black extrusion
		const offset = `OFFSET_${filter.operationID}`;
		const finalOffset = `OFFSET_${filter.operationID}`;
		const composite = `COMPOSITE_${filter.operationID}`;

		filter.extrude(null, null, shadow, ["100", "010", "001"]);
		filter.offset(null, offset, shadow / 2, shadow / 2);
		filter.composite(offset, "SourceAlpha", finalOffset, "out");
		filter.colorize(finalOffset, composite, color1, 1);

		//Purple extrusion
		const purpleShadow = `PURPLE_SHADOW_${filter.operationID}`;

		filter.dropShadow(composite, purpleShadow, -2, 2, 3, color2, 0.5);

		//White outline for the text
		const thinText = `THIN_TEXT_${filter.operationID}`;
		const wideText = `WIDE_TEXT_${filter.operationID}`;
		const finalWideText = `WIDE_TEXT_${filter.operationID}`;
		const outline = `OUTLINE_${filter.operationID}`;

		filter.changeWidth("SourceAlpha", thinText, "erode", 1);

		filter.changeWidth("SourceAlpha", wideText, "dilate", 1);
		filter.colorize(wideText, finalWideText, color2, 1);

		filter.composite(finalWideText, thinText, outline, "out");

		filter.merge([purpleShadow, coloredSource, composite, outline], null);

		//Styling

		filterSVG.style = `
        position: relative;
        visibility: visible;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        `;

		// vv Choppy. To-Do: Reimplement this in BEPIS

		const result = filterSVG.elem;
		text.style = `filter: url(#myFilter);`;
		const finalText = text.elem;

		result.appendChild(finalText);
		return result;
	}
};

const addTabs = async (pageList) => {
	for (let i = 0; i < pageList.length; i++) {
		const pageContent = pageList[i];
		const thisTab = new Tab(pageContent);

		tabs.push(thisTab);

		document.querySelector("nav").appendChild(thisTab.tabButton());
	}

	Tab.prototype.getScript(tabs[0].page.script)({
		target: document.querySelector(".tab"),
	});
};

class Tab {
	constructor(page) {
		this.name = page.title;
		this.page = page;

		return;
	}

	getScript(name) {
		const reDraw = () => {
			return import(`./pageData/${name}.js`).then((pageScript) => {
				this.cleanCanvas();
				pageScript.main(document.querySelector("main"));
			});
		};

		const setActive = (e, name) => {
			const btn = e.target;
			const prev = document.querySelector(".active-nav-btn") || undefined;

			if (prev) {
				prev.classList.remove("active-nav-btn");
			}

			btn.classList.add("active-nav-btn");
		};

		return (e) => {
			reDraw();
			setActive(e, name);
		};
	}

	tabButton() {
		const script = this.getScript(this.page.script);
		const tabButton = button(this.name, "tab", `${this.name}-btn`, script);
		return tabButton;
	}

	cleanCanvas() {
		const main = document.querySelector("main");
		while (main.firstChild) {
			main.removeChild(main.lastChild);
		}
	}
}

function button(text, classList, id, onClick) {
	const button = document.createElement("button");
	button.textContent = text;
	button.classList = classList;
	button.id = id;
	button.onclick = onClick;
	return button;
}

const component = () => {
	const component = document.createElement("div");

	component.textContent = pageData.name;

	return component;
};

setup();
document.body.appendChild(component());
