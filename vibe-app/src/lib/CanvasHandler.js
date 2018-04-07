class CanvasHandler {
  constructor(canvasElm, otherClickables, clickCallback, moveCallback) {
    this.canvas = canvasElm;
    this.ensureCanvasDimensions();
    this.ctx = this.canvas.getContext('2d');

    const self = this;
    const clickables = [this.canvas].concat(otherClickables);
    console.log(clickables);
    clickables.forEach(c => {
      c.addEventListener('click', evt => {
        clickCallback(self.getMouseData(evt));
      });
      c.addEventListener('mousemove', evt => {
        moveCallback(self.getMouseData(evt));
      });
      c.addEventListener('touchmove', touchEvt => {
        touchEvt.preventDefault();
        const evt = touchEvt.touches[0];
        moveCallback(self.getMouseData(evt));
      }, false);
    })
  }
  ensureCanvasDimensions() {
    const { canvas } = this;
    const canvasW = document.body.clientWidth; //document.width is obsolete
    const canvasH = document.body.clientHeight; //document.height is obsolete
    // only set on change, setting clears the canvas and introduces jaggies
    if (canvasW !== canvas.width)
      canvas.width = canvasW;
    if (canvasH !== canvas.height)
      canvas.height = canvasH;
    return {
      canvasW: canvasW,
      canvasH: canvasH,
    }
  }
  getMouseData(evt) {
    const { canvas } = this;
    // https://stackoverflow.com/a/17130415/6461842
    const rect = canvas.getBoundingClientRect();
    const { canvasW, canvasH } = this.ensureCanvasDimensions();
    return {
      evt: evt,
      x: Math.min(canvasW - 1 , evt.clientX - rect.left),
      y: Math.min(canvasH - 1, evt.clientY - rect.top),
    };
  }
  getCanvasTools() {
    const { ctx } = this;
    const { canvasW, canvasH } = this.ensureCanvasDimensions();
    return {
      ctx,
      canvasW,
      canvasH,
    };
  }
  goFullScreen(){
    const { canvas } = this;
    // https://stackoverflow.com/a/16124664/6461842
    if(canvas.requestFullScreen)
      canvas.requestFullScreen();
    else if(canvas.webkitRequestFullScreen)
      canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
      canvas.mozRequestFullScreen();
  }
  drawStats(stats){
    const { ctx } = this;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,160, 16 + 10*stats.length);
    ctx.fillStyle = "white";
    for (var i = 0; i < stats.length; i++){
      ctx.fillText(stats[i][1], 10, 16 + 10*i);
      ctx.fillText(stats[i][0], 60, 16 + 10*i);
    }
  }
}

export default CanvasHandler;
