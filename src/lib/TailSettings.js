import SettingsManager from './SettingsManager';

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

class TailSettings extends SettingsManager {
  constructor() {
    super(presets, defaultSettings);
  }
}

export default TailSettings;
