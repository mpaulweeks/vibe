import React from 'react';
import { scroller } from 'react-scroll';
import styled from 'styled-components';

import AudioManager from './lib/AudioManager';
import Brain from './lib/Brain';

import Canvas from './view/Canvas';
import Footer from './view/Footer';
import Panel from './view/Panel';
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
    color: var(--link);
  }
  & button:hover {
    cursor: pointer;
  }
  & input:hover {
    cursor: pointer;
  }
`;

const WelcomeContainer = styled(hideable)`
  & a {
    color: var(--foreground);
    text-decoration: none;
  }
  & a:hover {
    color: var(--link);
    text-decoration: underline;
  }
`;

const skipWelcome = !!new URLSearchParams(window.location.search).get('skipwelcome');

class App extends React.Component {
  canvasRef = React.createRef();
  welcomeRef = React.createRef();

  constructor(props){
    super(props)

    this.brain = new Brain();
    this.audio = new AudioManager(this.brain, props.cookies);
    this.state = {
      isReady: false,
      isWelcome: !skipWelcome,
    };

    // debugging
    window.brain = this.brain;
  }
  componentDidMount() {
    this.brain.init(
      this.canvasRef.current.elm.current,
      this.welcomeRef.current.elm.current,
      () => this.exitWelcome(),
    );
    this.setState({
      isReady: true,
    });
  }
  scrollToFooter() {
    scroller.scrollTo('footer', {
      duration: 1500,
      smooth: 'easeInOutQuart',
    });
  }
  exitWelcome(isPlaying) {
    if (isPlaying !== undefined) {
      this.audio.setPlay(isPlaying);
    }
    if (this.state.isWelcome) {
      this.setState({
        isWelcome: false,
      });
    }
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
        <Canvas ref={this.canvasRef}></Canvas>
        {showFooter && (
          <FooterContainer name="footer">
            <Panel {...childrenProps}></Panel>
            <Footer {...childrenProps}></Footer>
          </FooterContainer>
        )}
        <WelcomeContainer hidden={!showWelcome}>
          <Welcome ref={this.welcomeRef} {...childrenProps}></Welcome>
        </WelcomeContainer>
      </PageContainer>
    );
  }
}

export default App;
