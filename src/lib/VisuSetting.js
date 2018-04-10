class VisuSetting {
  constructor(name, description, options){
    this.type = 'select';
    this.name = name;
    this.description = description;
    this.options = options;
  }
}

class ColorSetting {
  constructor(name, description, pickerConfig){
    this.type = 'color'
    this.name = name;
    this.description = description;
    this.pickerConfig = pickerConfig;
  }
}

function NewVisuSetting(name, description, listOptions){
  const options = listOptions.map(tuple => ({
    value: tuple[0],
    display: tuple[1],
  }))
  return new VisuSetting(name, description, options)
}

function NewIntegerSetting(name, description, iStart, iEnd, iDelta){
  const options = [];
  for (var i = iStart; i <= iEnd; i += iDelta) {
    options.push({
      value: i,
      display: i,
    });
  }
  return new VisuSetting(name, description, options)
}

function NewBooleanSetting(name, description){
  const options = [
    {
      value: 0,
      display: 'no',
    },
    {
      value: 1,
      display: 'yes',
    },
  ];
  return new VisuSetting(name, description, options)
}

function NewColorSetting(name, description){
  return new ColorSetting(name, description, {})
}

export {
  NewVisuSetting,
  NewIntegerSetting,
  NewBooleanSetting,
  NewColorSetting,
};
