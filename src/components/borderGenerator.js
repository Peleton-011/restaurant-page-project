
class BorderStyle {

    #width = "100%";
    #height = "100%";

    #startPos = ["0%", "0%"];

    #lineWidth = "2px";
    #color = "#000000";
    #bg = "transparent";

    #currentPos;

    constructor (options) {

        this.#width = options.width || this.#width;
        this.#height = options.height || this.#height;

        this.#startPos = options.start || this.#startPos;

        this.#lineWidth = options.lineWidth || this.#lineWidth;
        this.#color = options.color || this.#color;
        this.#bg = options.bg || this.#bg;

        this.#currentPos = this.#startPos;
    }


    #lineTo (targetPos, bevel, lineWidth, color) {
        const hasBevel = !!bevel;

        return new Line ({
            start: this.#currentPos,
            end: targetPos,
            width: lineWidth || this.#lineWidth,
            color: color || this.#color,
            bg: this.#bg || this.#bg,
        })

    }
}

class Line {

    start;
    end;
    width;
    color;
    bg;

    constructor (options) {
        this.start = options.start;
        this.end = options.end;
        this.width = options.width;
        this.color = options.color;
        this.bg = options.bg;
    }
}

const borderOptions = {
    width: "10rem",
    height: "16rem",
    start: ["0rem", "0rem"],
    lineWidth: "2px",
}

const lineOptions = {
    start: ["0", "0"],
    end: ["0", "0"],
    width: "2px",
    color: "#000000",
    bg: "#000000",
}