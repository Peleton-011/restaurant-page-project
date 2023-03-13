import { Style, StylePack } from "./cssGenerator";

// nav > button::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     box-shadow: 0 0 2em 0.5em var(--neon-color);
//     opacity: 0;
//     background-color: var(--neon-color);
//     z-index: -1;
// }

// nav > button:hover,
// nav > button:active {
//     color: var(--bg-color);
//     background-color: var(--neon-color);
//     text-shadow: none;
// }

// nav > button:hover::before,
// nav > button:active::before {
//     opacity: 1;
// }
// nav > button:hover::after,
// nav > button:active::after {
//     opacity: 1;
// }

//Only "necessary" options are "neonColor" and "secondaryColor". Optional "selector"
class Shadow extends StylePack {
    #neonColor;
    #secondaryColor;

    constructor(options) {
        const newOptions = Object.assign({}, options);

        this.#neonColor = options.neonColor || "hsl(317, 100%, 54%)";
        delete newOptions.neonColor;

        this.#secondaryColor = options.secondaryColor || "hsl(321, 21%, 16%)";
        delete newOptions.secondaryColor;

        newOptions.selector = options.selector || ".neon-shadow";

        newOptions.defaultSettings = {
            "font-size": "1.25rem",
            display: "inline-block",
            cursor: "pointer",
            "text-decoration": "none",
            "text-shadow": `0 0 0.125em ${this.#secondaryColor}, 0 0 0.6em ${
                this.#neonColor
            }`,
            transition: "all 100ms linear",
        };

        super(newOptions);
    }
}

class Box extends StylePack {
    #neonColor;
    #secondaryColor;
    shadow;

    constructor(options) {
        const newOptions = Object.assign({}, options);

        this.#neonColor = options.neonColor || "hsl(317, 100%, 54%)";
        newOptions.neonColor = this.#neonColor;

        this.#secondaryColor = options.secondaryColor || "hsl(321, 21%, 16%)";
        newOptions.secondaryColor = this.#secondaryColor;
        
        newOptions.selector = options.selector || ".neon-box";
        
        this.shadow = new Shadow(newOptions);


        newOptions.defaultSettings = {
            border: `${this.#neonColor} 0.125em solid`,
            padding: `0.25em 1em`,
            "border-radius": `0.25em`,
            "box-shadow": `inset 0 0 2em 0.5em ${this.#neonColor} , 0 0 2em 0.5em ${
                this.#neonColor
            }`,
            background: `${this.#secondaryColor}`,
        };

        super(newOptions);
    }
}
