import BaseVisu from './BaseVisu';

import RainbowCanvas from './RainbowCanvas';
import { RainbowPatterns } from './Pattern';

class RainbowVisu extends BaseVisu {
  createCanvas(canvasHelper) {
    return new RainbowCanvas(canvasHelper);
  }
  constructor(...props) {
    super(...props);
    this.patterns = new RainbowPatterns(this.canvas);
  }
  onClick() {
    // override super
    this.patterns.next();
  }
  tick() {
    this.patterns.get().step();
    this.patterns.get().draw();
  }
}

export default RainbowVisu;
