class VisuSetting {
  constructor(name, description, iStart, iEnd, iDelta, isBoolean){
    this.name = name;
    this.description = description;

    const options = [];
    for (var i = iStart; i <= iEnd; i += iDelta) {
      var display = i;
      if (isBoolean) {
        display = i ? 'yes' : 'no';
      }
      options.push({
        value: i,
        display: display,
      });
    }
    this.options = options;
  }
}

export default VisuSetting;