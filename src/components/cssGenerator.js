

class Style {

    #selectors = [];

    newSelector (selector) {
        const newSelector = new Selector(selector);
        this.#selectors.push(this.newSelector);
        return newSelector;
    }

    getStyleTag () {
        let style = "<style>"

        for (let i = 0; i < this.#selectors.length; i++) {
            style += this.#selectors[i].print();
        }

        style += "</style>";

        return style;
    }
}

class StylePack extends Style {
    styles = [];

    #selector;

    constructor(options) {
        this.#selector = options.selector;

        this.styles.push(super.newSelector(this.#selector));

        this.addSettings(options.defaultSettings);
    }

    addSetting(attr, value, styleID = 0) {
        this.styles[styleID].addAttribute(attr, settings[attr]);
    }

    addSettings(settings, styleID = 0) {
        for (let attr in settings) {
            this.styles[styleID].addAttribute(attr, settings[attr]);
        }
    }

    getSelector (styleID = 0) {
        return this.styles[styleID].getSelector();
    }

    getSettings(styleID = 0) {
        return this.styles[styleID].print();
    }

    getStyle(styleID) {

        if (typeof styleID === "number") {
            return this.styles[styleID].print();
        }

        let style = "";
        for (let i = 0; i < this.styles.length; i++) {
            style += this.styles[i].print();
        }
        return style;
    }
}


class Selector {

    #attributes = [];
    #selector = "";

    constructor (selector) {
        this.#selector = selector;
    }

    addAttribute (attr, value) {
        const str = `${attr}: ${value};`;
        this.#attributes.push(str);
    }

    getSelector () {
        return this.#selector;
    }

    print () {
        let finalSelector = this.#selector;

        finalSelector += "{"

        for (let i = 0; i < this.#attributes.length; i++) {
            finalSelector += this.#attributes[i];
        }

        finalSelector += "}";

        return finalSelector;
    }
}

export {Style, StylePack};