import { Particles } from './particles';

const particles = new Particles(
  document.getElementById('canvas') as HTMLElement,
  400,
  400,
  100,
);

particles.create();
particles.start();
