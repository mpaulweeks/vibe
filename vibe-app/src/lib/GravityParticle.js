class Particle {
  constructor(pSettings){
    const { cSettings, origin, defaultAngle } = pSettings;
    this.cSettings = cSettings;
    this.origin = origin;
    this.defaultAngle = defaultAngle;

    this.coord = {};
    this.vector = {};
    this.angle = 0;
    this.free = false;
    this.dead = false;
    this.speed = 5 + Math.floor(10 * Math.random());
    this.lineLength = 10 / this.speed;
    this.thickness = 5 + Math.floor(5 * Math.random());
    this.deathBuffer = 100;

    this.reset();
    this.step();
  }

  getLine(){
    const { thickness, coord, lineLength, vector } = this;
    return {
      thickness: thickness,
      head: {
        x: Math.floor(coord.x - (lineLength*vector.dx)),
        y: Math.floor(coord.y - (lineLength*vector.dy)),
      },
      tail: {
        x: Math.floor(coord.x + (lineLength*vector.dx)),
        y: Math.floor(coord.y + (lineLength*vector.dy)),
      },
    };
  }

  distanceFromOrigin(){
    const { origin, coord } = this;
    var dx = origin.x - coord.x;
    var dy = origin.y - coord.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  step(vortexes){
    const { cSettings, coord, angle, defaultAngle, speed, deathBuffer } = this;
    this.dead = this.dead || (
      coord.x < 0 - deathBuffer ||
      coord.y < 0 - deathBuffer ||
      coord.x > cSettings.canvasW + deathBuffer ||
      coord.y > cSettings.canvasH + deathBuffer
    );
    if (this.dead){
      return;
    }

    var angleDelta = null;
    var bestGrav = 0;
    if (this.distanceFromOrigin() > 50) {
      this.free = true;
    }
    if (this.free){
      (vortexes || []).forEach((v) => {
        if (v.isInactive()){
          return;
        }
        var {grav, inCore} = v.calcGravity(coord);
        if (inCore){
          this.dead = true;
          v.eat();
          return;
        }
        if (grav > bestGrav) {
          bestGrav = grav;
          var dx = v.coord.x - coord.x;
          var dy = v.coord.y - coord.y;
          var vortexAngle = Math.atan2(dy, dx);
          var angleDiff = vortexAngle - angle;
          while (angleDiff < 0){ // coerce angleDiff to positive
            angleDiff += 2 * Math.PI;
          }
          while (angleDiff > Math.PI){ // change angleDiff to shortest delta
            angleDiff -= 2 * Math.PI;
          }
          angleDelta = angleDiff * grav;
        }
      });
    }
    if (angleDelta === null){
      this.angle += (1 - 2*Math.random()) / 10;
      this.angle += (defaultAngle - this.angle) / 10;
    } else {
      this.angle += angleDelta;
    }

    this.vector = {
      dx: speed * Math.cos(angle),
      dy: speed * Math.sin(angle),
    };
    coord.x = coord.x + this.vector.dx;
    coord.y = coord.y + this.vector.dy;
  }

  isDead(){
    return this.dead;
  }

  reset(){
    this.coord.x = this.origin.x;
    this.coord.y = this.origin.y;
    this.angle = this.defaultAngle;
    this.free = false;
    this.dead = false;
  }
}

class ParticleManager {
  constructor(cvas){
    this.cvas = cvas;
    this.particles = [];
  }

  newParticle(){
    const { cvas, particles } = this;
    var cSettings = cvas.getCanvasTools();
    var angleStart = 0;
    var angleRange = Math.PI;
    var defaultAngle = angleStart + (angleRange - (2*angleRange*Math.random()));
    var p = new Particle({
      cSettings: cSettings,
      origin: {
        x: cSettings.canvasW/2,
        y: cSettings.canvasH/2,
      },
      defaultAngle: defaultAngle,
    });
    particles.push(p);
    return p;
  }

  draw(){
    const { cvas, particles } = this;
    particles.forEach(function(p){
      if (!p.isDead()){
        cvas.drawParticle(p);
      }
    });
  }

  step(vortexes){
    const { particles } = this;
    particles.forEach(function(p){
      if (p.isDead()){
        p.reset();
      }
      p.step(vortexes);
    });
  }
}

export default ParticleManager;
