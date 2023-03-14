
class BorderStyle {

    #width = "100%";
    #height = "100%";

    #startPos = ["0%", "0%"];
    constructor (options) {

        this.#width = options.width || this.#width;
        this.#height = options.height || this.#height;

        this.#startPos = options.start || this.#startPos;
    }

}

const options = {
    width: "10rem",
    height: "16rem",
    start: ["0rem", "0rem"]
}