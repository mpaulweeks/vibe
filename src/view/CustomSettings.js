import React from 'react';
import styled from 'styled-components';

import {
  Row,
  Message,
  SectionHeader,
} from './Component';
import ColorPicker from './ColorPicker';

const SettingsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  font-size: 16px;
  padding: 1px 0px;
`;
const SettingsLeft = styled.div`
  width: calc(50% - 10px);
  margin: 0px;
  padding: 0px 5px;

  display: inline;
  text-align: right;
`;
const SettingsRight = styled(SettingsLeft)`
  display: flex;
  text-align: left;
`;
const SettingsSelect = styled.select`
  width: 100px;
`;

class SettingEditor extends React.Component {
  renderSelect() {
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
  renderColorPicker() {
    const { name, pickerConfig } = this.props.data;
    const { current, callback } = this.props;
    return (
      <ColorPicker
        onChange={value => callback({ name: name, value: value })}
        name={name}
        value={current[name]}
      ></ColorPicker>
    );
  }
  render() {
    const { type } = this.props.data;
    if (type === 'select') {
      return this.renderSelect();
    }
    if (type === 'color') {
      return this.renderColorPicker();
    }
    return '';
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
                <SettingEditor
                  data={ s }
                  current={ current }
                  callback={ elm => this.onChange(elm) }
                ></SettingEditor>
              </SettingsRight>
            </SettingsRow>
          ))}
        </Row>
      </div>
    );
  }
}

export default CustomSettings;
