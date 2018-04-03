class VisuSetting {
  constructor(name, description, options){
    this.name = name;
    this.description = description;
    this.options = options;
  }
}

function NewVisuSetting(name, description, options){
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

export {
  NewVisuSetting,
  NewIntegerSetting,
  NewBooleanSetting,
};
