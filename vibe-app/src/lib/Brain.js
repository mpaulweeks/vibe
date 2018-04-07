import Looper from './Looper';
import CanvasHandler from './CanvasHandler';

import RainbowVisu from './RainbowVisu';
import CubeVisu from './CubeVisu';

const TYPES = [
  'rainbow',
  'cube',
];

class Brain {
  constructor() {
    this.setType(this.readUrl() || TYPES[0]);
    this.callbackFunc = () => {};
  }
  readUrl(){
    const hash = window.location.hash;
    if (hash){
      const type = hash.substring(1).toLowerCase();
      if (TYPES.includes(type)){
        return type;
      }
    }
    return null;
  }
  setUrl(){
    window.location.hash = "#" + this.visuType;
  }
  init(canvasElm, otherClickables) {
    this.ch = new CanvasHandler(
      canvasElm,
      otherClickables,
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
    this.setUrl();
  }
  setCallback(func) {
    this.callbackFunc = func;
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
    this.callbackFunc();
  }
  onCanvasMove(mouseData) {
    this.visuApp().onMove(mouseData);
  }
}

export default Brain;
