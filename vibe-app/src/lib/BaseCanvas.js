class BaseCanvas {
  constructor(canvasHandler) {
    this.canvasHandler = canvasHandler;
    this.prevMouseData = {};
    this.mouseData = {
      x: 100,
      y: 100,
    };
  }
  onClick(mouseData) {
    this.prevMouseData = this.mouseData;
    this.mouseData = mouseData;
  }
  onMove(mouseData) {
    this.prevMouseData = this.mouseData;
    this.mouseData = mouseData;
  }
  getCanvasTools(){
    return {
      ...this.canvasHandler.getCanvasTools(),
      mouseData: this.mouseData,
    }
  }
}

export default BaseCanvas;
