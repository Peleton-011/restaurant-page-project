import _ from "lodash";
import "./style.css";
import "./fonts.css";
import pageData from "./pageData/pages.json";

const tabs = [];

const setup = () => {
    //Add basic structure
    const nav = document.createElement("nav");
    const main = document.createElement("main");
    const heroText = titleSVG(pageData.title);

    document.body.appendChild(nav);
    document.body.appendChild(heroText);
    document.body.appendChild(main);

    //Add buttons to switch between pages
    addTabs(pageData.pageList);

    // When the user scrolls the page, execute this function
    window.onscroll = makeNavSticky;

    const stickyDistance = 80;
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function makeNavSticky() {
        console.log(window.pageYOffset);
        console.log(stickyDistance);
        if (window.pageYOffset >= stickyDistance) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    }

    function titleSVG(title) {

        //Initial definitions
        const svg = document.createElement("svg");

        const defs = document.createElement("defs");

        //The styles on the text to display
        const style = document.createElement("style");
        style.setAttribute("type", "text/css");

        style.innerHTML = `
            <![CDATA[
                .filtered {
                    font-size: 12rem !important;
                    filter: url(#myFilter);
                }
            ]]>
        `;

        //The filter applied to the text
        const filter = document.createElement("filter");
        filter.id = "myFilter";

        // Extrude, blacken, and cut out the text
        
        filter.appendChild(extrusion("SourceAlpha", "BEVEL_10"));
        filter.appendChild(composite("BEVEL_10", "SourceAlpha", "out", "BEVEL_20"));
        filter.appendChild(colorize("BEVEL_20", "#000000", "BEVEL_30"));

        //Transform, colorize, and cut out the text

        filter.appendChild(offset("-4", "4", "BEVEL_30", "SHADOW_10"));
        filter.appendChild(composite("SHADOW_10", "BEVEL_30", "out", "SHADOW_20"));
        filter.appendChild(colorize("SHADOW_20", "#ff14bd", "SHADOW_30"));

        //Put it all together

        filter.appendChild(merge("SourceGraphic", "BEVEL_30", "SHADOW_30"));

        //Helper functions
        function offset(x, y, input, output) {
            const offset = document.createElement("feOffset");
            
            offset.setAttribute("dx", x);
            offset.setAttribute("dy", y);
            offset.setAttribute("in", input);
            offset.setAttribute("result", output);
            return offset;
        }

        function extrusion (input, output) { 
            const extrusion = document.createElement("feConvolveMatrix");
            
            extrusion.setAttribute("order", "3");
            extrusion.setAttribute("divisor", "1");
            extrusion.setAttribute("kernelMatrix", `
                1 0 0
                0 1 0
                0 0 1
                `
                );
            extrusion.setAttribute("in", input);
            extrusion.setAttribute("result", output);

            return extrusion;
        };

        function composite (input1, input2, op, output) {
            const composite = document.createElement("feComposite");

            composite.setAttribute("operator", op);
            composite.setAttribute("in", input1);
            composite.setAttribute("in2", input2);
            composite.setAttribute("result", output);

            return composite;
        }

        function colorize (input, color, output) {
            const flood = document.createElement("feFlood");

            flood.setAttribute("flood-color", color);
            flood.setAttribute("result", color.substring(1));

            const g = document.createElement("g");

            g.appendChild(flood);
            g.appendChild(composite(color.substring(1), input, "in", output));

            return g; 
        }

        function merge (output) {
            const args = Array.from(arguments);
            const merge = document.createElement("feMerge");

            merge.setAttribute("result", output);

            for (let i = 1; i < args.length; i++) {
                if (!args[i]) {
                    return;
                }

                const mergeNode = document.createElement("feMergeNode");
                mergeNode.setAttribute("in", args[i]);

                merge.appendChild(mergeNode);
            }

            return merge;
        }


        //The actual text to display
        const g = document.createElement("g");
        g.classList.add("filtered");

        const text = document.createElement("text");
        text.setAttribute("x", "10");
        text.setAttribute("y", "10");
        text.textContent = title;

        //Wrapping it all together
        g.appendChild(text);

        defs.appendChild(style);
        defs.appendChild(filter);

        svg.appendChild(defs);
        svg.appendChild(g);

        return svg;
    }
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
