import Tracks from './Tracks';

class AudioTrack {
  constructor(trackData){
    this.path = 'https://s3.amazonaws.com/vibe.mpaulweeks.com/music';
    this.filename = trackData[0];
    this.description = trackData[1];
    this.url = trackData[2];
    this.src = this.path + '/' + this.filename;
  }
}

const Cookie = {
  Mute: 'audio_muted',
  PlaylistStyle: 'audio_playlist_style',
  SongFileName: 'audio_song_filename',
};

const PlaylistStyle = {
  Default: 'playlist_style_default',
  Shuffle: 'playlist_style_shuffle',
  RepeatSong: 'playlist_style_repeat_song',
};

class AudioManager {
  constructor(cookie){
    this.cookie = cookie;

    this.tracks = Tracks.map(t => new AudioTrack(t));
    this.index = 0;

    this.isPlaying = this.cookie.get(Cookie.Mute) === "false";
    this.playlistStyle = this.cookie.get(Cookie.PlaylistStyle) || PlaylistStyle.Default;
    this.loadTrack(this.cookie.get(Cookie.SongFileName));

    this.PlaylistStyle = PlaylistStyle;
  }
  setCookie(){
    const options = {
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    }
    this.cookie.set(Cookie.SongFileName, this.getData().filename, options);
    this.cookie.set(Cookie.Mute, !this.isPlaying, options);
    this.cookie.set(Cookie.PlaylistStyle, this.playlistStyle, options);
  }
  loadTrack(filename){
    const { tracks } = this;
    for (var i = 0; i < tracks.length; i++){
      var currTitle = tracks[i].filename;
      if (currTitle === filename){
        this.index = i;
      }
    }
    this.setCookie();
  }
  togglePlay(){
    this.isPlaying = !this.isPlaying;
    this.setCookie();
  }
  setPlaylistStyle(value){
    console.log(value);
    this.playlistStyle = value;
    this.setCookie();
  }
  isRepeat(){
    return this.playlistStyle === PlaylistStyle.RepeatSong;
  }
  isShuffle(){
    return this.playlistStyle === PlaylistStyle.Shuffle;
  }
  stepTrack(delta){
    const { tracks, index } = this;
    let newIndex = index;
    if (this.isShuffle()){
      // todo even distribution
      while(newIndex === index){
        newIndex = Math.floor(Math.random()*tracks.length);
      }
    } else {
      newIndex = (index + delta + tracks.length) % tracks.length;
    }
    this.loadTrack(tracks[newIndex].filename);
  }
  nextTrack(isTrackEnd){
    if (isTrackEnd && this.isRepeat()){
      // do nothing
      return;
    }
    this.stepTrack(1);
  }
  prevTrack(isTrackEnd){
    this.stepTrack(-1);
  }
  getData(){
    return {
      ...this.tracks[this.index],
      isPlaying: this.isPlaying,
      playlistStyle: this.playlistStyle,
    }
  }
}

export default AudioManager;
