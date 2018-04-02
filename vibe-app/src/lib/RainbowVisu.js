import BaseVisu from './BaseVisu';

import RainbowCanvas from './RainbowCanvas';
import { RainbowPatterns } from './Pattern';
import VisuSetting from './VisuSetting';

class RainbowVisu extends BaseVisu {
  createCanvas(canvasHelper) {
    return new RainbowCanvas(canvasHelper);
  }
  constructor(...props) {
    super(...props);
    this.patterns = new RainbowPatterns(this.canvas);
    this.settingOptions = [
      new VisuSetting('phaseDelta', 'RGB shift', 0, 32, 1),
      new VisuSetting('colorRange', 'contrast', 0, 127, 1),
      new VisuSetting('numSlices', 'number of Slices per Group', 1, 32, 1),
      new VisuSetting('sliceDifference', 'color difference between Slices', 0, 16, 1),
      new VisuSetting('groupWidth', 'Group width in pixels', 50, 950, 50),
      new VisuSetting('centered', 'is always centered?', 0, 1, 1, true),
      new VisuSetting('tiling', 'number of displays across', 1, 5, 1),
    ];
  }
  getCurrentSettings() {
    return this.patterns.get().getSettings();
  }
  setCustomSettings(newSettings){
    const combinedSettings = {
      ...this.getCurrentSettings(),
      ...newSettings,
    }
    this.patterns.newCustom(combinedSettings);
  }
  onClick() {
    // override super
    this.patterns.next();
  }
  tick() {
    this.patterns.get().step();
  }
  draw() {
    this.patterns.get().draw();
  }
}

export default RainbowVisu;
