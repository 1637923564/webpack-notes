import _ from "lodash";

import print from "./print.js";

function createDom() {
  let div = document.createElement("div");
  let btn = document.createElement("input");
  btn.type = "button";
  btn.value = "click me";
  btn.addEventListener("click", print);
  div.appendChild(btn);
  return div;
}

document.body.appendChild(createDom());

if(module.hot) {
  module.hot.accept("./print.js", () => {
    console.log("Accepting the updated printMe module!")
    print();
  })
}