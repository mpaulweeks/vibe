import BaseCanvas from './BaseCanvas';
import BaseVisu from './BaseVisu';

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
    const x = Math.floor(cx / cubeWidth);
    const y = Math.floor(cy / (cubeHeight / 2));
    const { spreadX, spreadY } = this.settings;
    for (var xi = 0 - spreadX; xi <= spreadX; xi++) {
      for (var yi = 0 - spreadY; yi <= spreadY; yi++) {
        const value = (xi === 0 && yi === 0) ? speed : speed * 0.5;
        this.setByGrid(x + xi, y + yi, value);
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

class CubeCanvas extends BaseCanvas {
  constructor(...props) {
    super(...props);
    this.bgc = 'rgb(38,57,131)';
    this.fgc = 'rgb(252, 253, 117)';
    this.mt = new MouseTracker();
    this.settings = {};
  }
  onClick(mouseData) {
    super.onClick(mouseData)
    const { measure, mt } = this;
    mt.setByCoord(measure, 2, mouseData.x, mouseData.y);
  }
  onMove(mouseData) {
    super.onMove(mouseData)
    const { measure, mt, prevMouseData } = this;
    const distance = Math.sqrt(Math.pow(prevMouseData.x - mouseData.x, 2) + Math.pow(prevMouseData.y - mouseData.y, 2));
    mt.mouseSpeed = Math.min(2, mt.mouseSpeed + distance / 50);
    mt.setByCoord(measure, mt.mouseSpeed, mouseData.x, mouseData.y);
  }
  getDistanceFromMouse(x, y){
    const { currMouse } = this.mt;
    return Math.sqrt(Math.pow(currMouse.x - x, 2) + Math.pow(currMouse.y - y, 2));
  }
  drawHex(xGrid, yGrid) {
    let { edge, dx, dy, cubeWidth, cubeHeight } = this.measure;
    let x = xGrid * cubeWidth;
    let y = yGrid * cubeHeight / 2;

    const cx = x;
    const cy = y + dy + edge/2;
    const speed = this.mt.getByGrid(xGrid, yGrid);
    if (speed > 0){
      const coeff = 1 + speed;
      edge *= coeff;
      dx *= coeff;
      dy *= coeff;
      x = cx; //doesnt change
      y = cy - dy - edge/2;
    }

    const { ctx } = this.getCanvasTools();
    ctx.beginPath();
    let tx = x;
    let ty = y;
    ctx.moveTo(tx, ty);
    tx += dx;
    ty += dy;
    ctx.lineTo(tx, ty);
    ty += edge;
    ctx.lineTo(tx, ty);
    tx -= dx;
    ty += dy;
    ctx.lineTo(tx, ty);
    tx -= dx;
    ty -= dy;
    ctx.lineTo(tx, ty);
    ty -= edge;
    ctx.lineTo(tx, ty);
    tx += dx;
    ty -= dy;
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.fill();

    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + dx, y + dy);
    ctx.stroke();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - dx, y + dy);
    ctx.stroke();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, y + dy*2 + edge);
    ctx.stroke();
  }
  draw() {
    const { ctx, canvasW, canvasH } = this.getCanvasTools();
    const { bgc, fgc } = this;
    ctx.fillStyle = bgc;
    ctx.strokeStyle = fgc;
    ctx.lineWidth = 1;
    ctx.fillRect(0, 0, canvasW, canvasH);

    const { cubeHeight, cubeWidth } = this.measure;
    const cubesY = 1 + (canvasH / (cubeHeight / 2));
    const cubesX = 1 + (canvasW / cubeWidth);
    for (let y = -1; y < cubesY; y += 1) {
      const xOffset = y % 2 === 0 ? 1 : 0;
      for (let x = -1 + xOffset; x <= cubesX; x += 2) {
        this.drawHex(x, y);
      }
    }
  }
  setSettings(newSettings) {
    this.settings = newSettings;
    this.measure = new Measurements(this.settings);
    this.mt.setSettings(this.settings);
  }
}

class CubeVisu extends BaseVisu {
  constructor(props) {
    super(props);
    this.settings = {};
    this.setSettings({
      edge: 40,
      spreadX: 0,
      spreadY: 0,
    });
  }
  setSettings(newSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings,
    };
    this.canvas.setSettings(this.settings);
  }
  createCanvas(canvasHelper) {
    return new CubeCanvas(canvasHelper);
  }
  tick() {
    this.canvas.mt.slowDown(0.9);
  }
}

export default CubeVisu;
