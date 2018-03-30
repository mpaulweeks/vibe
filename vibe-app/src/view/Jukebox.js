import React from 'react';
import styled from 'styled-components';

import Audio from '../lib/Audio';

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
  toggle() {
    Audio.togglePlay();
    this.forceUpdate();
  }
  next() {
    Audio.nextTrack();
    this.forceUpdate();
  }
  render() {
    const data = Audio.getData();
    return (
      <JukeboxContainer>
        { data.isPlaying && (
          <AudioElm src={ data.src } autoPlay loop></AudioElm>
        )}

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
