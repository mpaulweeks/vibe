import React from 'react';
import styled from 'styled-components';

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
const SongTitle = styled.div`
  padding: 5px 0px;
`;

class Footer extends React.Component {
  onFullscreen() {
    this.props.brain.ch.goFullScreen();
  }
  setType(type) {
    this.props.brain.setType(type);
  }
  render() {
    return (
      <FooterContainer>
        <Row>
          click anywhere in the rainbow to change the pattern
        </Row>
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
          <Subtitle> create your own pattern </Subtitle>
          settings
        </Row>
        <Row>
          jukebox
        </Row>
        <Row>
          <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
        </Row>
      </FooterContainer>
    );
  }
}

export default Footer;
