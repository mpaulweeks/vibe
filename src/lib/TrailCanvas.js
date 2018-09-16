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
  lawOfCosines(adj1, adj2, far){
    adj1 = adj1 || 1;
    adj2 = adj2 || 1;
    let cosine = (
      (Math.pow(adj1, 2) + Math.pow(adj2, 2) - Math.pow(far, 2)) /
      (2 * adj1 * adj2)
    );
    while (cosine < -1){
      // todo make better?
      cosine += 2;
    }
    return Math.acos(cosine);
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

    let lastAngle = rotation;
    for (let i = 0; i < count; i++){
      let itemAngle = 0;
      let itemDistance = 0;

      if (pattern === 'ring') {
        itemAngle = rotation + (i * Math.PI * 2 / count);
        itemDistance = distance;
      }
      if (pattern === 'spiral') {
        itemAngle = rotation + (i * Math.PI / 8) + (i/100);
        itemDistance = distance + (i * 4);
      }
      if (pattern === 'hypno') {
        // naive solution
        // itemAngle = rotation + (Math.sqrt(i) * 2);
        // itemDistance = distance + (i*4);

        // todo config these
        const distanceMultiplier = radius/8;
        const distanceBetweenPairs = radius * 2;
        itemDistance = distance + (i * distanceMultiplier);
        const nextDistance = distance + ((i+1) * distanceMultiplier);
        const newSliceAngle = this.lawOfCosines(itemDistance, nextDistance, distanceBetweenPairs);
        itemAngle = lastAngle + newSliceAngle;
        lastAngle = itemAngle;
      }
      if (pattern === 'hypno-tight') {
        // prototype
        const distanceMultiplier = radius;
        const distanceBetweenPairs = radius * 2;
        itemDistance = distance + radius + (Math.sqrt(i+1) * distanceMultiplier);
        const nextDistance = distance + radius + (Math.sqrt(i+2) * distanceMultiplier);
        const newSliceAngle = this.lawOfCosines(itemDistance, nextDistance, distanceBetweenPairs);
        itemAngle = lastAngle + newSliceAngle;
        lastAngle = itemAngle;
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
