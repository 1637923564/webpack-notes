import _ from "lodash";
import "./style.css";
import Icon from "./img/icon.png"; // 除此之外也可以在css文件中直接使用

function createDom() {
  // 创建div节点
  let dom = document.createElement("div");
  dom.innerHTML = _.join(["Hello", " webpack"], "");
  dom.classList.add("hello");

  dom.style.background = "url(" +Icon + ") no-repeat 400px -2px";
  dom.style.backgroundSize = "contain"

  return dom;
}
let divDom = createDom();

document.body.appendChild(divDom);