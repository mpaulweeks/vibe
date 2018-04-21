import BaseVisu from './BaseVisu';
import TailCanvas from './TailCanvas';
import {
  NewVisuSetting,
  NewBooleanSetting,
  NewIntegerSetting,
  NewColorSetting,
} from './VisuSetting';
import { GradientModifier } from './Gradient';
import SettingsOptionManager from './SettingsOptionManager';
import TailSettings from './TailSettings';

class TailVisu extends BaseVisu {
  constructor(...props) {
    super(...props);
    this.instructions = [
      'press SPACEBAR to clear',
      'click anywhere in grid to see a new pattern',
    ];
    this.settingsManager = new TailSettings();
    this.updateCanvasSettings();
    this.settingOptions = new SettingsOptionManager([
      NewVisuSetting('pattern', 'Pattern', [
        ['ring', 'Ring'],
        ['spiral', 'Spiral'],
      ]),
      NewIntegerSetting('distance', 'Distance from Center', 0, 500, 5),
      NewIntegerSetting('radius', 'Circle Size', 5, 300, 5),
      NewIntegerSetting('count', 'Number of Circles', 1, 1000, 1),
      NewIntegerSetting('rpm', 'Rotations per Minute', 0, 600, 1),
      NewBooleanSetting('isRainbow', 'Rainbow?'),
      NewColorSetting('colorFill', 'Circle Color'),
      NewIntegerSetting('lineWidth', 'Border Thickness', 0, 20, 1),
      NewColorSetting('colorEdge', 'Border Color'),
      NewColorSetting('colorBackground', 'Background Color'),
    ], {
      rpm: cs => cs.distance !== 0 || cs.pattern !== 'ring',
      colorFill: cs => !cs.isRainbow,
      colorEdge: cs => cs.lineWidth !== 0,
    });

    this.grad = new GradientModifier();
    this.state = {
      rotation: 0,
    }
  }

  updateCanvasSettings() {
    this.canvas.setSettings(this.settingsManager.get());
  }
  setCustomSettings(newSettings) {
    const mergedSettings = {
      ...this.getCurrentSettings(),
      ...newSettings,
    };
    this.settingsManager.newCustom(mergedSettings);
    this.updateCanvasSettings();
  }
  getCurrentSettings() {
    return this.settingsManager.get();
  }

  onMouseClick() {
    this.settingsManager.next();
    this.updateCanvasSettings();
    this.canvas.clear();
  }

  createCanvas(canvasHelper) {
    return new TailCanvas(canvasHelper);
  }
  getCanvasState(){
    return {
      ...this.state,
      gradients: this.grad.rainbowSeries(this.getCurrentSettings()),
    };
  }
  tick() {
    const { rpm } = this.getCurrentSettings();
    const rotationPerFrame = (rpm * Math.PI * 2) / (60 * 60);
    this.state.rotation = (this.state.rotation + rotationPerFrame) % (Math.PI * 2);
    this.grad.step();
  }
  draw() {
    this.canvas.draw(this.getCanvasState());
  }
}

export default TailVisu;
