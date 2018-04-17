class SettingsManager {
  constructor(presets, defaultSettings){
    this.index = 0;
    this.presets = presets.map(s => (
      {
        ...defaultSettings,
        ...s,
      }
    ));
    this.customSettings = null;
  }
  get() {
    const { presets, index, customSettings } = this;
    if (customSettings){
      return customSettings;
    }
    return presets[index];
  }
  next() {
    const { presets, index, customSettings } = this;
    if (customSettings){
      this.customSettings = null;
    } else {
      this.index = (presets.length + index + 1) % presets.length;
    }
  }
  newCustom(settings){
    this.customSettings = settings;
  }
}

export default SettingsManager;
