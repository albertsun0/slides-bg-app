export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const lightTextOnColor = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? parseInt(result[1], 16) +
        parseInt(result[2], 16) +
        parseInt(result[3], 16) <
        (255 * 3) / 2
    : true;
};

export const colchange = (col: number, noise: number) => {
  var ret = 0;
  if (Math.random() > 0.5) ret = col + Math.random() * noise;
  else ret = col - Math.random() * noise;
  if (ret > 255) ret = 255;
  if (ret < 0) ret = 0;
  return ret;
};

export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

type point = { x: number; y: number };

function gradient(a: point, b: point) {
  return (b.y - a.y) / (b.x - a.x);
}

export const bzCurve = (
  points: point[],
  distance: number,
  ctx: CanvasRenderingContext2D,
  colors: string[],
  customColor: string,
  useCustomColor: boolean,
  f?: number,
  t?: number
) => {
  console.log('wave');
  if (typeof f == 'undefined') f = 0.3; // sharpness of curve
  if (typeof t == 'undefined') t = 0.6; //built in variation // waviness

  ctx.beginPath();

  var m = 0;
  var dx1 = 0;
  var dy1 = 0;
  var y = distance; //distance y between each curve
  for (var a = 0; a < 7; a++) {
    let region = new Path2D();
    region.moveTo(0, 0);
    region.lineTo(points[0].x, points[0].y - y * a); //line to the bottom left where curve starts
    var preP = points[0];
    preP.y = preP.y - y * a;

    for (var i = 1; i < points.length; i++) {
      var curP = points[i];
      curP.y = curP.y - y * a; //move up y*a
      var nexP = points[i + 1];
      var dx2;
      var dy2;
      if (nexP) {
        m = gradient(preP, nexP);
        dx2 = (nexP.x - curP.x) * -f;
        dy2 = dx2 * m * t;
      } else {
        dx2 = 0;
        dy2 = 0;
      }

      region.bezierCurveTo(
        preP.x - dx1,
        preP.y - dy1,
        curP.x + dx2,
        curP.y + dy2,
        curP.x,
        curP.y
      );

      dx1 = dx2;
      dy1 = dy2;
      preP = curP;
    }
    region.lineTo(1280, 0); //fill entire canvas vetically
    region.lineTo(0, 0);

    var fg_col = colors[Math.floor(Math.random() * colors.length)];

    if (useCustomColor) fg_col = customColor;
    ctx.fillStyle = 'rgba(' + hexToRgb(fg_col) + ',0.3)';
    ctx.fill(region);
  }
  ctx.stroke();
};
