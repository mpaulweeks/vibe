class SettingsOptionManager {
  constructor(visuSettings, dependencies){
    this.visuSettings = visuSettings;
    this.dependencies = dependencies || {};
  }
  get(currentSettings) {
    const { visuSettings, dependencies } = this;
    const toDisplay = [];
    visuSettings.forEach(vs => {
      const dep = dependencies[vs.name];
      const include = !dep || dep(currentSettings);
      if (include){
        toDisplay.push(vs);
      }
    });
    return toDisplay;
  }
}

export default SettingsOptionManager;
