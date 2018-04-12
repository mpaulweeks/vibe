
class AudioTrack {
  constructor(filename, description, url){
    this.path = 'https://s3.amazonaws.com/vibe.mpaulweeks.com/music';
    this.filename = filename;
    this.description = description;
    this.url = url;
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

const tracks = [
  new AudioTrack(
    'FIRSTAID_VibeWithYou.mp3',
    'FIRSTAID - Vibe With You',
    'https://first-aid.bandcamp.com/album/nostalgic-falling-down'
  ),
  new AudioTrack(
    'TheFatRat_TimeLapse.mp3',
    'TheFatRat - Time Lapse',
    'https://lnk.to/tfrtimelapse'
  ),
  new AudioTrack(
    'Justice_CloseCall.mp3',
    'Justice - Close Call',
    'https://itunes.apple.com/us/album/woman/id1151157609'
  ),
  new AudioTrack(
    'GeorgeAndJonathan_UnicornsForever.mp3',
    'George & Jonathan - Unicorns Forever',
    'https://georgeandjonathan.bandcamp.com/album/beautiful-lifestyle',
  ),
  new AudioTrack(
    'GeorgeAndJonathan_OneHundredLifetimes.mp3',
    'George & Jonathan - One Hundred Lifetimes',
    'https://georgeandjonathan.bandcamp.com/album/beautiful-lifestyle',
  ),
  new AudioTrack(
    'SushiKiller_WaifuDream.mp3',
    'Sushi Killer - Waifu Dream',
    'https://soundcloud.com/sushi_killer/sushi-killer-waifu-dream'
  ),
];

class AudioManager {
  constructor(cookie){
    this.cookie = cookie;

    this.tracks = tracks;
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
  nextTrack(isTrackEnd){
    const { tracks, index } = this;
    if (isTrackEnd && this.isRepeat()){
      // do nothing
      return;
    }
    let newIndex = index;
    if (this.isShuffle()){
      // todo even distribution
      while(newIndex === index){
        newIndex = Math.floor(Math.random()*tracks.length);
      }
    } else {
      newIndex = (index + 1 + tracks.length) % tracks.length;
    }
    this.loadTrack(tracks[newIndex].filename);
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
