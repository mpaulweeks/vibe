class _RainbowAssistant {
  // https://krazydad.com/tutorials/makecolors.php
  byte2Hex(n)
  {
    n = Math.min(n, 255);
    n = Math.max(n, 0);
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  fromRGB(r,g,b){
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }
  getColor(step, settings){
    var red = (Math.sin((settings.colorFreq * step) + (0 * settings.phaseDelta)) * settings.colorRange) + settings.colorFloor;
    var grn = (Math.sin((settings.colorFreq * step) + (1 * settings.phaseDelta)) * settings.colorRange) + settings.colorFloor;
    var blu = (Math.sin((settings.colorFreq * step) + (2 * settings.phaseDelta)) * settings.colorRange) + settings.colorFloor;
    return this.fromRGB(red,grn,blu);
  }
}

const RainbowAssistant = new _RainbowAssistant();
const ColorAssistant = {
  getRainbowColor: (...props) => RainbowAssistant.getColor(...props),
}

export default ColorAssistant;
