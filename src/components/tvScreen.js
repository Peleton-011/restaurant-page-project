class tvScreen {
	#bgImage;
	#width;
	#height;
	#barColor;
	#barWidthPx;
	#spaceColor;
	#spaceWidthPx;

	constructor(
		bgImage,
		widthRem,
		heightRem,
		barColor,
		barWidthPx,
		spaceColor,
		spaceWidthPx
	) {
		this.#bgImage = bgImage || null;
		this.#width = widthRem || 10;
		this.#height = heightRem || 16;
		this.#barColor = barColor || "rgba(51, 255, 51, 0.5)";
		this.#barWidthPx = parseInt(barWidthPx) || 1;
		this.#spaceColor = spaceColor || "rgba(51, 255, 51, 0.15)";
		this.#spaceWidthPx = parseInt(spaceWidthPx) || 5;
	}

	getDomObject() {
		// To-Do: Make the object generation happeb at the constructor first
		const screen = document.createElement("div");
		screen.className = "tvScreen";

		let style = "";
		// style += `background-color: ${this.#spaceColor};`
		style += `width: ${this.#width}rem ; height: ${this.#height}rem; `;
		style += `border: ${this.#barWidthPx * 2}px solid ${this.#barColor};`;
		style += `border-radius: 1rem; `; // To-Do: Add way to set it
		style += `position: absolute; `;
		style += `overflow: hidden; `;

		screen.appendChild(this.#getImage());
		screen.appendChild(this.#getBarOverlay());

		screen.setAttribute("style", style);

		return screen;
	}

	#getBarOverlay() {
		let style = "";

		const overlay = document.createElement("div");
		overlay.id = "tvBarOverlay";

		style += `width: 100%; height: 100%; `;
		style += `background: linear-gradient(${this.#spaceColor}, ${
			this.#spaceColor
		} ${this.#spaceWidthPx}px, ${this.#barColor} ${this.#spaceWidthPx}px, ${
			this.#barColor
		} ${this.#spaceWidthPx + this.#barWidthPx}px);`;
		style += `background-size: 100% ${
			this.#barWidthPx + this.#spaceWidthPx
		}px;`;
		style += `position: absolute; top: 0px; left: 0px;`;
		style += `z-index: 2;`;

		overlay.setAttribute("style", style);
		return overlay;
	}

	#getImage() {
		let style = "";

		const image = document.createElement("img");
		image.id = "tvImage";

		style += `width: 100%; height: 100%;`;
		style += `background-image: url(${this.#bgImage}); `;
		style += `position: relative; top: 0px; left: 0px;`;
		style += `z-index: 1;`;

		image.setAttribute("style", style);
		return image;
	}

	set bgImage(url) {
		this.#bgImage = url;
	}

	set barColor(color) {
		this.#barColor = color;
	}

	set barWidth(width) {
		this.#barWidthPx = width;
	}

	set spaceColor(color) {
		this.#spaceColor = color;
	}

	set spaceWidth(width) {
		this.#spaceWidthPx = width;
	}
}

/*Bevel code for div.container :

// Demo Styling 
body {
    background: #333333;
    padding: 2rem;
  }
//   CSS 
  .container {
    padding: 1rem 2rem;
    color: #ffffff;
    background-color: transparent;
    background-image: linear-gradient(180deg, #ffdc00, #ffdc00)
      ,linear-gradient(225deg, #ffdc00, #ffdc00)
      ,linear-gradient(0deg, #ffdc00, #ffdc00)
      ,linear-gradient(90deg, #ffdc00, #ffdc00)
      ,linear-gradient(135deg, transparent 9px, #ffdc00 10px, #ffdc00 12px, transparent 12px)
      ;
    background-position: top right
      ,top right
      ,bottom left
      ,bottom left
      ,top left
      ;
    background-size: calc(100% - 15px) 2px
      ,2px 100%
      ,100% 2px
      ,2px calc(100% - 15px)
      ,15px 15px
      ;
    background-repeat: no-repeat;
  }
*/

export { tvScreen };
