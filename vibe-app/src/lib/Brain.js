import Looper from './Looper';
import CanvasHandler from './CanvasHandler';

import RainbowVisu from './RainbowVisu';
import CubeVisu from './CubeVisu';

class Brain {
  constructor() {
    this.visuType = 'rainbow';
    // this.visuType = 'cube';
  }
  init(canvasElm) {
    this.ch = new CanvasHandler(
      canvasElm,
      mouseData => this.onCanvasClick(mouseData),
      mouseData => this.onCanvasMove(mouseData)
    )
    this.visuLookup = {
      'rainbow': new RainbowVisu(this),
      'cube': new CubeVisu(this),
    };

    Looper.logicLoop(looper => {
      this.loopTick();
    });
    Looper.drawLoop(looper => {
      this.loopDraw();
      if (looper.isDebug){
        var stats = looper.getStats();
        this.ch.drawStats(stats);
      }
    });
  }
  setType(type) {
    this.visuType = type;
  }
  visuApp() {
    return this.visuLookup[this.visuType];
  }
  loopTick() {
    this.visuApp().tick();
  }
  loopDraw() {
    this.visuApp().draw();
  }
  onCanvasClick(mouseData) {
    this.visuApp().onClick(mouseData);
  }
  onCanvasMove(mouseData) {
    this.visuApp().onMove(mouseData);
  }
}

export default Brain;
