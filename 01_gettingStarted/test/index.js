function createDomElemet() {
  let domDiv = document.createElement("div");
  let iconImage = document.createElement("img");
  iconImage.setAttribute("src", "./img/icon.png");
  domDiv.appendChild(iconImage);
  return domDiv;
}

document.body.appendChild(createDomElemet());