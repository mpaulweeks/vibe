import React from 'react';
import styled from 'styled-components';

import Brain from './lib/Brain';

import Canvas from './view/Canvas';
import Panel from './view/Panel';
import Footer from './view/Footer';


const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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

class App extends React.Component {
  constructor(props){
    super(props)
    this.brain = new Brain();
    this.state = {
      ready: false,
    };

    // debugging
    window.brain = this.brain;
  }
  componentDidMount() {
    this.brain.init(this.refs.canvas.elm);
    console.log('mounted App', this.brain);
    this.setState({
      ready: true,
    })
  }
  render() {
    const { ready } = this.state;
    const { brain } = this;
    return (
      <PageContainer>
        <Canvas ref="canvas"></Canvas>
        {ready && (
          <FooterContainer>
            <Panel brain={brain}></Panel>
            <Footer>></Footer>
          </FooterContainer>
        )}
      </PageContainer>
    );
  }
}

export default App;
