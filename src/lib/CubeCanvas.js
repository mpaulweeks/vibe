import BaseCanvas from './BaseCanvas';
import {
  Measurements,
  MouseTracker,
} from './CubeHelper';

class CubeCanvas extends BaseCanvas {
  constructor(...props) {
    super(...props);
    this.mt = new MouseTracker();
    this.settings = {};
  }
  onMouseClick(mouseData) {
    super.onMouseClick(mouseData)
    const { measure, mt } = this;
    mt.mouseSpeed = 2;
    mt.lastKey = mt.setByCoord(measure, mt.mouseSpeed, mouseData.x, mouseData.y, mt.lastKey);
  }
  onMouseMove(mouseData) {
    super.onMouseMove(mouseData)
    const { measure, mt, prevMouseData } = this;
    const distance = Math.sqrt(Math.pow(prevMouseData.x - mouseData.x, 2) + Math.pow(prevMouseData.y - mouseData.y, 2));
    mt.mouseSpeed = Math.min(1.5, mt.mouseSpeed + (distance / 100));
    mt.lastKey = mt.setByCoord(measure, mt.mouseSpeed, mouseData.x, mouseData.y, mt.lastKey);
  }
  dummyMouse(dm) {
    const { measure, mt } = this;
    dm.lastKey = mt.setByCoord(measure, dm.size, dm.x, dm.y, dm.lastKey);
  }
  getDistanceFromMouse(x, y){
    const { currMouse } = this.mt;
    return Math.sqrt(Math.pow(currMouse.x - x, 2) + Math.pow(currMouse.y - y, 2));
  }
  drawHex(xGrid, yGrid, modifiedGradient) {
    const { ctx } = this.getCanvasTools();
    const {
      colorFaceRainbow,
      colorFace,
      colorEdge,
      focusFaceRainbow,
      focusFace,
      focusEdge,
    } = this.settings;
    let { edge, dx, dy, cubeWidth, cubeHeight } = this.measure;
    let x = xGrid * cubeWidth;
    let y = yGrid * cubeHeight / 2;

    const cx = x;
    const cy = y + dy + edge/2;
    const size = this.mt.getByGrid(xGrid, yGrid).size;
    if (size > 0){
      const coeff = 1 + size;
      edge *= coeff;
      dx *= coeff;
      dy *= coeff;
      x = cx; //doesnt change
      y = cy - dy - edge/2;

      ctx.strokeStyle = focusEdge;
      ctx.fillStyle = focusFace;
      if (focusFaceRainbow){
        ctx.fillStyle = modifiedGradient;
      }
    } else {
      ctx.strokeStyle = colorEdge;
      ctx.fillStyle = colorFace;
      if (colorFaceRainbow){
        ctx.fillStyle = modifiedGradient;
      }
    }

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

    // debugging
    // ctx.strokeText(`${ xGrid },${ yGrid }`, cx-5, cy-5);
  }
  draw(grad) {
    const { ctx, canvasW, canvasH } = this.getCanvasTools();
    const { colorFaceRainbow, colorFace } = this.settings;

    ctx.fillStyle = colorFace;
    const gm = grad.rainbowSeries(this.settings)[0];
    const rawGradient = ctx.createLinearGradient(0, 0, canvasW, 0);
    const modifiedGradient = gm(rawGradient);
    if (colorFaceRainbow){
      ctx.fillStyle = modifiedGradient;
    }
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.lineWidth = 1;

    const { cubeHeight, cubeWidth } = this.measure;
    const cubesY = 1 + (canvasH / (cubeHeight / 2));
    const cubesX = 1 + (canvasW / cubeWidth);
    for (let y = -1; y < cubesY; y += 1) {
      const xOffset = y % 2 === 0 ? 1 : 0;
      for (let x = -1 + xOffset; x <= cubesX; x += 2) {
        this.drawHex(x, y, modifiedGradient);
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
