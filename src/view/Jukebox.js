import React from 'react';
import styled from 'styled-components';

import {
  Button,
} from './Component';

const JukeboxContainer = styled.div`
`;
const SongTitle = styled.div`
  padding: 5px 0px;
  font-size: 18px;
`;
const AudioElm = styled.audio`
  display: none;
`;

class Jukebox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    this.audio.addEventListener('ended', () => {
      this.next();
    });
    this.ensurePlaying();

    // debugging
    window.audio = this.audio;
  }
  ensurePlaying() {
    const { audio } = this;
    const { data } = this.state
    const newData = this.props.audio.getData();

    if (data.src !== newData.src){
      audio.src = newData.src;
    }
    if (audio.paused === newData.isPlaying){
      if (newData.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    this.setState({
      data: newData,
    })
  }
  toggle() {
    this.props.audio.togglePlay();
    this.ensurePlaying();
  }
  next() {
    this.props.audio.nextTrack();
    this.ensurePlaying();
  }
  render() {
    const { data } = this.state;
    return (
      <JukeboxContainer>
        <AudioElm innerRef={ elm => this.audio = elm }></AudioElm>

        <div>you are currently listening to</div>
        <SongTitle>
          <a target="_blank" href={ data.url }>{ data.description }</a>
        </SongTitle>
        <div>
          <Button onClick={() => this.toggle()}>
            { data.isPlaying ? 'stop music' : 'play music' }
          </Button>
          <Button onClick={() => this.next()}>
            next track
          </Button>
        </div>
      </JukeboxContainer>
    );
  }
}

export default Jukebox;
