import BaseCanvas from './BaseCanvas';

class TailCanvas extends BaseCanvas {
  constructor(...props) {
    super(...props);
    this.settings = {
      colorFill: 'white',
      colorEdge: 'grey',
    };
  }
  drawCircle(x, y, i) {
    const { ctx } = this.getCanvasTools();
    const angle = i * (Math.PI/8);
    const distance = 100 + (i*4);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const radius = 50 + (i/2);

    ctx.beginPath();
    ctx.arc(x + dx, y + dy, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
  }
  draw() {
    const { ctx, mouseData } = this.getCanvasTools();
    const { colorFill, colorEdge } = this.settings;
    ctx.fillStyle = colorFill;
    ctx.strokeStyle = colorEdge;
    ctx.lineWidth = 2;

    for (var i = 10; i < 100; i++){
      this.drawCircle(mouseData.x, mouseData.y, i);
    }
  }
  setSettings(newSettings) {}
}

export default TailCanvas;
