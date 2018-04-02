import BaseVisu from './BaseVisu';
import CubeCanvas from './CubeCanvas';
import VisuSetting from './VisuSetting';

class CubeVisu extends BaseVisu {
  constructor(props) {
    super(props);
    this.settings = {};
    this.setCustomSettings({
      edge: 40,
      shrinkRate: 90,
      spreadX: 2,
      spreadY: 1,
    });
    this.settingOptions = [
      new VisuSetting('edge', 'Cube Size', 20, 200, 5),
      new VisuSetting('shrinkRate', 'Size Retention Rate %', 70, 99, 1),
      new VisuSetting('spreadX', 'Splash Left/Right', 0, 20, 1),
      new VisuSetting('spreadY', 'Splash Up/Down', 0, 20, 1),
    ];
  }
  setCustomSettings(newSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings,
    };
    this.canvas.setSettings(this.settings);
  }
  getCurrentSettings() {
    return this.settings;
  }
  createCanvas(canvasHelper) {
    return new CubeCanvas(canvasHelper);
  }
  tick() {
    this.canvas.mt.slowDown(this.settings.shrinkRate/100);
  }
}

export default CubeVisu;
