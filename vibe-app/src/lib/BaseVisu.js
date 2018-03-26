class BaseVisu {
  constructor(parent) {
    this.parent = parent;
  }
  onClick(mouseData) {}
  onMove(mouseData) {}
  tick(canvasHelper) {}
}

export default BaseVisu;
