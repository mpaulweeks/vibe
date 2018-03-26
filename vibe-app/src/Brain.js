import CubeVisu from './CubeVisu';

class CanvasHandler {
  constructor(canvasElm, clickCallback, moveCallback) {
    this.canvas = canvasElm;
    this.getCanvasSettings();
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener('click', evt => {
      clickCallback(evt, this.getMousePos(evt));
    });

    this.canvas.addEventListener('mousemove', evt => {
      moveCallback(evt, this.getMousePos(evt));
    });
    this.canvas.addEventListener('touchmove', touchEvt => {
      touchEvt.preventDefault();
      const evt = touchEvt.touches[0];
      moveCallback(evt, this.getMousePos(evt));
    }, false);
  }
  getCanvasSettings() {
    const { canvas } = this;
    var canvasW = document.body.clientWidth; //document.width is obsolete
    var canvasH = document.body.clientHeight; //document.height is obsolete
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
  getMousePos(evt) {
    const { canvas } = this;
    // https://stackoverflow.com/a/17130415/6461842
    var rect = canvas.getBoundingClientRect();
    var {canvasW, canvasH} = this.getCanvasSettings();
    return {
      x: Math.min(canvasW - 1 , evt.clientX - rect.left),
      y: Math.min(canvasH - 1, evt.clientY - rect.top),
    };
  }
  getDrawMaterials() {
    const { ctx } = this;
    const { canvasW, canvasH } = this.getCanvasSettings();
    return {
      ctx,
      canvasW,
      canvasH,
    };
  }
}

class Brain {
  constructor(canvasElm) {
    this.saveCanvas(canvasElm);
    this.visuApp = new CubeVisu();

    this.loop();
  }
  loop() {
    this.visuApp.tick(this);
    setTimeout(() => this.loop(), 1000/30);
  }
  onCanvasClick(evt, currMouse) {
    this.visuApp.onClick(this, evt, currMouse);
  }
  onCanvasMove(evt, currMouse) {
    this.visuApp.onMove(this, evt, currMouse);
  }
  saveCanvas(canvasElm) {
    this.ch = new CanvasHandler(
      canvasElm,
      (evt, cm) => this.onCanvasClick(evt, cm),
      (evt, cm) => this.onCanvasMove(evt, cm)
    )
  }
}

export default Brain;
