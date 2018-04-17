import SettingsPresetManager from './SettingsPresetManager';

const defaultSettings = {
  colorFill: 'blue',
  colorEdge: 'white',
  distance: 70,
  rpm: 60,
  count: 3,
  radius: 50,
};

const presets = [
 {},
]

class TailSettings extends SettingsPresetManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default TailSettings;
