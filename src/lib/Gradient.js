import ColorAssistant from './Color';

const defaults = {
  numSlices: 1,
  sliceDifference: 0,
  phaseDelta: 2,
  colorFreq: 0.2,
  colorRange: 127,
  colorFloor: 128,
  tiling: 1,
  centered: 0,
};

class Settings {
  constructor(args){
    return {
      ...defaults,
      ...args,
    };
  }
}

const gradientDelta = 8;
const stepFreq = 5; // 5 for circles, 20 for triangles
let counter = 0;

class GradientModifier {
  step(){
    counter = (counter + 1) % 1000000;
  }
  getGradientColors(settings){
    var step = Math.floor(counter / stepFreq) + (settings.sliceDifference * settings.sliceIndex);
    return [
      ColorAssistant.getRainbowColor(step, settings),
      ColorAssistant.getRainbowColor(step + gradientDelta, settings),
    ];
  }
  rainbow(g, settings){
    var colors = this.getGradientColors(settings);
    g.addColorStop(0, colors[0]);
    g.addColorStop(1, colors[1]);
    return g;
  }
  rainbowSeries(settings){
    const self = this;
    function rainbowWrapper(newSettings){
      return function(g){
        return self.rainbow(g, newSettings);
      }
    }

    var grads = [];
    for (var i = 0; i < settings.numSlices; i++){
      var newSettings = Object.assign({}, settings);
      newSettings.sliceIndex = i;
      var gm = rainbowWrapper(newSettings);
      grads.push(gm);
    }
    return grads;
  }
}

export {
  Settings,
  GradientModifier,
}
