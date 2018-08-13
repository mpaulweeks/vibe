import React from 'react';
import styled from 'styled-components';

import Brain from './lib/Brain';
import AudioManager from './lib/AudioManager';

import Canvas from './view/Canvas';
import Panel from './view/Panel';
import Footer from './view/Footer';
import Popup from './view/Popup';

const hideable = styled.div`
  ${props => props.hidden && `
    display: none;
  `}
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const FooterContainer = styled(hideable)`
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

const WelcomeContainer = styled(hideable)`
`;

class App extends React.Component {
  constructor(props){
    super(props)

    this.brain = new Brain();
    this.audio = new AudioManager(props.cookies);
    this.state = {
      isReady: false,
      isWelcome: false,
    };

    // debugging
    window.brain = this.brain;
  }
  componentDidMount() {
    const typedUrl = this.brain.init(
      this.refs.canvas.elm,
      [
        this.refs.popup.elm,
      ]
    );
    this.setState({
      isReady: true,
      isWelcome: true,
      hasType: typedUrl,
    });
  }
  render() {
    const { isReady, isWelcome } = this.state;
    const { isMobile } = this.brain;
    const childrenProps = {
      brain: this.brain,
      audio: this.audio,
    };
    const showFooter = !isMobile && !isWelcome;
    const showWelcome = !isMobile && isWelcome;
    return (
      <PageContainer>
        <Canvas ref="canvas"></Canvas>
        {isReady && (
          <div>
            <FooterContainer hidden={!showFooter}>
              <Panel {...childrenProps}></Panel>
              <Footer {...childrenProps}>></Footer>
            </FooterContainer>
            <WelcomeContainer hidden={!showWelcome}>
              welcome!
            </WelcomeContainer>
          </div>
        )}
        <Popup ref="popup" {...childrenProps}></Popup>
      </PageContainer>
    );
  }
}

export default App;
