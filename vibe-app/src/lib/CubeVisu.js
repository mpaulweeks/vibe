import BaseVisu from './BaseVisu';
import CubeCanvas from './CubeCanvas';
import {
  NewVisuSetting,
  NewIntegerSetting,
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
  colorFace: 'rgb(38,57,131)',
  colorEdge: 'rgb(252,253,117)',
};

class CubeVisu extends BaseVisu {
  constructor(props) {
    super(props);
    this.instructions = [
      'move your mouse to make waves',
    ]
    this.setCustomSettings(defaultSettings);
    this.settingOptions = [
      NewIntegerSetting('edge', 'Cube Size', 20, 200, 5),
      NewIntegerSetting('shrinkRate', 'Size Retention Rate %', 70, 99, 1),
      NewIntegerSetting('spreadX', 'Splash Left/Right', 0, 20, 1),
      NewIntegerSetting('spreadY', 'Splash Up/Down', 0, 20, 1),
      NewIntegerSetting('countDummyMice', 'Automated Movers', 0, 30, 1),
      NewVisuSetting('colorFace', 'Cube Color', [
        ['rgb(38,57,131)', 'Blue'],
        ['black', 'Black'],
        ['white', 'White'],
      ]),
      NewVisuSetting('colorEdge', 'Edge Color', [
        ['rgb(252,253,117)', 'Yellow'],
        ['white', 'White'],
        ['black', 'Black'],
      ]),
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
