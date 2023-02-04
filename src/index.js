import _ from "lodash";
import "./style.css";
import pageData from "./pageData/pages.json";

const tabs = [];

const setup = async() => {
    //Add basic structure
    const nav = document.createElement("nav");
    const main = document.createElement("main");
    
    document.body.appendChild(nav);
    document.body.appendChild(main);

    console.log("About to add tabs")
    console.log(pageData);
    
    //Add buttons to switch between pages
    addTabs(pageData.pageList);
};

const addTabs = async (pageList) => {
    for (let i = 0; i < pageList.length; i++) {
        console.log("loading new page")
        const pageContent = await import(`./pageData/${pageList[i]}.json`);
        console.log(`page ${pageContent.title}`)
        const thisTab = new Tab(pageContent.title);
        
        tabs.push(thisTab)

        document.querySelector("nav").appendChild(thisTab.tabButton);
    }
};

class Tab {
    constructor(name) {
        console.log(`tab ${name}`);
        this.name = name;
        this.tabButton = button(this.name, "tab", this.name, this.changeTab);

        return;
    }

    changeTab() {
        console.log("changing tab")
        const main = document.querySelector("main");
        while (main.firstChild) {
            main.removeChild(main.lastChild);
        }
    }

    return;
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
