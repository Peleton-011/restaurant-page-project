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

    function titleSVG(title) {
        //Initial definitions
        const svg = document.createElement("svg");

        svg.setAttribute("xlmns", "http://www.w3.org/2000/svg");
        svg.setAttribute("version", "1.1");

        //The filter applied to the text
        const filter = document.createElement("filter");
        filter.id = "myFilter";

        // Extrude, blacken, and cut out the text

        filter.appendChild(extrusion("SourceAlpha", "BEVEL_10"));
        filter.appendChild(colorize("BEVEL_10", "#000000", "BEVEL_20"));
        filter.appendChild(offset("4", "4", "BEVEL_20", "BEVEL_30"));
        filter.appendChild(
            composite("BEVEL_30", "SourceAlpha", "out", "BEVEL_40")
        );

        //Transform, colorize, and cut out the text

        filter.appendChild(extrusion("BEVEL_40", "SHADOW_10"));
        filter.appendChild(colorize("SHADOW_10", "#FF14BD", "SHADOW_20"));
        filter.appendChild(offset("-4", "4", "SHADOW_20", "SHADOW_30"));
        filter.appendChild(
            composite("SHADOW_30", "BEVEL_40", "out", "SHADOW_40")
        );

        //Put it all together

        filter.appendChild(
            merge("FULL_EFFECT", "SourceGraphic", "BEVEL_40", "SHADOW_30")
        );

        //Helper functions
        function offset(x, y, input, output) {
            const offset = document.createElement("feOffset");

            offset.setAttribute("dx", x);
            offset.setAttribute("dy", y);
            offset.setAttribute("in", input);
            offset.setAttribute("result", output);
            return offset;
        }

        function extrusion(input, output) {
            const extrusion = document.createElement("g");
            const dilate = document.createElement("feMorphology");

            dilate.setAttribute("operator", "dilate");
            dilate.setAttribute("radius", 4);

            dilate.setAttribute("in", input);
            dilate.setAttribute("result", `${input}_EXTRUSION_10`);

            const matrix = document.createElement("feConvolveMatrix");

            matrix.setAttribute("order", "3,3");
            matrix.setAttribute("divisor", "1");
            matrix.setAttribute(
                "kernelMatrix",
                `
                1 0 0
                0 1 0
                0 0 1
                `
            );
            matrix.setAttribute("in", `${input}_EXTRUSION_10`);
            matrix.setAttribute("result", `${input}_EXTRUSION_20`);

            extrusion.appendChild(dilate);
            extrusion.appendChild(matrix);

            return extrusion;
        }

        function composite(input1, input2, op, output) {
            const composite = document.createElement("feComposite");

            composite.setAttribute("operator", op);
            composite.setAttribute("in", input1);
            composite.setAttribute("in2", input2);
            composite.setAttribute("result", output);

            return composite;
        }

        function colorize(input, color, output) {
            const flood = document.createElement("feFlood");

            flood.setAttribute("flood-color", color);
            flood.setAttribute("result", color.substring(1));

            const g = document.createElement("g");

            g.appendChild(flood);
            g.appendChild(composite(color.substring(1), input, "in", output));

            return g;
        }

        function merge(output) {
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
        const text = document.createElement("text");

        const textStyle = `
            font-size: 8rem;
            display: absolute;
            top: 0;
            left: 0;
            filter: url(#myFilter);
        `;

        text.setAttribute("style", textStyle);

        text.textContent = title;

        //Wrapping it all together
        const defs = document.createElement("defs");

        defs.appendChild(filter);
        svg.appendChild(defs);
        svg.appendChild(text);

        const svgStyle = `
            position: relative;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        `;

        svg.setAttribute("style", svgStyle);

        return svg;
    }

    function makeSVG(title) {
        const filterSVG = new BEPIS(null, null, title);
        filterSVG.filter = filterID;
        const filter = filterSVG.filter;

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

        return filterSVG.elem;
    }
};

const addTabs = async (pageList) => {
    for (let i = 0; i < pageList.length; i++) {
        const pageContent = pageList[i];
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
