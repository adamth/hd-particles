import { Particles } from './particles';

const button = document.getElementById('button');
button?.addEventListener('click', () => {
  const particles = new Particles(button, 1200, 1200, 100);
  particles.create();
  particles.start();
});
