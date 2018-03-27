class BaseVisu {
  constructor(parent) {
    this.parent = parent;
    this.canvas = this.createCanvas(parent.ch);
  }
  onClick(mouseData) {
    this.canvas.onClick(mouseData);
  }
  onMove(mouseData) {
    this.canvas.onMove(mouseData);
  }
  tick() {}
  draw() {
    this.canvas.draw();
  }
}

export default BaseVisu;
