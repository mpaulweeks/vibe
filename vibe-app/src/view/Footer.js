import React from 'react';
import styled from 'styled-components';

import Jukebox from './Jukebox';
import RainbowSettings from './RainbowSettings';
import CubeSettings from './CubeSettings';

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
    const { brain } = this.props;
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
          { type === 'rainbow' && (
            <RainbowSettings brain={ brain }></RainbowSettings>
          )}
          { type === 'cube' && (
            <CubeSettings brain={ brain }></CubeSettings>
          )}
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
