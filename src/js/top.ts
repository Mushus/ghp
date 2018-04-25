import Top3D from "./top/Top3D";

window.addEventListener(
  "load",
  () => {
    const threeJSTest = new Top3D(document.getElementById("top3d")!);
    threeJSTest.render();
  },
  false
);
