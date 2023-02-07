import _ from "lodash";
import "./style.css";
import pageData from "./pageData/pages.json";

const tabs = [];

const setup = async () => {
    //Add basic structure
    const nav = document.createElement("nav");
    const main = document.createElement("main");

    document.body.appendChild(nav);
    document.body.appendChild(main);

    //Add buttons to switch between pages
    addTabs(pageData.pageList);
};

const addTabs = async (pageList) => {
    for (let i = 0; i < pageList.length; i++) {
        const pageContent = await import(`./pageData/${pageList[i]}.json`);
        const thisTab = new Tab(pageContent);

        tabs.push(thisTab);

        document.querySelector("nav").appendChild(thisTab.tabButton());
    }
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

            if (prev) { prev.classList.remove("active-nav-btn"); };

            btn.classList.add("active-nav-btn");
        }

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
