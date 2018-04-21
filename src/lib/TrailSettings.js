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
  {},
  {
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
    distance: 100,
    rpm: 60,
    count: 1000,
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
    radius: 15,
  },
]

class TrailSettings extends SettingsPresetManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default TrailSettings;
