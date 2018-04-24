import { Settings, GradientModifier } from './Gradient';

class Pattern {
  constructor(canvasFunc, s){
    this.canvasFunc = canvasFunc;
    this.grad = new GradientModifier();
    this.settings = new Settings(s);
  }
  draw(){
    const { grad, canvasFunc, settings } = this;
    return canvasFunc(grad.rainbowSeries(settings), settings);
  }
  step(){
    const { grad } = this;
    return grad.step();
  }
  getSettings(){
    const { settings } = this;
    return settings;
  }
}

class RainbowPatterns {
  constructor(cvas){
    this.cvas = cvas;
    this.drawFunc = cvas.getDrawFunc();
    this.patterns = [
      new Pattern(this.drawFunc, {numSlices: 3, sliceDifference: 5, groupWidth: 150}),
      new Pattern(this.drawFunc, {numSlices: 1, sliceDifference: 0, groupWidth: 950}),
      new Pattern(this.drawFunc, {numSlices: 4, sliceDifference: 2, groupWidth: 150}),
      new Pattern(this.drawFunc, {numSlices: 32, sliceDifference: 1, groupWidth: 500}),
      new Pattern(this.drawFunc, {numSlices: 16, sliceDifference: 8, groupWidth: 500}),
      new Pattern(this.drawFunc, {numSlices: 32, sliceDifference: 16, groupWidth: 500}),
      new Pattern(this.drawFunc, {numSlices: 16, sliceDifference: 1, groupWidth: 950}),
      new Pattern(this.drawFunc, {numSlices: 9, sliceDifference: 4, groupWidth: 500}),
      new Pattern(this.drawFunc, {numSlices: 9, sliceDifference: 4, groupWidth: 150, tiling: 2, centered: 1}),
      new Pattern(this.drawFunc, {numSlices: 3, sliceDifference: 5, groupWidth: 150, tiling: 3}),
      new Pattern(this.drawFunc, {numSlices: 32, sliceDifference: 16, groupWidth: 500, tiling: 3, centered: 1}),
      new Pattern(this.drawFunc, {numSlices: 3, sliceDifference: 5, groupWidth: 150, phaseDelta: 0, colorRange: 80}),
      new Pattern(this.drawFunc, {numSlices: 3, sliceDifference: 5, groupWidth: 150, phaseDelta: 1}),
      new Pattern(this.drawFunc, {numSlices: 3, sliceDifference: 5, groupWidth: 150, phaseDelta: 3}),
      new Pattern(this.drawFunc, {numSlices: 3, sliceDifference: 5, groupWidth: 150, phaseDelta: 4}),
      new Pattern(this.drawFunc, {numSlices: 18, sliceDifference: 2, groupWidth: 500, phaseDelta: 11}),
    ];
    this.patternIndex = 0;
    this.customPattern = null;
  }

  get(index){
    const { patterns, patternIndex, customPattern } = this;

    if (customPattern){
      return customPattern;
    }
    if (index === undefined) {index = patternIndex};
    return patterns[index];
  }
  next(delta){
    const { patterns, patternIndex, customPattern } = this;

    if (customPattern){
      this.customPattern = null;
    } else {
      delta = delta || 1;
      this.patternIndex = (patterns.length + patternIndex + delta) % patterns.length;
    }
  }
  back(){
    this.next(-1);
  }
  newCustom(settings){
    this.customPattern = new Pattern(this.drawFunc, settings);
  }
}

export {
  Pattern,
  RainbowPatterns,
}
