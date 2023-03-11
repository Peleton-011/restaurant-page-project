class tvScreen {
    #bgImage;
    #width;
    #height;
    #barColor;
    #barWidth;
    #spaceColor;
    #spaceWidth;

    constructor(bgImage, width, height, barColor, barWidth, spaceColor, spaceWidth) {
        
        this.#bgImage = bgImage || null;
        this.#width = width || 5;
        this.#height = height || 7;
        this.#barColor = barColor || null;
        this.#barWidth = barWidth || null;
        this.#spaceColor = spaceColor || null;
        this.#spaceWidth = spaceWidth || null;
        
    }

    getDomObject () {
        const screen = document.createElement('div');
        screen.className = "tvScreen";

        let style = "";
        style += `background-image: url(${this.#bgImage}); `;
        style += `width: ${this.#width}rem; `;
        style += `height: ${this.#height}rem; `;
        style += `position: absolute; `;

        screen.setAttribute('style', style);

        return screen;
    }

    set bgImage(url) {
        this.#bgImage = url;
    }

    set barColor(color) {
        this.#barColor = color;
    }

    set barWidth(width) {
        this.#barWidth = width;
    }

    set spaceColor(color) {
        this.#spaceColor = color;
    }

    set spaceWidth(width) {
        this.#spaceWidth = width;
    }
}

export { tvScreen };
