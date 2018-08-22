import BaseCanvas from './BaseCanvas';

class TrailCanvas extends BaseCanvas {
  constructor(...props) {
    super(...props);
    this.settings = {
      colorFill: 'white',
      colorEdge: 'grey',
    };
  }
  drawCircle(ctx, x, y, radius, strokeEdge) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    if (strokeEdge){
      ctx.stroke();
    }
  }
  draw(state) {
    const { ctx, canvasW, canvasH, mouseData } = this.getCanvasTools();
    const { x, y } = mouseData;
    const {
      count,
      distance,
      radius,
      isRainbow,
      colorFill,
      lineWidth,
      colorEdge,
      pattern,
    } = this.settings;
    const {
      rotation,
      gradients,
    } = state;
    const strokeEdge = lineWidth !== 0;

    let rawGradient = null;
    if (pattern === 'ring'){
      rawGradient = ctx.createRadialGradient(x, y, 0, x, y, distance+radius);
    }
    if (pattern === 'spiral' || pattern === 'hypno'){
      rawGradient = ctx.createRadialGradient(x, y, 0, x, y, 2 * Math.max(canvasW, canvasH));
    }

    if (isRainbow) {
      const gm = gradients[0];
      ctx.fillStyle = gm(rawGradient);
    } else {
      ctx.fillStyle = colorFill;
    }
    ctx.strokeStyle = colorEdge;
    ctx.lineWidth = lineWidth;

    // todo r = theta type of spiral
    // increase radius at constant rate without modulo-ing
    // use linear func to translate that to distance

    // todo make i/100 noise a configurable var
    // 0 => wheel spokes

    let itemAngle = null;
    let itemDistance = null;
    for (let i = 0; i < count; i++){
      if (pattern === 'ring') {
        itemAngle = rotation + (i * Math.PI * 2 / count);
        itemDistance = distance;
      }
      if (pattern === 'spiral') {
        itemAngle = rotation + (i * Math.PI / 8) + (i/100);
        itemDistance = distance + (i*4);
      }
      if (pattern === 'hypno') {
        itemAngle = rotation + (Math.sqrt(i) * 2);
        itemDistance = distance + (i*4);
      }
      const dx = Math.cos(itemAngle) * itemDistance;
      const dy = Math.sin(itemAngle) * itemDistance;
      this.drawCircle(ctx, x + dx, y + dy, radius, strokeEdge);
    }
  }
  clear(){
    const { ctx, canvasW, canvasH } = this.getCanvasTools();
    ctx.fillStyle = this.settings.colorBackground;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }
  onKeyPress(event) {
    if (event.code === 'Space'){
      this.clear();
      return true;
    }
    return super.onKeyPress(event);
  }
  setSettings(newSettings) {
    this.settings = newSettings;
  }
}

export default TrailCanvas;
