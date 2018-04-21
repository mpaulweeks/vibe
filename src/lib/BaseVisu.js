class BaseVisu {
  constructor(parent) {
    this.parent = parent;
    this.canvas = this.createCanvas(parent.ch);
    this.settingOptions = [];
  }

  onSwitch() {
    // when this visu is switched to
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
  onKeyPress(event) {
    return this.canvas.onKeyPress(event);
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
