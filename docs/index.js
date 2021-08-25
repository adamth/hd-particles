import {Particles} from "./particles.js";
const button = document.getElementById("button");
button?.addEventListener("click", () => {
  const particles = new Particles(button, 1200, 1200, 100);
  particles.create();
  particles.start();
});
