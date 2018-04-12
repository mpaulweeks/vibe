class BaseCanvas {
  constructor(canvasHandler) {
    this.canvasHandler = canvasHandler;
    this.prevMouseData = {};
    this.mouseData = {
      x: 100,
      y: 100,
    };
  }

  onMouseClick(mouseData) {
    this.prevMouseData = this.mouseData;
    this.mouseData = mouseData;
  }
  onMouseMove(mouseData) {
    this.prevMouseData = this.mouseData;
    this.mouseData = mouseData;
  }
  onMouseDown(mouseData) {
    this.prevMouseData = this.mouseData;
    this.mouseData = mouseData;
  }
  onMouseUp(mouseData) {
    this.prevMouseData = this.mouseData;
    this.mouseData = mouseData;
  }

  getCanvasTools() {
    return {
      ...this.canvasHandler.getCanvasTools(),
      mouseData: this.mouseData,
    }
  }
  clear(style) {
    const { ctx, canvasW, canvasH } = this.getCanvasTools();
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }
}

export default BaseCanvas;
