import { useState } from 'react';
import ColorPicker from './ColorPicker';
import { src } from '../assets/b64img';
// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import Accordion from './Accordion';
import { colorSchemes } from '../assets/colors';
const Generator = () => {
  const [selectedType, setSelectedType] = useState('original');
  const [currentImage, setCurrentImage] = useState('');
  const [colorIndex, setColorIndex] = useState(-1);

  const addImage = () => {
    serverFunctions.addImage(src);
  };

  const addImageSlide = () => {
    serverFunctions.addImageSlide(src);
  };

  return (
    <div>
      <Accordion
        title="Select Theme"
        Children={
          <ColorPicker
            setColor={(i: number) => setColorIndex(i)}
            selectedColor={colorIndex}
          ></ColorPicker>
        }
        color={colorIndex !== -1 ? colorSchemes[colorIndex].colors[0] : ''}
      />

      <button onClick={addImage} className="bg-blue-500">
        hello button
      </button>
    </div>
  );
};

export default Generator;
