class BaseVisu {
  constructor(parent) {
    this.parent = parent;
    this.canvas = this.createCanvas(parent.ch);
    this.settingOptions = [];
  }

  onMouseClick(mouseData) {
    this.canvas.onMouseClick(mouseData);
  }
  onMouseMove(mouseData) {
    this.canvas.onMouseMove(mouseData);
  }
  onMouseDown(mouseData) {
    this.canvas.onMouseDown(mouseData);
  }
  onMouseUp(mouseData) {
    this.canvas.onMouseUp(mouseData);
  }

  tick() {}
  draw() {
    this.canvas.draw();
  }
  getCurrentSettings() {
    return {};
  }
  setCustomSettings() {}
}

export default BaseVisu;