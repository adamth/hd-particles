const rotatePoint = (x, y, degrees) => {
  const x2 = Math.cos(degrees) * x - Math.sin(degrees) * y;
  const y2 = Math.sin(degrees) * x + Math.cos(degrees) * y;
  return {x: x2, y: y2};
};
const drawPoints = (context, points, particle, scale) => {
  const length = points.length;
  context.beginPath();
  const start = rotatePoint(points[0][0], points[0][1], particle.rotation);
  context.moveTo(particle.x + start.x * scale, particle.y + start.y * scale);
  for (let i = 0; i < length; i++) {
    const rotatedPoint = rotatePoint(points[i][0], points[i][1], particle.rotation);
    context.lineTo(particle.x + rotatedPoint.x * scale, particle.y + rotatedPoint.y * scale);
  }
};
export const star = (context, particle, scale = 1) => {
  const points = [
    [0, 85],
    [75, 75],
    [100, 10],
    [125, 75],
    [200, 85],
    [150, 125],
    [160, 190],
    [100, 150],
    [40, 190],
    [50, 125],
    [0, 85]
  ];
  drawPoints(context, points, particle, scale);
};
export const rectangle = (context, particle, scale = 1) => {
  const points = [
    [0, 0],
    [20, 0],
    [20, 10],
    [0, 10]
  ];
  drawPoints(context, points, particle, scale);
};
export const diamond = (context, particle, scale = 1) => {
  const points = [
    [20, 0],
    [40, 40],
    [20, 80],
    [0, 40]
  ];
  drawPoints(context, points, particle, scale);
};
export const circle = (context, particle, scale = 1) => {
  context.arc(particle.x, particle.y, 20 * scale, 0, Math.PI * 2, false);
};
