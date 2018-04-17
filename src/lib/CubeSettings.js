import SettingsPresetManager from './SettingsPresetManager';

const Colors = {
  Blue: 'rgb(38,57,131)',
  Yellow: 'rgb(252,253,117)',
  Black: '#252502',
}
const defaultSettings = {
  edge: 30,
  shrinkRate: 90,
  spreadX: 1,
  spreadY: 1,
  countDummyMice: 0,
  colorFace: Colors.Blue,
  colorEdge: Colors.Yellow,
  focusFace: Colors.Blue,
  focusEdge: Colors.Yellow,
};

const presets = [
  {},
  {
    edge: 30,
    shrinkRate: 99,
    spreadX: 0,
    spreadY: 0,
    countDummyMice: 1,
    colorFace: '#CCCCCC',
    colorEdge: '#CCCCCC',
    focusFace: '#CCCCCC',
    focusEdge: '#999999',
  },
  {
    edge: 30,
    spreadX: 1,
    spreadY: 1,
    countDummyMice: 3,
    colorFace: Colors.Blue,
    colorEdge: Colors.Blue,
    focusFace: Colors.Black,
    focusEdge: Colors.Blue,
  },
];

class CubeSettings extends SettingsPresetManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default CubeSettings;
