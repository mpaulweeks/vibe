import BaseCanvas from './BaseCanvas';

class RainbowCanvas extends BaseCanvas {
  // draw funcs

  drawCircle(gms, settings){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var origin = mouseData;
    if (settings.centered){
      origin = {
        x: Math.floor(canvasW/2),
        y: Math.floor(canvasH/2),
      }
    }
    var maxLength = Math.max(canvasW, canvasH);
    var gradient = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, maxLength);
    gms[0](gradient, settings);
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvasW,canvasH);
  }

  getDrawFunc() {
    return (gms, settings) => this.drawTilingSpikes(gms, settings);
  }

  drawTilingSpikes(gms, settings){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var xChunk = Math.ceil(canvasW / settings.tiling);
    var yChunk = Math.ceil(canvasH / settings.tiling);
    for (var x = 0; x < settings.tiling; x++){
      settings.minX = x * xChunk;
      settings.maxX = (x + 1) * xChunk;
      for (var y = 0; y < settings.tiling; y++){
        settings.minY = y * yChunk;
        settings.maxY = (y + 1) * yChunk;
        if (settings.centered){
          settings.origin = {
            x: Math.floor((settings.maxX - settings.minX)/2 + settings.minX),
            y: Math.floor((settings.maxY - settings.minY)/2 + settings.minY),
          };
        } else {
          settings.origin = {
            x: mouseData.x % xChunk + settings.minX,
            y: mouseData.y % yChunk + settings.minY,
          }
        }
        this.drawGenericSpikes(gms, settings);
      }
    }
  }

  drawHero(hero){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var center = {
      x: Math.floor(canvasW/2),
      y: Math.floor(canvasH/2),
    }
    var origin = hero.calcOrigin(center);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 10, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  drawGenericSpikes(gms, settings){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var {
      origin,
      minX, maxX, minY, maxY,
      groupWidth,
    } = settings;
    var numGradients = gms.length;
    var cWidth = maxX - minX;
    var cHeight = maxY - minY;
    var maxLength = Math.max(cWidth, cHeight);
    var xSpikes = Math.max(1, Math.floor(cWidth / groupWidth));
    var ySpikes = Math.max(1, Math.floor(cHeight / groupWidth));
    var xChunk = Math.ceil(cWidth / (numGradients*xSpikes));
    var yChunk = Math.ceil(cHeight / (numGradients*ySpikes));
    gms.forEach(function (gradientModifier, gio){
      var grad = gradientModifier(ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, maxLength));
      ctx.fillStyle = grad;
      for (var si = 0; si < ySpikes; si++){
        var gi = gio;
        ctx.beginPath();
        ctx.moveTo(minX, minY + ((gi + 0) * yChunk) + (si * yChunk * numGradients));
        ctx.lineTo(origin.x, origin.y);
        ctx.lineTo(minX, minY + ((gi + 1) * yChunk) + (si * yChunk * numGradients));
        ctx.closePath();
        ctx.fill();

        gi = numGradients - (1 + gi);
        ctx.beginPath();
        ctx.moveTo(maxX, minY + ((gi + 0) * yChunk) + (si * yChunk * numGradients));
        ctx.lineTo(origin.x, origin.y);
        ctx.lineTo(maxX, minY + ((gi + 1) * yChunk) + (si * yChunk * numGradients));
        ctx.closePath();
        ctx.fill();
      }
      for (var si = 0; si < xSpikes; si++){
        var gi = gio;
        ctx.beginPath();
        ctx.moveTo(minX + ((gi + 0) * xChunk) + (si * xChunk * numGradients), maxY);
        ctx.lineTo(origin.x, origin.y);
        ctx.lineTo(minX + ((gi + 1) * xChunk) + (si * xChunk * numGradients), maxY);
        ctx.closePath();
        ctx.fill();

        gi = numGradients - (1 + gi);
        ctx.beginPath();
        ctx.moveTo(minX + ((gi + 0) * xChunk) + (si * xChunk * numGradients), minY);
        ctx.lineTo(origin.x, origin.y);
        ctx.lineTo(minX + ((gi + 1) * xChunk) + (si * xChunk * numGradients), minY);
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  drawSpikesPattern(gms, settings){
    // wip, seems to have degrading performance, maybe fixed if re-using pattern canvas?
    // https://stackoverflow.com/a/5533583
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var xChunk = Math.ceil(canvasW / settings.tiling);
    var yChunk = Math.ceil(canvasH / settings.tiling);
    settings.minX = 0;
    settings.maxX = xChunk;
    settings.minY = 0;
    settings.maxY = yChunk;
    if (settings.centered){
      settings.origin = {
        x: Math.floor((settings.maxX - settings.minX)/2 + settings.minX),
        y: Math.floor((settings.maxY - settings.minY)/2 + settings.minY),
      };
    } else {
      settings.origin = {
        x: mouseData.x % xChunk + settings.minX,
        y: mouseData.y % yChunk + settings.minY,
      }
    }
    var pattern = document.createElement('canvas');
    this.createPattern(pattern, gms, settings);
    ctx.rect(0, 0, canvasW, canvasH);
    ctx.fillStyle = ctx.createPattern(pattern, "repeat");
    ctx.fill();
    pattern.remove();
  }

  createPattern(pattern, gms, settings){
    var {
      origin,
      minX, maxX, minY, maxY,
      groupWidth,
    } = settings;
    var numGradients = gms.length;
    var cWidth = maxX - minX;
    var cHeight = maxY - minY;

    pattern.width = cWidth;
    pattern.height = cHeight;
    var pctx = pattern.getContext('2d');

    var maxLength = Math.max(cWidth, cHeight);
    var xSpikes = Math.max(1, Math.floor(cWidth / groupWidth));
    var ySpikes = Math.max(1, Math.floor(cHeight / groupWidth));
    var xChunk = Math.ceil(cWidth / (numGradients*xSpikes));
    var yChunk = Math.ceil(cHeight / (numGradients*ySpikes));
    gms.forEach(function (gradientModifier, gio){
      var grad = gradientModifier(pctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, maxLength));
      pctx.fillStyle = grad;
      for (var si = 0; si < ySpikes; si++){
        var gi = gio;
        pctx.beginPath();
        pctx.moveTo(minX, minY + ((gi + 0) * yChunk) + (si * yChunk * numGradients));
        pctx.lineTo(origin.x, origin.y);
        pctx.lineTo(minX, minY + ((gi + 1) * yChunk) + (si * yChunk * numGradients));
        pctx.closePath();
        pctx.fill();

        gi = numGradients - (1 + gi);
        pctx.beginPath();
        pctx.moveTo(maxX, minY + ((gi + 0) * yChunk) + (si * yChunk * numGradients));
        pctx.lineTo(origin.x, origin.y);
        pctx.lineTo(maxX, minY + ((gi + 1) * yChunk) + (si * yChunk * numGradients));
        pctx.closePath();
        pctx.fill();
      }
      for (var si = 0; si < xSpikes; si++){
        var gi = gio;
        pctx.beginPath();
        pctx.moveTo(minX + ((gi + 0) * xChunk) + (si * xChunk * numGradients), maxY);
        pctx.lineTo(origin.x, origin.y);
        pctx.lineTo(minX + ((gi + 1) * xChunk) + (si * xChunk * numGradients), maxY);
        pctx.closePath();
        pctx.fill();

        gi = numGradients - (1 + gi);
        pctx.beginPath();
        pctx.moveTo(minX + ((gi + 0) * xChunk) + (si * xChunk * numGradients), minY);
        pctx.lineTo(origin.x, origin.y);
        pctx.lineTo(minX + ((gi + 1) * xChunk) + (si * xChunk * numGradients), minY);
        pctx.closePath();
        pctx.fill();
      }
    });
  }

  drawRing(ring){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var gradient = ctx.createRadialGradient(
      ring.origin.x, ring.origin.y, ring.getInner(),
      ring.origin.x, ring.origin.y, ring.getOuter()
    );
    ring.gradientModifier()(gradient);

    ctx.beginPath();
    ctx.arc(ring.origin.x, ring.origin.y, ring.getInner(), 0, 2*Math.PI);
    ctx.lineWidth = ring.width;
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }

  drawParticle(ptcle){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var line = ptcle.getLine();
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(line.head.x, line.head.y);
    ctx.lineTo(line.tail.x, line.tail.y);
    ctx.lineWidth = line.thickness;
    ctx.stroke();
  }

  drawVortexBackground(vortex){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var {
      coord,
      coreSize,
      ringSize,
      percentDead,
      gradientModifier,
    } = vortex.getDrawData();

    ctx.beginPath();
    ctx.arc(coord.x, coord.y, ringSize, 0, 2*Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    var percentWhite = Math.floor(255*Math.pow(percentDead, 4));
    var colorStr = `rgba(${percentWhite},${percentWhite},${percentWhite},1)`;
    ctx.fillStyle = colorStr;
    ctx.fill();
  }

  drawVortexCore(vortex){
    const { mouseData, ctx, canvasW, canvasH } = this.getCanvasTools();
    var {
      coord,
      coreSize,
      ringSize,
      percentDead,
      gradientModifier,
    } = vortex.getDrawData();

    var gradient = ctx.createRadialGradient(
      coord.x, coord.y, 0,
      coord.x, coord.y, coreSize
    );
    gradientModifier(gradient);
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, coreSize, 0, 2*Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

export default RainbowCanvas;
