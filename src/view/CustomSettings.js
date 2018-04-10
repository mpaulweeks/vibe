import React from 'react';
import styled from 'styled-components';

import {
  Row,
  Message,
  SectionHeader,
} from './Component';

const SettingsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  font-size: 16px;
`;
const SettingsLeft = styled.div`
  width: calc(50% - 10px);
  padding: 0px 5px;
  text-align: right;
`;
const SettingsRight = styled.div`
  width: calc(50% - 10px);
  padding: 0px 5px;
  text-align: left;
`;
const SettingsSelect = styled.select`
  width: 100px;
`;

class VisuSettingElm extends React.Component {
  render() {
    const { name, options } = this.props.data;
    const { current, callback } = this.props;
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

class CustomSettings extends React.Component {
  constructor(props){
    super(props);
    this.settingElms = [];
  }
  onChange(elm){
    const newSettings = {};
    let value = elm.value;
    if (!isNaN(value)){
      value = parseInt(value, 10);
    }
    newSettings[elm.name] = value;
    this.props.brain.visuApp().setCustomSettings(newSettings);
    this.forceUpdate();
  }
  render() {
    const visuApp = this.props.brain.visuApp();
    const current = visuApp.getCurrentSettings();
    return (
      <div>
        <Row>
          <SectionHeader>
            instructions
          </SectionHeader>
          {visuApp.instructions.map((m, mi) => (
            <Message key={`instructions-${mi}`}>
              {m}
            </Message>
          ))}
        </Row>
        <Row>
          <SectionHeader>
            create your own pattern
          </SectionHeader>
          {visuApp.settingOptions.map((s, si) => (
            <SettingsRow key={si}>
              <SettingsLeft>
                <label>{s.description}</label>
              </SettingsLeft>
              <SettingsRight>
                <VisuSettingElm
                  data={ s }
                  current={ current }
                  callback={ elm => this.onChange(elm) }
                ></VisuSettingElm>
              </SettingsRight>
            </SettingsRow>
          ))}
        </Row>
      </div>
    );
  }
}

export default CustomSettings;
