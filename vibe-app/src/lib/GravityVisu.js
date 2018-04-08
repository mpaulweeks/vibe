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
    this.mouseHoldVortex = null;

    for (var i = 0; i < 1000; i++){
      this.pm.newParticle();
    }
  }
  createCanvas(canvasHelper) {
    return new RainbowCanvas(canvasHelper);
  }
  onMouseClick(mouseData){
    // todo covered by up/down?
    // this.vm.newVortex(mouseData);
  }
  onMouseMove(mouseData){
    if (this.mouseHoldVortex !== null){
      this.mouseHoldVortex.updateRing(mouseData);
    }
  }
  onMouseDown(mouseData){
    if (this.mouseHoldVortex === null){
      this.mouseHoldVortex = this.vm.newHoldVortex(mouseData);
    }
  }
  onMouseUp(mouseData){
    if (this.mouseHoldVortex !== null){
      this.mouseHoldVortex.birth();
      this.mouseHoldVortex = null;
    }
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
