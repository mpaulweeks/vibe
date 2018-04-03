import BaseVisu from './BaseVisu';
import CubeCanvas from './CubeCanvas';
import {
  NewIntegerSetting,
  NewBooleanSetting,
} from './VisuSetting';
import {
  DummyMouse,
} from './CubeHelper';

const defaultSettings = {
  edge: 40,
  shrinkRate: 90,
  spreadX: 1,
  spreadY: 1,
  countDummyMice: 5,
};

class CubeVisu extends BaseVisu {
  constructor(props) {
    super(props);
    this.setCustomSettings(defaultSettings);
    this.settingOptions = [
      NewIntegerSetting('edge', 'Cube Size', 20, 200, 5),
      NewIntegerSetting('shrinkRate', 'Size Retention Rate %', 70, 99, 1),
      NewIntegerSetting('spreadX', 'Splash Left/Right', 0, 20, 1),
      NewIntegerSetting('spreadY', 'Splash Up/Down', 0, 20, 1),
      NewIntegerSetting('countDummyMice', 'Automated Movers', 0, 30, 1),
    ];
    this.dummyMice = [];
  }
  setCustomSettings(newSettings) {
    this.settings = {
      ...(this.settings || {}),
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
  handleDummyMice() {
    const { countDummyMice } = this.settings;
    const { dummyMice, canvas } = this;
    while (countDummyMice < dummyMice.length) {
      dummyMice.pop();
    }
    while (countDummyMice > dummyMice.length) {
      dummyMice.push(new DummyMouse(40, 1, 50, 50));
    }
    const { canvasW, canvasH } = canvas.getCanvasTools();
    dummyMice.forEach(dm => {
      dm.move();
      dm.checkOutOfBounds(canvasW, canvasH);
      canvas.dummyMouse(dm.size, dm.x, dm.y);
    });
  }
  tick() {
    this.handleDummyMice();
    this.canvas.mt.slowDown(this.settings.shrinkRate/100);
  }
}

export default CubeVisu;
