import BaseCanvas from './BaseCanvas';
import {
  Measurements,
  MouseTracker,
} from './CubeHelper';

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

export default CubeCanvas;
