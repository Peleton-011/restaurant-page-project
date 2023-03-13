

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

class StylePack {
    styles = [];

    #styleSettings = {};
    #selector;

    constructor(options) {
        this.#selector = options.selector;

        this.styles.push(Style.newSelector(this.#selector));

        this.addSettings(options.defaultSettings);
    }

    addSetting(attr, value) {
        this.#styleSettings[attr] = value;
        this.style.addAttribute(attr, settings[attr]);
    }

    addSettings(settings) {
        for (let attr in settings) {
            this.#styleSettings[attr] = settings[attr];
            this.style.addAttribute(attr, settings[attr]);
        }
    }

    getSettings() {
        return this.#styleSettings;
    }

    getStyle() {
        return this.style.getStyle();
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