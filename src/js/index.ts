import * as React from "react";
import * as ReactDom from "react-dom";
import Cloud from "./header/Cloud";
import Top3D from "./top/Top3D";

ReactDom.render(
  React.createElement(Cloud),
  document.getElementById("cloud-header")
);

window.addEventListener(
  "load",
  () => {
    const threeJSTest = new Top3D(document.getElementById("top3d")!);
    threeJSTest.render();
  },
  false
);
