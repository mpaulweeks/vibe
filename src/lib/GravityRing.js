import {
  GradientModifier,
  Settings,
} from './Gradient';

class Ring {
  constructor(coord, maxRadius, grad){
    this.origin = coord;
    this.maxRadius = maxRadius;
    this.grad = grad;
    this.radius = 50;
    this.width = 50;
    this.gSettings = new Settings();
  }

  gradientModifier(){
    const { grad, gSettings } = this;
    return grad.rainbowSeries(gSettings)[0];
  }

  getOuter(){
    return this.radius;
  }

  getInner(){
    return this.getOuter() - this.width;
  }

  step(){
    this.radius += 5;
    return this.radius >= this.maxRadius;
  }

  isDead(){
    return this.radius >= this.maxRadius;
  }
}

class RingManager {
  constructor(cvas){
    this.cvas = cvas;
    this.rings = [];
    this.grad = new GradientModifier();
  }

  newRing(coord, maxRadius){
    const { grad } = this;
    var r = new Ring(coord, maxRadius, grad);
    this.rings.push(r);
    return r;
  }

  draw(){
    const { cvas, rings } = this;
    rings.forEach(function(ring){
      cvas.drawRing(ring);
    });
  }

  step(){
    const { grad, rings } = this;

    grad.step();

    var shouldCheck = false;
    rings.forEach(function(ring){
      shouldCheck = shouldCheck || ring.step();
    });
    if (shouldCheck){
      var newRings = [];
      rings.forEach(function(ring){
        if (!ring.isDead()){
          newRings.push(ring);
        }
      });
      this.rings = newRings;
    }
  }
}

export default RingManager;
