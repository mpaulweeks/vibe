import BaseVisu from './BaseVisu';
import TailCanvas from './TailCanvas';

class TailVisu extends BaseVisu {
  constructor(...props) {
    super(...props);
    this.instructions = [
      'tbd',
    ];
    this.settingOptions = [];
  }
  createCanvas(canvasHelper) {
    return new TailCanvas(canvasHelper);
  }
  tick() {
    // do nothing for now, this is purely movement based
  }
}

export default TailVisu;
