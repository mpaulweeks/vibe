import CanvasHandler from './CanvasHandler';

import RainbowVisu from './RainbowVisu';
import CubeVisu from './CubeVisu';

class Brain {
  constructor(canvasElm) {
    this.saveCanvas(canvasElm);
    this.visuType = 'rainbow';
    this.visuLookup = {
      'rainbow': new RainbowVisu(this),
      'cube': new CubeVisu(this),
    };
    this.loop();
  }
  visuApp() {
    return this.visuLookup[this.visuType];
  }
  loop() {
    this.visuApp().tick(this.ch);
    setTimeout(() => this.loop(), 1000/30);
  }
  onCanvasClick(mouseData) {
    this.visuApp().onClick(mouseData);
  }
  onCanvasMove(mouseData) {
    this.visuApp().onMove(mouseData);
  }
  saveCanvas(canvasElm) {
    this.ch = new CanvasHandler(
      canvasElm,
      mouseData => this.onCanvasClick(mouseData),
      mouseData => this.onCanvasMove(mouseData)
    )
  }
}

export default Brain;
