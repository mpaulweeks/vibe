import BaseVisu from './BaseVisu';
import CubeCanvas from './CubeCanvas';
import {
  NewIntegerSetting,
  NewColorSetting,
} from './VisuSetting';
import {
  DummyMouse,
} from './CubeHelper';
import SettingsOptionManager from './SettingsOptionManager';
import CubeSettings from './CubeSettings';

class CubeVisu extends BaseVisu {
  constructor(props) {
    super(props);
    this.instructions = [
      'move your mouse to make waves',
      'click anywhere in grid to change the pattern',
    ];
    this.settingsManager = new CubeSettings();
    this.updateCanvasSettings();
    this.settingOptions = new SettingsOptionManager([
      NewIntegerSetting('edge', 'Cube Size', 20, 200, 5),
      NewIntegerSetting('shrinkRate', 'Size Retention Rate %', 70, 99, 1),
      NewIntegerSetting('spreadX', 'Splash Left/Right', 0, 20, 1),
      NewIntegerSetting('spreadY', 'Splash Up/Down', 0, 20, 1),
      NewIntegerSetting('countDummyMice', 'Automated Movers', 0, 30, 1),
      NewColorSetting('colorFace', 'Cube Color'),
      NewColorSetting('colorEdge', 'Edge Color'),
      NewColorSetting('focusFace', 'Moving Cube Color'),
      NewColorSetting('focusEdge', 'Moving Edge Color'),
    ]);
    this.dummyMice = [];
  }

  updateCanvasSettings() {
    this.canvas.setSettings(this.settingsManager.get());
    this.dummyMice = []; // reset mice position
  }
  setCustomSettings(newSettings) {
    const mergedSettings = {
      ...this.getCurrentSettings(),
      ...newSettings,
    };
    this.settingsManager.newCustom(mergedSettings);
    this.updateCanvasSettings();
  }
  getCurrentSettings() {
    return this.settingsManager.get();
  }

  createCanvas(canvasHelper) {
    return new CubeCanvas(canvasHelper);
  }
  onMouseClick() {
    this.settingsManager.next();
    this.updateCanvasSettings();
  }
  handleDummyMice() {
    const { countDummyMice } = this.getCurrentSettings();
    const { dummyMice, canvas } = this;
    while (countDummyMice < dummyMice.length) {
      dummyMice.pop();
    }
    while (countDummyMice > dummyMice.length) {
      dummyMice.push(new DummyMouse(20, 1, 50, 50));
    }
    const { canvasW, canvasH } = canvas.getCanvasTools();
    dummyMice.forEach(dm => {
      dm.move();
      dm.checkOutOfBounds(canvasW, canvasH);
      canvas.dummyMouse(dm);
    });
  }
  tick() {
    const { shrinkRate } = this.getCurrentSettings();
    this.handleDummyMice();
    this.canvas.mt.slowDown(shrinkRate/100);
  }
}

export default CubeVisu;
