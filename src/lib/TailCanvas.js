import BaseCanvas from './BaseCanvas';

class TailCanvas extends BaseCanvas {
  constructor(...props) {
    super(...props);
    this.settings = {
      colorFill: 'white',
      colorEdge: 'grey',
    };
  }
  drawCircle(ctx, x, y, radius, noStroke) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    if (!noStroke){
      ctx.stroke();
    }
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
    const { isRainbow, colorFill, colorEdge, gradients } = mSettings;
    if (isRainbow) {
      const gm = gradients[0];
      const rawGradient = ctx.createRadialGradient(x, y, 0, x, y, distance+radius);
      ctx.fillStyle = gm(rawGradient);
      ctx.strokeStyle = null;
      ctx.lineWidth = 0;
    } else {
      ctx.fillStyle = colorFill;
      ctx.strokeStyle = colorEdge;
      ctx.lineWidth = 2;
    }
    for (let i = 0; i < count; i++){
      const angle = rotation + (i * Math.PI * 2 / count);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      this.drawCircle(ctx, x + dx, y + dy, radius, isRainbow);
    }
  }
  draw(mSettings) {
    this.drawCluster(mSettings);
  }
  setSettings(newSettings) {}
}

export default TailCanvas;
