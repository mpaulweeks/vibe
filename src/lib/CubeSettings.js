import SettingsPresetManager from './SettingsPresetManager';
import { Settings } from './Gradient';

const Colors = {
  Blue: 'rgb(38,57,131)',
  Yellow: 'rgb(252,253,117)',
  Black: '#252502',
  Grey: '#999999',
  White: '#CCCCCC',
}
const defaultSettings = new Settings({
  edge: 30,
  shrinkRate: 90,
  spreadX: 1,
  spreadY: 1,
  countDummyMice: 0,
  colorFaceRainbow: 0,
  colorFace: Colors.Blue,
  colorEdge: Colors.Yellow,
  focusFaceRainbow: 0,
  focusFace: Colors.Blue,
  focusEdge: Colors.Yellow,
});

const presets = [
  {},
  {
    edge: 30,
    shrinkRate: 99,
    spreadX: 0,
    spreadY: 0,
    countDummyMice: 1,
    colorFaceRainbow: 0,
    colorFace: Colors.White,
    colorEdge: Colors.White,
  focusFaceRainbow: 0,
    focusFace: Colors.White,
    focusEdge: Colors.Grey,
  },
  {
    edge: 30,
    spreadX: 1,
    spreadY: 1,
    countDummyMice: 3,
    colorFaceRainbow: 0,
    colorFace: Colors.Blue,
    colorEdge: Colors.Blue,
  focusFaceRainbow: 0,
    focusFace: Colors.Black,
    focusEdge: Colors.Blue,
  },
  {
    edge: 30,
    shrinkRate: 80,
    spreadX: 0,
    spreadY: 0,
    countDummyMice: 10,
    colorFaceRainbow: 0,
    colorFace: Colors.Black,
    colorEdge: Colors.White,
    focusFaceRainbow: 1,
    focusFace: Colors.Black,
    focusEdge: Colors.White,
  },
];

class CubeSettings extends SettingsPresetManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default CubeSettings;
