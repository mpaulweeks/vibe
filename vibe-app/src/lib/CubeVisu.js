import BaseVisu from './BaseVisu';
import CubeCanvas from './CubeCanvas';

class CubeVisu extends BaseVisu {
  constructor(props) {
    super(props);
    this.settings = {};
    this.setSettings({
      edge: 40,
      spreadX: 1,
      spreadY: 1,
    });
  }
  setSettings(newSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings,
    };
    this.canvas.setSettings(this.settings);
  }
  createCanvas(canvasHelper) {
    return new CubeCanvas(canvasHelper);
  }
  tick() {
    this.canvas.mt.slowDown(0.9);
  }
}

export default CubeVisu;
