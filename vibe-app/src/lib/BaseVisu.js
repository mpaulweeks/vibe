class BaseVisu {
  constructor(parent) {
    this.parent = parent;
    this.canvas = this.createCanvas(parent.ch);
  }
  draw() {
    this.canvas.draw();
  }
  onClick(mouseData) {
    this.canvas.onClick(mouseData);
  }
  onMove(mouseData) {
    this.canvas.onMove(mouseData);
  }
  tick(canvasHelper) {}
}

export default BaseVisu;
