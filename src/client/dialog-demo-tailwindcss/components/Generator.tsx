import { useState, useRef } from 'react';
import ColorPicker from './ColorPicker';
// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import Accordion from '../ui/Accordion';
import { colorSchemes } from '../assets/colors';

import { defaultSettings, genTypes } from '../assets/settingsTypes';
import Options from './Options';
import Canvas from './Canvas';

const Generator = () => {
  const [selectedType, setSelectedType] = useState<genTypes>('original');

  const [options, setOptions] = useState<any>(defaultSettings);

  const [colorIndex, setColorIndex] = useState(-1);
  const [settingsHeight, setSettingsHeight] = useState<number | undefined>(
    undefined
  );
  const addImage = (src: string) => {
    serverFunctions.addImage(src);
  };

  const addImageSlide = (src: string) => {
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
        collapseOnClick={true}
      />
      <Accordion
        title="Options"
        Children={
          <Options
            options={options}
            setOptions={setOptions}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setHeight={setSettingsHeight}
          ></Options>
        }
        update={selectedType}
        contentHeight={settingsHeight}
      />

      <Canvas
        options={options}
        currentType={selectedType}
        colorIndex={colorIndex}
        addImage={addImage}
        addImageSlide={addImageSlide}
      />
    </div>
  );
};

export default Generator;
