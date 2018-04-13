import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  Row,
  Message,
  SectionHeader,
  Button,
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
    const { name } = this.props.data;
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
    this.state = {
      generatingUrl: false,
      customUrl: null,
      error: false,
      copied: false,
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      generatingUrl: false,
      customUrl: null,
      error: false,
      copied: false,
    });
  }
  onCopy() {
    this.setState({
      copied: true,
    });
    const customUrl = this.state.customUrl;
    setTimeout(() => {
      const currentUrl = this.state.customUrl;
      if (currentUrl === customUrl){
        this.setState({
          copied: false,
        });
      }
    }, 1000);
  }
  onChange(elm){
    const newSettings = {};
    let value = elm.value;
    if (!isNaN(value)){
      value = parseInt(value, 10);
    }
    newSettings[elm.name] = value;
    this.props.brain.visuApp().setCustomSettings(newSettings);
    this.setState({
      generatingUrl: false,
      customUrl: null,
      error: false,
      copied: false,
    });
  }
  generateCustomUrl() {
    this.setState({
      generatingUrl: true,
      customUrl: null,
      error: false,
      copied: false,
    });
    this.props.brain.generateCustomUrl()
      .then(url => {
        this.setState({
          generatingUrl: false,
          customUrl: url,
          error: false,
          copied: false,
        });
      })
      .catch(err => {
        this.setState({
          generatingUrl: false,
          customUrl: null,
          error: true,
          copied: false,
        });
      });
  }
  render() {
    const visuApp = this.props.brain.visuApp();
    const current = visuApp.getCurrentSettings();
    const { generatingUrl, customUrl, error, copied } = this.state;
    return (
      <div>
        <Row>
          <SectionHeader>
            instructions
          </SectionHeader>
          { visuApp.instructions.map((m, mi) => (
            <Message key={`instructions-${mi}`}>
              {m}
            </Message>
          ))}
        </Row>
        <Row>
          <SectionHeader>
            create your own pattern
          </SectionHeader>
          { visuApp.settingOptions.map((s, si) => (
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
        <Row>
          { error && (
            <Message>
              permalinks are currently broken, please try again later
            </Message>
          )}
          { !error && customUrl && (
            <div>
              <Message>
                permalink: <a target="_blank" href={customUrl}>{customUrl}</a>
              </Message>
              <Message>
                <CopyToClipboard text={customUrl} onCopy={() => this.onCopy()}>
                  <Button>
                    {copied ? 'copied!' : 'copy to clipboard'}
                  </Button>
                </CopyToClipboard>
              </Message>
            </div>
          )}
          { !error && !customUrl && (
            <div>
              { generatingUrl ? (
                <Message>
                  please wait, generating bitly link...
                </Message>
              ) : (
                <Message>
                  want to share your custom settings?
                </Message>
              )}
              <Message>
                <Button disabled={generatingUrl} onClick={() => this.generateCustomUrl()}>
                  generate permalink
                </Button>
              </Message>
            </div>
          )}
        </Row>
      </div>
    );
  }
}

export default CustomSettings;
