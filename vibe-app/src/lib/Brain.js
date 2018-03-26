import CanvasHandler from './CanvasHandler';
import CubeVisu from './CubeVisu';

class Brain {
  constructor(canvasElm) {
    this.saveCanvas(canvasElm);
    this.visuApp = new CubeVisu(this);

    this.loop();
  }
  loop() {
    this.visuApp.tick(this.ch);
    setTimeout(() => this.loop(), 1000/30);
  }
  onCanvasClick(mouseData) {
    this.visuApp.onClick(mouseData);
  }
  onCanvasMove(mouseData) {
    this.visuApp.onMove(mouseData);
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
