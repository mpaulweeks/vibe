class BaseVisu {
  constructor(parent) {
    this.parent = parent;
    this.canvas = this.createCanvas(parent.ch);
    this.settingOptions = [];
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
  getCurrentSettings() {
    return {};
  }
  setCustomSettings() {}
}

export default BaseVisu;
