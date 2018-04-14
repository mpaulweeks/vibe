import BaseCanvas from './BaseCanvas';

class TailCanvas extends BaseCanvas {
  constructor(...props) {
    super(...props);
    this.settings = {
      colorFill: 'white',
      colorEdge: 'grey',
    };
  }
  drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
  }
  drawSpiral(x, y, i) {
    const { ctx } = this.getCanvasTools();
    const angle = i * (Math.PI/8);
    const distance = 100 + (i*4);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const radius = 50 + (i/2);
    this.drawCircle(ctx, x + dx, y + dy, radius);
  }
  drawCluster(mSettings) {
    const { ctx, mouseData } = this.getCanvasTools();
    const { x, y } = mouseData;
    const { count, rotation, distance, radius } = mSettings;
    for (let i = 0; i < count; i++){
      const angle = rotation + (i * Math.PI * 2 / count);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      this.drawCircle(ctx, x + dx, y + dy, radius);
    }
  }
  draw(mSettings) {
    const { ctx } = this.getCanvasTools();
    const { colorFill, colorEdge } = mSettings;
    ctx.fillStyle = colorFill;
    ctx.strokeStyle = colorEdge;
    ctx.lineWidth = 2;
    this.drawCluster(mSettings);
  }
  setSettings(newSettings) {}
}

export default TailCanvas;
