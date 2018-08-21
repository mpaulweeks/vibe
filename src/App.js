import React from 'react';
import styled from 'styled-components';
import scrollToComponent from 'react-scroll-to-component';

import Brain from './lib/Brain';
import AudioManager from './lib/AudioManager';

import Canvas from './view/Canvas';
import Panel from './view/Panel';
import Footer from './view/Footer';
import Welcome from './view/Welcome';

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
  border-top: 10px solid var(--foreground);
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

const WelcomeContainer = styled(hideable)``;

class App extends React.Component {
  constructor(props){
    super(props)

    this.brain = new Brain();
    this.audio = new AudioManager(this.brain, props.cookies);
    this.state = {
      isReady: false,
      isWelcome: true,
    };

    // debugging
    window.brain = this.brain;
  }
  componentDidMount() {
    this.brain.init(
      this.refs.canvas.elm,
      [
        this.refs.welcome.elm,
      ],
      () => this.exitWelcome(),
    );
    this.setState({
      isReady: true,
    });
  }
  scrollToFooter() {
    scrollToComponent(this.refs.footer, {
      offset: 0,
      align: 'top',
      ease: 'inOutCirc',
      duration: 1500,
    });
  }
  exitWelcome(isPlaying) {
    if (isPlaying !== undefined) {
      this.audio.setPlay(isPlaying);
    }
    this.setState({
      isWelcome: false,
    });
  }
  render() {
    const { isReady, isWelcome } = this.state;
    const { isMobile } = this.brain;
    const childrenProps = {
      brain: this.brain,
      audio: this.audio,
      scrollToFooter: (...args) => this.scrollToFooter(...args),
      exitWelcome: (...args) => this.exitWelcome(...args),
    };
    const showFooter = isReady && !isMobile;
    const showWelcome = isReady && isWelcome;
    return (
      <PageContainer>
        <Canvas ref="canvas"></Canvas>
        {showFooter && (
          <div ref="footer">
            <FooterContainer>
              <Panel {...childrenProps}></Panel>
              <Footer {...childrenProps}>></Footer>
            </FooterContainer>
          </div>
        )}
        <WelcomeContainer hidden={!showWelcome}>
          <Welcome ref="welcome" {...childrenProps}></Welcome>
        </WelcomeContainer>
      </PageContainer>
    );
  }
}

export default App;
