import {
  GradientModifier,
  Settings,
} from './Gradient';

class Vortex {
  constructor(vSettings){
    const {
      coord,
      isHold,
      ringSize,
      growthDelta,
    } = vSettings;
    this.coord = coord;
    this.isHold = isHold;

    this.grad = new GradientModifier();
    this.settings = new Settings();
    this.coreSize = 20;
    this.deathSize = this.coreSize * 4;
    this.minSize = this.deathSize + 1;
    this.ringSize = ringSize;
    this.maxSize = this.ringSize;
    this.growthDelta = growthDelta;
  }

  step(){
    this.grad.step();
  }

  updateRing(mcoord){
    const { coord, minSize } = this;
    var dx = coord.x - mcoord.x;
    var dy = coord.y - mcoord.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > minSize){
      this.ringSize = distance;
      this.maxSize = this.ringSize;
    }
  }

  birth(){
    this.isHold = false;
  }

  getDrawData(){
    const { ringSize, deathSize, maxSize, isHold, coord, coreSize, grad, settings } = this;
    let percentDead = 1 - ((ringSize - deathSize) / (maxSize - deathSize));
    if (isHold){
      percentDead = 0;
    }
    return {
      coord: coord,
      coreSize: coreSize,
      ringSize: Math.floor(ringSize),
      percentDead: percentDead,
      gradientModifier: grad.rainbowSeries(settings)[0],
    };
  }

  eat(){
    this.ringSize -= this.growthDelta / 100;
  }

  isInactive(){
    return this.isHold || this.isDead();
  }

  isDead(){
    const { isHold, ringSize, deathSize } = this;
    return !isHold && ringSize <= deathSize;
  }

  calcGravity(pcoord){
    const { coord, ringSize, coreSize } = this;
    var dx = coord.x - pcoord.x;
    var dy = coord.y - pcoord.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var grav = Math.max(0, ringSize - distance);
    return {
      grav: grav / ringSize,
      inCore: distance <= coreSize,
    };
  }
}

class VortexManager {
  constructor(cvas){
    this.cvas = cvas;
    this.vortexes = [];
    this.settings = {};
  }

  setSettings(newSettings){
    this.settings = newSettings;
  }

  newVortex(coord){
    var v = new Vortex({
      ...this.settings,
      coord: coord,
      isHold: false,
    });
    this.vortexes.push(v);
    return v;
  }

  newHoldVortex(coord){
    var v = new Vortex({
      ...this.settings,
      coord: coord,
      isHold: true,
    });
    this.vortexes.push(v);
    return v;
  }

  drawBackgrounds(){
    const { vortexes, cvas } = this;
    vortexes.forEach(function(v){
      if (!v.isDead()){
        cvas.drawVortexBackground(v);
      }
    });
  }

  drawCores(){
    const { vortexes, cvas } = this;
    vortexes.forEach(function(v){
      if (!v.isDead()){
        cvas.drawVortexCore(v);
      }
    });
  }

  step(){
    const { vortexes } = this;
    vortexes.forEach(function(v){
      if (!v.isDead()){
        v.step();
      }
    });
  }

  getVortexes(){
    return this.vortexes;
  }
}

export default VortexManager;
