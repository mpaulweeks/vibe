
class Measurements {
  constructor(edge) {
    this.edge = edge;
    this.dx = this.edge * Math.sin(Math.PI/3);
    this.dy = this.edge * Math.cos(Math.PI/3);
    this.cubeHeight = this.dy * 2 + this.edge;
    this.cubeWidth = this.dx * 2;
  }
}

class MouseTracker {
  constructor() {
    this.lookup = {};
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
    for (var xi = -1; xi <= 1; xi++) {
      for (var yi = -1; yi <= 1; yi++) { // todo maybe +/- 2
        const value = (xi === 0 && yi === 0) ? speed : speed * 0.5;
        this.setByGrid(x + xi, y + yi, value);
      }
    }
  }
  slowDown(factor) {
    for (let key in this.lookup) {
      this.lookup[key] *= factor;
    }
  }
}

class CubeVisu {
  constructor() {
    this.m = new Measurements(20);
    this.bgc = 'rgb(38,57,131)';
    this.fgc = 'rgb(252, 253, 117)';

    this.mt = new MouseTracker();
    this.currMouse = {
      x: 100,
      y: 100,
    };
    this.mouseSpeed = 0;
    this.mouseHits = {};
  }
  onMove(parent, evt, mouseLocation) {
    const oldMouse = this.currMouse;
    this.currMouse = mouseLocation;
    const distance = Math.sqrt(Math.pow(oldMouse.x - this.currMouse.x, 2) + Math.pow(oldMouse.y - this.currMouse.y, 2));
    this.mouseSpeed = Math.min(2, this.mouseSpeed + distance / 50);
    this.mt.setByCoord(this.m, this.mouseSpeed, this.currMouse.x, this.currMouse.y);
  }
  tick(parent) {
    const factor = 0.95;
    this.mouseSpeed *= factor;
    this.mt.slowDown(factor);
    this.draw(parent.ch.getDrawMaterials());
  }

  getDistanceFromMouse(x, y){
    const { currMouse } = this;
    return Math.sqrt(Math.pow(currMouse.x - x, 2) + Math.pow(currMouse.y - y, 2));
  }
  drawHex(drawMaterials, xGrid, yGrid) {
    let { edge, dx, dy, cubeWidth, cubeHeight } = this.m;
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

    const { ctx } = drawMaterials;
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
  draw(drawMaterials) {
    const { ctx, canvasW, canvasH } = drawMaterials;
    const { bgc, fgc } = this;
    ctx.fillStyle = bgc;
    ctx.strokeStyle = fgc;
    ctx.lineWidth = 1;
    ctx.fillRect(0, 0, canvasW, canvasH);

    const { cubeHeight, cubeWidth } = this.m;
    const cubesY = 1 + (canvasH / (cubeHeight / 2));
    const cubesX = 1 + (canvasW / cubeWidth);
    for (let y = -1; y < cubesY; y += 1) {
      const xOffset = y % 2 === 0 ? 1 : 0;
      for (let x = -1 + xOffset; x <= cubesX; x += 2) {
        this.drawHex(drawMaterials, x, y);
      }
    }
  }
}

export default CubeVisu;
