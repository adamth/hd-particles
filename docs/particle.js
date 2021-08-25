export class Particle {
  constructor(x, y, vx = 0, vy = 0, color = "black", rotationRate = 0) {
    this.color = "black";
    this.age = 0;
    this.rotation = 0;
    this.rotationRate = 0;
    const shapes = ["star", "square", "circle", "diamond"];
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.shape = shapes[Math.floor(Math.random() * 4)];
    this.rotationRate = rotationRate;
  }
  outsideBounds(width, height) {
    return this.x < 0 || this.x > width || this.y > height;
  }
}
