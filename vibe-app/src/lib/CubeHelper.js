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
    if (!this.lookup[key] || this.lookup[key] < value){
      this.lookup[key] = value;
    }
  }
  setByCoord(measurement, speed, cx, cy) {
    const { cubeHeight, cubeWidth } = measurement;
    const x = Math.floor((cx + (cubeWidth / 2)) / cubeWidth);
    let y = Math.floor(cy / cubeHeight) * 2;
    if (x % 2 !== 0) {
      y = (Math.floor((cy - (cubeHeight / 2)) / cubeHeight) * 2) + 1;
    }
    const { spreadX, spreadY } = this.settings;
    for (var xi = 0 - spreadX; xi <= spreadX; xi++) {
      for (var yi = 0 - spreadY; yi <= spreadY; yi++) {
        const ratioX = 1 - Math.abs(xi / (spreadX + 1));
        const ratioY = 1 - Math.abs(yi / (spreadY + 1));
        const ratio = Math.min(ratioX, ratioY);
        const value = speed * ratio;
        this.setByGrid(x + xi, y + yi, value);
      }
    }
  }
  slowDown(factor) {
    const deleteThreshold = 1 / (this.settings.edge * 2);

    this.mouseSpeed *= factor;

    const toDel = [];
    for (let key in this.lookup) {
      this.lookup[key] *= factor;
      if (this.lookup[key] < deleteThreshold) {
        toDel.push(key);
      }
    }
    toDel.forEach(key => {
      delete this.lookup[key];
    });
  }
  setSettings(newSettings) {
    this.settings = newSettings;
  }
}

export {
  Measurements,
  MouseTracker,
}
