import { useRef, useState } from 'react';
import {
  genTypes,
  settingsType,
  defaultSettings,
} from '../assets/settingsTypes';

type OptionsType = {
  options: settingsType;
  setOptions: (newOptions: settingsType) => void;
  selectedType: genTypes;
  setSelectedType: (newSettings: genTypes) => void;
  setHeight: (h: number | undefined) => void;
};

type selectedTypeList = {
  name: string;
  value: genTypes;
};

const selectedTypeList: selectedTypeList[] = [
  { name: 'Original', value: 'original' },
  { name: 'Hexagon', value: 'hexagon' },
  { name: 'Waves', value: 'waves' },
  { name: 'Blur', value: 'blur' },
];

const clamp = (num: number, min: number, max: number) => {
  if (Number.isNaN(num)) {
    num = 0;
  }
  return Math.max(Math.min(num, max), min);
};

function Options({
  setOptions,
  selectedType,
  setSelectedType,
  setHeight,
}: OptionsType) {
  const [localOptions, setLocalOptions] =
    useState<settingsType>(defaultSettings);
  const content = useRef<HTMLDivElement>(null);

  const updateOptions = (override: any = null) => {
    let newOptions: { [k: string]: any } = override;
    if (!override) {
      newOptions = {
        ...localOptions,
      } as settingsType;
    }
    const grayOverlay = clamp(parseFloat(newOptions['GrayOverlay']), 0, 1);
    newOptions['GrayOverlay'] = grayOverlay;
    const Rows = clamp(parseFloat(newOptions['Rows']), 0, 15);
    newOptions['Rows'] = Rows;
    const HexagonSize = clamp(parseFloat(newOptions['HexagonSize']), 10, 200);
    newOptions['HexagonSize'] = HexagonSize;
    const HexagonNoise = clamp(parseFloat(newOptions['HexagonNoise']), 0, 30);
    newOptions['HexagonNoise'] = HexagonNoise;
    const WavesWaviness = clamp(
      parseFloat(newOptions['WavesWaviness']),
      -100,
      100
    );
    newOptions['WavesWaviness'] = WavesWaviness;
    const WavesSlope = clamp(parseFloat(newOptions['WavesSlope']), -100, 100);
    newOptions['WavesSlope'] = WavesSlope;
    const WavesDistance = clamp(
      parseFloat(newOptions['WavesDistance']),
      -100,
      100
    );
    newOptions['WavesDistance'] = WavesDistance;
    const BlurSegments = clamp(parseFloat(newOptions['BlurSegments']), 0, 20);
    const BlurScaling = clamp(parseFloat(newOptions['BlurScaling']), 0, 20);
    newOptions['BlurSegments'] = BlurSegments;
    newOptions['BlurScaling'] = BlurScaling;
    setOptions(newOptions as settingsType);
    setLocalOptions(newOptions as settingsType);
  };

  const updateLocalOptions = (name: string, value: any) => {
    const newOptions: { [k: string]: any } = { ...localOptions };
    newOptions[name] = value;
    setLocalOptions(newOptions as settingsType);
  };

  const updateOptionsToggle = (name: string) => {
    const newOptions: { [k: string]: any } = { ...localOptions };
    newOptions[name] = !newOptions[name];
    setLocalOptions(newOptions as settingsType);
    updateOptions(newOptions);
  };

  return (
    <div className="flex flex-col space-y-2 px-2 py-2 text-sm" ref={content}>
      <div className="flex flex-row space-x-2">
        <div>White Overlay (0 to 1): </div>{' '}
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          className="border border-gray-300 rounded-md pl-2"
          value={localOptions.GrayOverlay}
          onChange={(e) => updateLocalOptions('GrayOverlay', e.target.value)}
          onBlur={() => updateOptions()}
        ></input>
      </div>
      <div className="space-y-1">
        <div className="font-semibold text-gray-800">Background Type</div>
        {selectedTypeList.map((t) => {
          return (
            <div
              className={`border border-gray-200 rounded-md p-4 py-2 gap-2 flex flex-row cursor-pointer ${
                selectedType === t.value && 'bg-gray-200 border-gray-500'
              }`}
              onClick={() => {
                setSelectedType(t.value);
                setHeight(290);
              }}
            >
              <input type="radio" checked={selectedType === t.value}></input>
              <div>{t.name}</div>
              {t.value == 'blur' && (
                <div className="rounded-md bg-gradient-to-r from-indigo-600 to-pink-400 text-white px-2 text-sm">
                  Beta
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedType === 'original' && (
        <div className={`border border-gray-200 rounded-md p-4 space-y-4 `}>
          <div className="flex flex-row space-x-2">
            <div>Rows (0 to 15): </div>
            <input
              type="number"
              min="0"
              max="15"
              step="1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.Rows}
              onChange={(e) => updateLocalOptions('Rows', e.target.value)}
              onBlur={() => updateOptions()}
            ></input>
          </div>
        </div>
      )}
      {selectedType === 'hexagon' && (
        <div className={`border border-gray-200 rounded-md p-4 space-y-4`}>
          <div className="flex flex-row gap-2 flex-wrap">
            <div>Hexagon Size (10 to 200): </div>{' '}
            <input
              type="number"
              min="0"
              max="200"
              step="10"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.HexagonSize}
              onChange={(e) =>
                updateLocalOptions('HexagonSize', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row space-x-2">
            <div>Color Noise (0 to 30): </div>{' '}
            <input
              type="number"
              min="0"
              max="30"
              step="1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.HexagonNoise}
              onChange={(e) =>
                updateLocalOptions('HexagonNoise', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
        </div>
      )}
      {selectedType === 'waves' && (
        <div
          className={`border border-gray-200 rounded-md p-4 space-y-4 mb-10`}
        >
          <div className="flex flex-row gap-2 flex-wrap">
            <div>Waviness (-100 to 100): </div>
            <input
              type="number"
              min="-100"
              max="100"
              step="20"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.WavesWaviness}
              onChange={(e) =>
                updateLocalOptions('WavesWaviness', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row space-x-2">
            <div>Slope: </div>{' '}
            <input
              type="number"
              min="-200"
              max="200"
              step="1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.WavesSlope}
              onChange={(e) => updateLocalOptions('WavesSlope', e.target.value)}
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            <div>Distance (-100 to 100): </div>{' '}
            <input
              type="number"
              min="-100"
              max="100"
              step="1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.WavesDistance}
              onChange={(e) =>
                updateLocalOptions('WavesDistance', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              checked={localOptions.WavesCustomColor}
              onChange={() => updateOptionsToggle('WavesCustomColor')}
            />
            <div>Use Custom Colors</div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div>Custom Color: </div>
            <input
              type="color"
              className="border border-gray-300 rounded-md"
              value={localOptions.WavesColor1}
              onChange={(e) =>
                updateLocalOptions('WavesColor1', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div>Secondary Color: </div>{' '}
            <input
              type="color"
              className="border border-gray-300 rounded-md"
              value={localOptions.WavesColor2}
              onChange={(e) =>
                updateLocalOptions('WavesColor2', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
        </div>
      )}
      {selectedType === 'blur' && (
        <div
          className={`border border-gray-200 rounded-md p-4 space-y-4 mb-10`}
        >
          <div className="flex flex-row gap-2 flex-wrap">
            <div>Scaling (0 to 20): </div>{' '}
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.BlurScaling}
              onChange={(e) =>
                updateLocalOptions('BlurScaling', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            <div>Segments (0 to 20): </div>{' '}
            <input
              type="number"
              min="0"
              max="20"
              step="1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.BlurSegments}
              onChange={(e) =>
                updateLocalOptions('BlurSegments', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              checked={localOptions.BlurCustomColor}
              onChange={() => updateOptionsToggle('BlurCustomColor')}
            />
            <div>Use Custom Color</div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div>Primary Color: </div>
            <input
              type="color"
              className="border border-gray-300 rounded-md"
              value={localOptions.BlurPrimaryColor}
              onChange={(e) =>
                updateLocalOptions('BlurPrimaryColor', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              checked={localOptions.BlurPreserveSeed}
              onChange={() => updateOptionsToggle('BlurPreserveSeed')}
            />
            <div>Preserve Seed</div>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            <div>Resolution (1 to 4): </div>{' '}
            <input
              type="number"
              min="0"
              max="4"
              step="1"
              className="border border-gray-300 rounded-md pl-2"
              value={localOptions.BlurResolutionScaling}
              onChange={(e) =>
                updateLocalOptions('BlurResolutionScaling', e.target.value)
              }
              onBlur={() => updateOptions()}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default Options;
