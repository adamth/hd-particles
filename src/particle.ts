type Shape = 'star' | 'square' | 'circle' | 'diamond';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string = 'black';
  age: number = 0;
  shape: Shape;
  rotation: number = 0;
  rotationRate: number = 0;

  constructor(
    x: number,
    y: number,
    vx: number = 0,
    vy: number = 0,
    color: string = 'black',
    rotationRate: number = 0,
  ) {
    const shapes = ['star', 'square', 'circle', 'diamond'];
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.shape = shapes[Math.floor(Math.random() * 4)] as Shape;
    this.rotationRate = rotationRate;
  }

  outsideBounds(width: number, height: number): boolean {
    return this.x < 0 || this.x > width || this.y > height;
  }
}
