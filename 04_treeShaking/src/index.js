import { first } from "./math"; // 注意这里只导入了first方法，没有导入second方法

function createDom() {
  let div = document.createElement("div");
  div.innerHTML = "<p>这是一个段落</p>";
  let math = document.createElement("p");
  math.innerText = `这是从 math.js 中导入的数据：${first(12, 33)}`
  div.appendChild(math)
  
  return div;
}
document.body.appendChild(createDom());