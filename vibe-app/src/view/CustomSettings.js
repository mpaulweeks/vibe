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
  width: 50px;
`;

class CustomSettings extends React.Component {
  constructor(props){
    super(props);
    this.settingElms = [];
  }
  onChange(setting, elm){
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
          <Message>
            click anywhere in the rainbow to change the pattern
          </Message>
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
                <SettingsSelect
                  onChange={elm => this.onChange(s, elm.target)}
                  name={s.name}
                  value={current[s.name]}
                >
                  {s.options.map((o, oi) => (
                    <option key={si + '-' + oi} value={o.value}>{o.display}</option>
                  ))}
                </SettingsSelect>
              </SettingsRight>
            </SettingsRow>
          ))}
        </Row>
      </div>
    );
  }
}

export default CustomSettings;
