import _ from "lodash";
import printMe from "./print";

function createDom () {
  let div = document. createElement("div");
  div.innerText = _.join(["management"," ", "output"], "");
  let btn = document.createElement("button");
  btn.innerHTML = "printMe()";
  div.appendChild(btn);
  btn.addEventListener("click", printMe);
  return div;
}

document.body.appendChild(createDom());