import BaseVisu from './BaseVisu';
import TailCanvas from './TailCanvas';
import {
  NewIntegerSetting,
  NewColorSetting,
} from './VisuSetting';
import SettingsOptionManager from './SettingsOptionManager';
import TailSettings from './TailSettings';

class TailVisu extends BaseVisu {
  constructor(...props) {
    super(...props);
    this.instructions = [
      'tbd',
    ];
    this.settingsManager = new TailSettings();
    this.settingOptions = new SettingsOptionManager([
      NewIntegerSetting('distance', 'Distance from Center', 0, 500, 5),
      NewIntegerSetting('radius', 'Circle Size', 5, 300, 5),
      NewIntegerSetting('count', 'Number of Circles', 1, 20, 1),
      NewIntegerSetting('rpm', 'Rotations per Minute', 0, 600, 1),
      NewColorSetting('colorFill', 'Inner Color'),
      NewColorSetting('colorEdge', 'Outer Color'),
    ], {
      rpm: cs => cs.distance !== 0,
    });
    this.state = {
      rotation: 0,
    }
  }

  setCustomSettings(newSettings) {
    const mergedSettings = {
      ...this.getCurrentSettings(),
      ...newSettings,
    };
    this.settingsManager.newCustom(mergedSettings);
  }
  getCurrentSettings() {
    return this.settingsManager.get();
  }

  createCanvas(canvasHelper) {
    return new TailCanvas(canvasHelper);
  }
  getCanvasSettings(){
    return {
      ...this.getCurrentSettings(),
      ...this.state,
    };
  }
  tick() {
    const { rpm } = this.getCurrentSettings();
    const rotationPerFrame = (rpm * Math.PI * 2) / (60 * 60);
    this.state.rotation = (this.state.rotation + rotationPerFrame) % (Math.PI * 2);
  }
  draw() {
    this.canvas.draw(this.getCanvasSettings());
  }
}

export default TailVisu;
