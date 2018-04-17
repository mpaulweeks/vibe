import SettingsPresetManager from './SettingsPresetManager';
import { Settings } from './Gradient';

const defaultSettings = new Settings({
  colorFill: 'blue',
  colorEdge: 'white',
  isRainbow: 1,
  distance: 70,
  rpm: 60,
  count: 3,
  radius: 50,
});

const presets = [
 {},
]

class TailSettings extends SettingsPresetManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default TailSettings;
