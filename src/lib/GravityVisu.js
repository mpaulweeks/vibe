import BaseVisu from './BaseVisu';
import RainbowCanvas from './RainbowCanvas';

import {
  NewIntegerSetting,
} from './VisuSetting';

import RingManager from './GravityRing';
import ParticleManager from './GravityParticle';
import VortexManager from './GravityVortex';

const defaultSettings = {
  ringSize: 200,
  growthDelta: 10,
};

class GravityVisu extends BaseVisu {
  constructor(...props) {
    super(...props);

    this.rm = new RingManager(this.canvas);
    this.pm = new ParticleManager(this.canvas);
    this.vm = new VortexManager(this.canvas);
    this.mouseHoldVortex = null;

    this.instructions = [
      'click anywhere to create a vortex',
      'click and drag to change the size',
    ];
    this.setCustomSettings(defaultSettings);
    this.settingOptions = [
      NewIntegerSetting('ringSize', 'Default Vortex Size', 40, 800, 20),
      NewIntegerSetting('growthDelta', 'Shrink Speed', 1, 100, 1),
    ];

    for (var i = 0; i < 1000; i++){
      this.pm.newParticle();
    }
  }
  createCanvas(canvasHelper) {
    return new RainbowCanvas(canvasHelper);
  }
  setCustomSettings(newSettings) {
    this.settings = {
      ...this.getCurrentSettings(),
      ...newSettings,
    };
    this.vm.setSettings(this.settings);
  }
  getCurrentSettings() {
    return this.settings || {};
  }
  onMouseClick(mouseData){
    // todo covered by up/down?
    // this.vm.newVortex(mouseData);
  }
  onMouseMove(mouseData){
    super.onMouseMove(mouseData);
    if (this.mouseHoldVortex !== null){
      this.mouseHoldVortex.updateRing(mouseData);
    }
  }
  onMouseDown(mouseData){
    super.onMouseMove(mouseData);
    if (this.mouseHoldVortex === null){
      this.mouseHoldVortex = this.vm.newHoldVortex(mouseData);
    }
  }
  onMouseUp(mouseData){
    super.onMouseMove(mouseData);
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
    if (!this.parent.isMobile && this.mouseHoldVortex === null){
      canvas.drawCursor();
    }
  }
}

export default GravityVisu;
