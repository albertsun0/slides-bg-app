export type settingType = {
  name: string;
  type: 'checkbox' | 'number' | 'color';
};
export type settingsType = {
  GrayOverlay: number;
  Rows: number;
  HexagonSize: number;
  HexagonNoise: number;
  WavesWaviness: number;
  WavesSlope: number;
  WavesDistance: number;
  WavesCustomColor: boolean;
  WavesColor1: string;
  WavesColor2: string;
};

export const defaultSettings = {
  GrayOverlay: 0,
  Rows: 6,
  HexagonSize: 100,
  HexagonNoise: 0,
  WavesWaviness: 0,
  WavesSlope: 10,
  WavesDistance: 0,
  WavesCustomColor: false,
  WavesColor1: '#ffffff',
  WavesColor2: '#ffffff',
};

export type genTypes = 'original' | 'hexagon' | 'waves';
