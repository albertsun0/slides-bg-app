import React, { useEffect, useState } from 'react';
import { settingsType, genTypes } from '../assets/settingsTypes';
import { colorSchemes } from '../assets/colors';
import Button from '../ui/Button';
import { colchange, shuffle, hexToRgb, bzCurve } from '../assets/utils';

type CanvasProps = {
  options: settingsType;
  currentType: genTypes;
  colorIndex: number;
  addImage: (src: string) => void;
  addImageSlide: (src: string) => void;
};

function Canvas({
  options,
  currentType,
  colorIndex,
  addImage,
  addImageSlide,
}: CanvasProps) {
  const [currentImage, setCurrentImage] = useState<string>('');
  const getColorScheme = (i: number) => {
    if (i === -1) {
      return Math.floor(Math.random() * colorSchemes.length);
    }
    return i;
  };

  const genOrig = () => {
    var c = document.getElementById('canvas') as HTMLCanvasElement;
    var ctx = c.getContext('2d') as CanvasRenderingContext2D;
    c.width = 640 * 2;
    c.height = 360 * 2;
    ctx.save();

    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    //draw rect
    ctx.rotate(((10 + Math.random() * 40) * Math.PI) / 180);

    const colors = colorSchemes[getColorScheme(colorIndex)].colors;

    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

    ctx.fillRect(0, 0, c.width, c.height);
    const times = options.Rows;
    var preX = 0; // x val of previous rectangle
    for (var i = 0; i < times; i++) {
      var cw;
      if (Math.random() > 0.5) {
        cw = c.width / times + Math.random() * (c.width / times);
      } else {
        cw = c.width / times - Math.random() * (c.width / (times * 3));
      }

      const color = colors[Math.floor(Math.random() * colors.length)];

      ctx.fillStyle = color; //random colors
      ctx.fillRect(preX, -1000, 10000, 10000);
      preX = preX + cw;
    }
    if (Math.random() > 0.5) {
      ctx.fillStyle = colors[Math.round(Math.random() * colors.length)]; //random color
      ctx.fillRect(c.width - Math.random() * c.width - 100, -2000, 50000, 2000);
    } else {
      ctx.fillStyle = colors[0]; //random color
      var yVal = Math.random() < 0.5 ? c.height : 0;
      if (yVal > 0) {
        //bottom circle
        var xVal = Math.random() < 0.5 ? c.width / 3 : c.width - c.width / 6;
        ctx.moveTo(xVal, yVal);
        ctx.arc(xVal, yVal, Math.random() * 100 + 500, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        var xVal = Math.random() < 0.5 ? c.width / 4 : c.width - c.width / 6;
        ctx.moveTo(xVal, yVal);
        ctx.arc(xVal, yVal, Math.random() * 100 + 400, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    //gray overlay
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,' + options.GrayOverlay + ')';
    ctx.fillRect(0, 0, c.width, c.height);

    const imgfull = c.toDataURL('image/png');
    setCurrentImage(imgfull);
  };

  const genhex = () => {
    var c = document.getElementById('canvas') as HTMLCanvasElement;
    var ctx = c.getContext('2d') as CanvasRenderingContext2D;
    c.width = 640 * 2;
    c.height = 360 * 2;

    var x = 0;
    var y = 0;
    ctx.fillStyle = 'gainsboro';

    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.save();
    ctx.restore();
    ctx.fillStyle = '#bbbbbb';
    x = 0;
    y = 0;
    const colors = colorSchemes[getColorScheme(colorIndex)].colors;
    var newcolarr = colors.slice();
    shuffle(newcolarr);

    const size = options.HexagonSize;

    for (var i = 0; i < c.width / size; i++) {
      for (var b = 0; b < c.height / size; b++) {
        ctx.beginPath();
        ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

        for (var side = 0; side < 7; side++) {
          ctx.lineTo(
            x + size * Math.cos((side * 2 * Math.PI) / 6),
            y + size * Math.sin((side * 2 * Math.PI) / 6)
          );
        }
        //color stuff
        const colidx =
          Math.floor((i + b) / (c.width / size / newcolarr.length)) %
          newcolarr.length;
        const colcol = newcolarr[colidx];
        const nextcol = hexToRgb(newcolarr[(colidx + 1) % newcolarr.length])!;
        const diagcol = hexToRgb(colcol)!;
        for (var xd = 0; xd < 3; xd++) {
          diagcol[xd] =
            diagcol[xd] +
            ((nextcol[xd] - diagcol[xd]) /
              (c.width / size / newcolarr.length)) *
              ((i + b) % (c.width / size / newcolarr.length));
        }
        const noise = options.HexagonNoise;
        ctx.fillStyle =
          'rgb(' +
          colchange(diagcol[0], noise) +
          ',' +
          colchange(diagcol[1], noise) +
          ',' +
          colchange(diagcol[2], noise) +
          ')';
        ctx.fill();
        y = y + size * 1.732050808;
      }
      x = x + size * 1.5;
      if (i % 2 == 0) y = -size * 0.866025404;
      else y = 0;
    }
    //gray overlay
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,' + options.GrayOverlay + ')';
    ctx.fillRect(0, 0, c.width, c.height);

    const imgfull = c.toDataURL('image/png');
    setCurrentImage(imgfull);
  };

  const genwaves = () => {
    var c = document.getElementById('canvas') as HTMLCanvasElement;
    var ctx = c.getContext('2d') as CanvasRenderingContext2D;
    c.width = 640 * 2;
    c.height = 360 * 2;
    ctx.clearRect(0, 0, c.width, c.height);
    const colors = colorSchemes[getColorScheme(colorIndex)].colors;
    var bg_col = colors[Math.floor(Math.random() * colors.length)];
    if (options.WavesCustomColor == true) bg_col = options.WavesColor2;
    ctx.fillStyle = bg_col;
    ctx.fillRect(0, 0, c.width, c.height);
    const variation = 100; //use this as variable?
    const dy = options.WavesSlope;
    var lines = [];
    var prey = 720;
    var X = -10;
    var t = 400; // control the width of X.
    for (var i = 0; i < 10; i++) {
      const Y = prey - Math.floor(Math.random() * variation + dy);
      prey = Y;
      const p = { x: X, y: Y };
      lines.push(p);
      X = X + t;
    }

    // Draw smooth line
    ctx.setLineDash([0]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    bzCurve(
      lines,
      options.WavesDistance,
      ctx,
      colors,
      options.WavesColor1,
      options.WavesCustomColor,
      0.3,
      options.WavesWaviness
    );

    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,' + options.GrayOverlay + ')';
    ctx.fillRect(0, 0, c.width, c.height);

    const imgfull = c.toDataURL('image/png');
    setCurrentImage(imgfull);
  };

  const gen = () => {
    if (currentType == 'waves') {
      genwaves();
    } else if (currentType == 'hexagon') {
      genhex();
    } else {
      genOrig();
    }
  };

  useEffect(() => {
    addImageSlide(currentImage.substring(22));
  }, [currentImage]);

  return (
    <div className="px-1 space-y-2 py-2">
      <div className="flex flex-row gap-2">
        <canvas id="canvas" className="overflow-hidden hidden"></canvas>
        <Button onClick={gen} text="Generate" />
        <Button
          onClick={() => addImageSlide(currentImage.substring(22))}
          text="Insert"
        />
        <Button
          onClick={() => addImage(currentImage.substring(22))}
          text="Insert as Image"
        />
      </div>
      <div className="font-semibold">Preview</div>
      {currentImage && (
        <img src={currentImage} className="w-full md:w-1/2"></img>
      )}
    </div>
  );
}

export default Canvas;
