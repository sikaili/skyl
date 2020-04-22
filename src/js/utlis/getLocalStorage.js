const calDistance = (positionA, positionB) => Math.sqrt((positionA.x - positionB.x) ** 2 + (positionA.y - positionB.y) ** 2);

const obj = {};
const names = Object.keys(localStorage).filter((key) => key.includes('noise-draw-#'));
names.forEach((name) => {
  let canvas = JSON.parse(localStorage.getItem(name));
  canvas = canvas[0].filter((point, index) => index % (Math.floor(canvas[0].length / 1000)) === 0);
  const points = [];
  canvas = canvas.forEach((point) => {
    const shouldAdd = points.length === 0 || calDistance(point, points[points.length - 1]) > 2;
    if (shouldAdd) {
      points.push({ x: point.x.toFixed(1), y: point.y.toFixed(1) });
    }
  });
  obj[name] = [points];
});
console.log(JSON.stringify(obj));
