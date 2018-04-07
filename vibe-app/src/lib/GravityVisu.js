import BaseVisu from './BaseVisu';
import RainbowCanvas from './RainbowCanvas';

import RingManager from './GravityRing';
import ParticleManager from './GravityParticle';
import VortexManager from './GravityVortex';

class GravityVisu extends BaseVisu {
  constructor(...props) {
    super(...props);
    this.instructions = [
      'tbd',
    ]
    this.setCustomSettings({});
    this.settingOptions = [];

    this.rm = new RingManager(this.canvas);
    this.pm = new ParticleManager(this.canvas);
    this.vm = new VortexManager(this.canvas);

    for (var i = 0; i < 1000; i++){
      this.pm.newParticle();
    }
  }
  createCanvas(canvasHelper) {
    return new RainbowCanvas(canvasHelper);
  }
  onClick(){
    var coord = this.canvas.getCanvasTools().mouseData;
    this.vm.newVortex(coord);
  }
  tick(){
    const { rm, pm, vm } = this;
    rm.step();
    pm.step(vm.getVortexes());
    vm.step();
  }
  draw(){
    const { canvas, rm, pm, vm } = this;
    canvas.clear('black');
    vm.drawBackgrounds();
    rm.draw();
    pm.draw();
    vm.drawCores();
  }
}

export default GravityVisu;

/* tbd
  var mouseHoldVortex = null;
  function mouseDown(e){
    if (mouseHoldVortex === null){
      var coord = cvas.getMousePos(e);
      mouseHoldVortex = vm.newHoldVortex(coord);
    }
  }
  function mouseUp(e){
    if (mouseHoldVortex !== null){
      mouseHoldVortex.birth();
      mouseHoldVortex = null;
    }
  }
  function mouseMove(e){
    if (mouseHoldVortex !== null){
      var coord = cvas.getMousePos(e);
      mouseHoldVortex.updateRing(coord);
    }
  }
  function mobileMouse(func){
    return function(e){
      e.preventDefault();
      return func(e.touches[0]);
    }
  }
*/
