import Looper from './Looper';
import CanvasHandler from './CanvasHandler';

import RainbowVisu from './RainbowVisu';
import GravityVisu from './GravityVisu';
import CubeVisu from './CubeVisu';

const Types = [
  {
    type: 'rainbow',
    name: 'Rainbow',
  },
  {
    type: 'gravity',
    name: 'Gravity',
  },
  {
    type: 'cube',
    name: 'Cube',
  },
];

class Brain {
  constructor() {
    this.types = Types;
    this.setType(this.readUrl() || Types[0].type);
    this.callbackFunc = () => {};
  }
  readUrl(){
    const hash = window.location.hash;
    if (hash){
      const type = hash.substring(1).toLowerCase();
      const validTypes = this.types.map(t => t.type);
      if (validTypes.includes(type)){
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
      this,
      canvasElm,
      otherClickables,
    )
    this.visuLookup = {
      'rainbow': new RainbowVisu(this),
      'gravity': new GravityVisu(this),
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
  onCanvasMouseClick(mouseData) {
    this.visuApp().onMouseClick(mouseData);
    this.callbackFunc();
  }
  onCanvasMouseMove(mouseData) {
    this.visuApp().onMouseMove(mouseData);
  }
  onCanvasMouseDown(mouseData) {
    this.visuApp().onMouseDown(mouseData);
  }
  onCanvasMouseUp(mouseData) {
    this.visuApp().onMouseUp(mouseData);
  }
}

export default Brain;
