import { Particle } from './particle';

export class Particles {
  width: number;
  height: number;
  el: HTMLElement;
  canvas?: HTMLCanvasElement;
  particles: Array<Particle> = [];
  count: number;
  particleSize = 20;
  gravity: number = 0.2;
  originX: number;
  originY: number;
  maxAge: number = 100;

  constructor(
    el: HTMLElement,
    width: number,
    height: number,
    count: number = 1,
  ) {
    this.el = el;
    this.width = width;
    this.height = height;
    this.count = count;
    this.originX = this.width / 2;
    this.originY = this.height / 2;
  }

  _createParticle(i: number) {
    const vx = (Math.random() - 0.5) * 2 * 5;
    const vy = Math.random() * 10 + 5;

    this.particles.push(
      new Particle(
        Math.random() * this.width,
        Math.random() * this.height,
        vx,
        vy,
      ),
    );
  }

  getCanvasPosition() {
    const { x, y, width } = this.el.getBoundingClientRect();
    const top = y - this.height / 2;
    const left = x - this.width / 2 + width / 2;
    return { top: `${top}px`, left: `${left}px` };
  }

  create() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.border = '1px solid black';
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.el.parentElement?.appendChild(this.canvas);
  }

  start() {
    if (!this.canvas) return;
    this._createParticle(0);
    setInterval(() => {
      this.draw();
    }, 1000 / 60);
  }

  clearCanvas() {
    const context = this.getContext();
    if (!context) return;

    context.clearRect(0, 0, this.width, this.height);
  }

  getContext() {
    return this.canvas?.getContext('2d');
  }

  draw() {
    const context = this.getContext();
    if (!context) return;

    this.clearCanvas();
    this.particles.forEach((particle, i) => {
      context.beginPath();
      // context.globalAlpha = this.getOpacity(particle);
      context.fillStyle = particle.color;
      context.fillRect(
        particle.x,
        particle.y,
        this.particleSize,
        this.particleSize,
      );
      particle.x += particle.vx;
      particle.y -= particle.vy;
      particle.vy -= this.gravity;
      // particle.rotation += (particle.rotationRate * Math.PI) / 180;
      // particle.age += 1;

      // if (particle.outsideBounds(this.width, this.height)) {
      //   this.particles.splice(i, 1);
      // }
    });
  }
}
