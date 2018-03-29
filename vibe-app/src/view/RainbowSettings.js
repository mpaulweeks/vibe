import React from 'react';
import styled from 'styled-components';

const Subtitle = styled.div`
  text-decoration: underline;
`;

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

class RainbowSettings extends React.Component {
  onChange(setting, elm){
    console.log(setting, elm)
  }
  render() {
    const { settings } = this.props.brain.visuApp();
    return (
      <div>
        <div>
          click anywhere in the rainbow to change the pattern
        </div>
        <Subtitle>
          create your own pattern
        </Subtitle>
        {settings.map((s, si) => (
          <SettingsRow key={si}>
            <SettingsLeft>
              <label>{s.description}</label>
            </SettingsLeft>
            <SettingsRight>
              <SettingsSelect onChange={elm => this.onChange(s, elm)}>
                {s.options.map((o, oi) => (
                  <option key={si + '-' + oi} value={o.value}>{o.display}</option>
                ))}
              </SettingsSelect>
            </SettingsRight>
          </SettingsRow>
        ))}
      </div>
    );
  }
}

export default RainbowSettings;
