
const Colors = {
  Blue: 'rgb(38,57,131)',
  Yellow: 'rgb(252,253,117)',
  Black: '#252502',
}
const defaultSettings = {
  edge: 30,
  shrinkRate: 90,
  spreadX: 1,
  spreadY: 1,
  countDummyMice: 0,
  colorFace: Colors.Blue,
  colorEdge: Colors.Yellow,
  focusFace: Colors.Blue,
  focusEdge: Colors.Yellow,
};

const presets = [
  {},
  {
    edge: 30,
    shrinkRate: 99,
    spreadX: 0,
    spreadY: 0,
    countDummyMice: 1,
    colorFace: '#CCCCCC',
    colorEdge: '#CCCCCC',
    focusFace: '#CCCCCC',
    focusEdge: '#999999',
  },
  {
    edge: 30,
    spreadX: 1,
    spreadY: 1,
    countDummyMice: 3,
    colorFace: Colors.Blue,
    colorEdge: Colors.Blue,
    focusFace: Colors.Black,
    focusEdge: Colors.Blue,
  },
]

class PatternManager {
  constructor(){
    this.index = 0;
    this.presets = presets.map(s => (
      {
        ...defaultSettings,
        ...s,
      }
    ));
    this.customSettings = null;
  }
  get() {
    const { presets, index, customSettings } = this;
    if (customSettings){
      return customSettings;
    }
    return presets[index];
  }
  next() {
    const { presets, index, customSettings } = this;
    if (customSettings){
      this.customSettings = null;
    } else {
      this.index = (presets.length + index + 1) % presets.length;
    }
  }
  newCustom(settings){
    this.customSettings = settings;
  }
}

export default PatternManager;
