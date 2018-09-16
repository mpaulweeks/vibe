import SettingsPresetManager from './SettingsPresetManager';
import { Settings } from './Gradient';

const defaultSettings = new Settings({
  pattern: 'ring',
  isRainbow: 0,
  colorFill: 'blue',
  lineWidth: 2,
  colorEdge: 'white',
  colorBackground: 'black',
  distance: 70,
  rpm: 60,
  count: 3,
  radius: 50,
});

const presets = [
  // testing hypno config
  // {
  //   pattern: 'hypno',
  //   isRainbow: 0,
  //   lineWidth: 1,
  //   distance: 0,
  //   rpm: 0,
  //   count: 100,
  //   radius: 25,
  // },
  {
    pattern: 'spiral',
    isRainbow: 1,
    lineWidth: 1,
    colorEdge: 'black',
    distance: 0,
    rpm: 60,
    count: 1000,
    radius: 5,
  },
  {
    pattern: 'hypno',
    isRainbow: 1,
    lineWidth: 1,
    distance: 100,
    rpm: 60,
    count: 600,
    radius: 25,
  },
  {
    pattern: 'spiral',
    isRainbow: 1,
    lineWidth: 0,
    distance: 100,
    rpm: 60,
    count: 1000,
    radius: 25,
  },
  {
    isRainbow: 1,
  },
  {
    pattern: 'ring',
    distance: 160,
    radius: 25,
    count: 50,
    rpm: 60,
    isRainbow: 1,
    lineWidth: 0,
  },
  {
    pattern: 'spiral',
    isRainbow: 1,
    lineWidth: 0,
    distance: 0,
    rpm: 60,
    count: 50,
    radius: 25,
  },
  {
    pattern: 'spiral',
    isRainbow: 1,
    lineWidth: 0,
    distance: 0,
    rpm: 1,
    count: 1000,
    radius: 15,
  },
  {
    pattern: 'spiral',
    isRainbow: 1,
    lineWidth: 1,
    colorEdge: 'black',
    distance: 0,
    rpm: 30,
    count: 1000,
    radius: 5,
  },
]

class TrailSettings extends SettingsPresetManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default TrailSettings;
