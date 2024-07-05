import React, { useState } from 'react';
import { settingsType, genTypes } from '../assets/settingsTypes';
import { colorSchemes } from '../assets/colors';
import Button from '../ui/Button';

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

  return (
    <div className="px-1 space-y-2 py-2">
      <div className="flex flex-row gap-2">
        <canvas id="canvas" className="overflow-hidden hidden"></canvas>
        <Button onClick={genOrig} text="Generate" />
        <Button onClick={genOrig} text="Insert" />
        <Button onClick={genOrig} text="Insert as Image" />
      </div>
      <div className="font-semibold">Preview</div>
      {currentImage && (
        <img src={currentImage} className="w-full md:w-1/2"></img>
      )}
    </div>
  );
}

export default Canvas;
