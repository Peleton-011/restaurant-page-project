function component() {
    const element = document.createElement("div");
    const btn = document.createElement("button");

    // Lodash, now imported by this script
    element.innerHTML = "Menu page";

    element.appendChild(btn);

    return element;
}

function main(parent) {
    parent.appendChild(component());
}

export { main };