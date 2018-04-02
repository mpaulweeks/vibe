class Measurements {
  constructor(settings) {
    this.edge = settings.edge;
    this.dx = this.edge * Math.sin(Math.PI/3);
    this.dy = this.edge * Math.cos(Math.PI/3);
    this.cubeHeight = this.dy * 2 + this.edge;
    this.cubeWidth = this.dx * 2;
  }
}

class MouseTracker {
  constructor() {
    this.settings = {};
    this.lookup = {};
    this.mouseSpeed = 0;
  }
  toKey(x, y) {
    return `${x},${y}`;
  }
  getByGrid(x, y) {
    const key = this.toKey(x, y);
    return this.lookup[key] || 0;
  }
  setByGrid(x, y, value) {
    const key = this.toKey(x, y);
    this.lookup[key] = value;
  }
  setByCoord(measurement, speed, cx, cy) {
    const { cubeHeight, cubeWidth } = measurement;
    const x = Math.floor((cx + (cubeWidth / 2)) / cubeWidth);
    const y1 = Math.floor(cy / (cubeHeight / 2));
    const y2 = Math.floor((cy - (cubeHeight / 2)) / (cubeHeight / 2));
    const { spreadX, spreadY } = this.settings;
    for (var xi = 0 - spreadX; xi <= spreadX; xi++) {
      for (var yi = 0 - spreadY; yi <= spreadY; yi++) {
        const value = (xi === 0 && yi === 0) ? speed : speed * 0.5;
        this.setByGrid(x + xi, y1 + yi, value);
        this.setByGrid(x + xi, y2 + yi, value);
      }
    }
  }
  slowDown(factor) {
    this.mouseSpeed *= factor;
    for (let key in this.lookup) {
      this.lookup[key] *= factor;
    }
  }
  setSettings(newSettings) {
    this.settings = newSettings;
  }
}

export {
  Measurements,
  MouseTracker,
}
