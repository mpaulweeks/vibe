import React from 'react';
import styled from 'styled-components';

import Brain from './lib/Brain';
import AudioManager from './lib/AudioManager';

import Canvas from './view/Canvas';
import Panel from './view/Panel';
import Footer from './view/Footer';
import Popup from './view/Popup';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const FooterContainer = styled.div`
  border-top: 10px solid white;
  text-align: center;
  font-size: 16px;
  padding: 10px 0px;

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

class App extends React.Component {
  constructor(props){
    super(props)

    this.brain = new Brain();
    this.audio = new AudioManager(props.cookies);
    this.state = {
      ready: false,
    };

    // debugging
    window.brain = this.brain;
  }
  componentDidMount() {
    this.brain.init(
      this.refs.canvas.elm,
      [
        this.refs.popup.elm,
      ]
    );
    this.setState({
      ready: true,
    })
  }
  render() {
    const { ready } = this.state;
    const { isMobile } = this.brain;
    const childrenProps = {
      brain: this.brain,
      audio: this.audio,
    };
    return (
      <PageContainer>
        <Canvas ref="canvas"></Canvas>
        {ready && !isMobile && (
          <FooterContainer>
            <Panel {...childrenProps}></Panel>
            <Footer {...childrenProps}>></Footer>
          </FooterContainer>
        )}
        <Popup ref="popup" {...childrenProps}></Popup>
      </PageContainer>
    );
  }
}

export default App;