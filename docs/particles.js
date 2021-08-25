import {Particle} from "./particle.js";
import {circle, diamond, rectangle, star} from "./shapes.js";
export class Particles {
  constructor(el, width, height, count = 1) {
    this.particles = [];
    this.gravity = 0.2;
    this.maxAge = 100;
    this.el = el;
    this.width = width;
    this.height = height;
    this.count = count;
    this.originX = this.width / 2;
    this.originY = this.height / 2;
  }
  _createParticle(i) {
    const vx = (Math.random() - 0.5) * 2 * 5;
    const vy = Math.random() * 10 + 5;
    const color = `hsla(${Math.floor(Math.random() * 400)},96%,50%, 1)`;
    const xOffset = Math.sin(i) * 20;
    const yOffset = Math.cos(i) * 20;
    this.particles.push(new Particle(this.originX + xOffset, this.originY + yOffset, vx, vy, color, (Math.random() - 0.5) * 2 * 10));
  }
  getCanvasPosition() {
    const {x, y, width} = this.el.getBoundingClientRect();
    const top = y - this.height / 2;
    const left = x - this.width / 2 + width / 2;
    return {top: `${top}px`, left: `${left}px`};
  }
  create() {
    const canvasPosition = this.getCanvasPosition();
    this.canvas = document.createElement("canvas");
    this.canvas.style.pointerEvents = "none";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = canvasPosition.top;
    this.canvas.style.left = canvasPosition.left;
    this.el.parentElement?.appendChild(this.canvas);
  }
  start() {
    if (!this.canvas)
      return;
    for (let i = 0; i < this.count; i++) {
      this._createParticle(i);
    }
    setInterval(() => {
      this.draw();
    }, 1e3 / 60);
  }
  clearCanvas() {
    const context = this.getContext();
    if (!context)
      return;
    context.clearRect(0, 0, this.width, this.height);
  }
  getContext() {
    return this.canvas?.getContext("2d");
  }
  getOpacity(particle) {
    if (particle.age > this.maxAge) {
      const value = (130 - particle.age) / 100;
      return value >= 0 ? value : 0;
    }
    return 1;
  }
  draw() {
    const context = this.getContext();
    if (!context)
      return;
    this.clearCanvas();
    this.particles.forEach((particle, i) => {
      context.beginPath();
      context.globalAlpha = this.getOpacity(particle);
      context.fillStyle = particle.color;
      switch (particle.shape) {
        case "circle":
          circle(context, particle, 0.2);
          break;
        case "diamond":
          diamond(context, particle, 0.4);
          break;
        case "square":
          rectangle(context, particle, 0.2);
          break;
        case "star":
          star(context, particle, 0.1);
          break;
      }
      context.fill();
      particle.x += particle.vx;
      particle.y -= particle.vy;
      particle.vy -= this.gravity;
      particle.rotation += particle.rotationRate * Math.PI / 180;
      particle.age += 1;
      if (particle.outsideBounds(this.width, this.height)) {
        this.particles.splice(i, 1);
      }
    });
  }
}
