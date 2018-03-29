import React from 'react';
import styled from 'styled-components';

import Jukebox from './Jukebox';

const FooterContainer = styled.div`
  border-top: 10px solid white;
  text-align: center;
  font-size: 18px;

  & a {
    color: #91D2FA;
  }
  & button:hover {
    cursor: pointer;
  }
  & input:hover {
    cursor: pointer;
  }
`;

const Row = styled.div`
  padding: 10px 0px;
  &:first-child {
    padding-top: 20px;
  }
  &:last-child {
    padding-bottom: 20px;
  }
`;

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
const SettingsSelect = styled.div`
  width: 50px;
`;

class Footer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: props.brain.visuType,
    }
  }
  onFullscreen() {
    this.props.brain.ch.goFullScreen();
  }
  setType(type) {
    const { brain } = this.props;
    brain.setType(type);
    this.setState({
      type: brain.visuType,
    });
  }
  render() {
    const { type } = this.state;
    return (
      <FooterContainer>
        <Row>
          <button onClick={() => this.setType('rainbow')}>
            Rainbow
          </button>
          <button onClick={() => this.setType('cube')}>
            Cube
          </button>
        </Row>
        <Row>
          <button onClick={() => this.onFullscreen()}>
            View Fullscreen
          </button>
        </Row>
        <Row>
          <div>
            { type }
          </div>
          <div>
            click anywhere in the rainbow to change the pattern
          </div>
          <Subtitle>
            create your own pattern
          </Subtitle>
          todo settings
        </Row>
        <Row>
          <Jukebox></Jukebox>
        </Row>
        <Row>
          <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
        </Row>
      </FooterContainer>
    );
  }
}

export default Footer;
