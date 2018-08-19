import BaseVisu from './BaseVisu';

import RainbowCanvas from './RainbowCanvas';
import { RainbowPatterns } from './Pattern';
import {
  NewIntegerSetting,
  NewBooleanSetting,
} from './VisuSetting';
import SettingsOptionManager from './SettingsOptionManager';

class RainbowVisu extends BaseVisu {
  createCanvas(canvasHelper) {
    return new RainbowCanvas(canvasHelper);
  }
  constructor(...props) {
    super(...props);
    this.patterns = new RainbowPatterns(this.canvas);
    this.instructions = [
      'move your cursor to move the rainbow',
      'click anywhere to see a new pattern',
    ]
    this.settingOptions = new SettingsOptionManager([
      NewIntegerSetting('phaseDelta', 'RGB shift', 0, 32, 1),
      NewIntegerSetting('colorRange', 'contrast', 0, 127, 1),
      NewIntegerSetting('numSlices', 'number of Slices per Group', 1, 32, 1),
      NewIntegerSetting('sliceDifference', 'color difference between Slices', 0, 16, 1),
      NewIntegerSetting('groupWidth', 'Group width in pixels', 50, 950, 50),
      NewBooleanSetting('centered', 'is always centered?'),
      NewIntegerSetting('tiling', 'number of displays across', 1, 5, 1),
    ]);
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
  onMouseClick() {
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
