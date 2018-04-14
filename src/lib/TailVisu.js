import BaseVisu from './BaseVisu';
import TailCanvas from './TailCanvas';

class TailVisu extends BaseVisu {
  constructor(...props) {
    super(...props);
    this.instructions = [
      'tbd',
    ];
    this.settingOptions = [];
    this.settings = {
      colorFill: 'blue',
      colorEdge: 'white',
      distance: 70,
      count: 3,
      radius: 50,
    }
    this.state = {
      rotation: 0,
    }
  }
  createCanvas(canvasHelper) {
    return new TailCanvas(canvasHelper);
  }
  getCanvasSettings(){
    return {
      ...this.settings,
      ...this.state,
    };
  }
  tick() {
    this.state.rotation = (this.state.rotation + 0.1) % (Math.PI * 2);
  }
  draw() {
    this.canvas.draw(this.getCanvasSettings());
  }
}

export default TailVisu;
