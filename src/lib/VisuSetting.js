import React from 'react'; // for jsx
import styled from 'styled-components';

const SettingsSelect = styled.select`
  width: 100px;
`;

class VisuSetting {
  constructor(name, description, options){
    this.name = name;
    this.description = description;
    this.options = options;
  }
  renderOptions(current, callback){
    const { name, options } = this;
    return (
      <SettingsSelect
        onChange={elm => callback(elm.target)}
        name={name}
        value={current[name]}
      >
        {options.map((o, oi) => (
          <option key={name + '-' + oi} value={o.value}>{o.display}</option>
        ))}
      </SettingsSelect>
    );
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

export {
  NewVisuSetting,
  NewIntegerSetting,
  NewBooleanSetting,
};
