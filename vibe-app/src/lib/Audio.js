
class AudioTrack {
  constructor(path, filename, description, url){
    this.path = path;
    this.filename = filename;
    this.description = description;
    this.url = url;
    this.src = this.path + '/' + this.filename;
  }
}

const COOKIE_MUTE = 'audioMuted';
const COOKIE_SONG = 'audioTrack';

const tracks = [
  new AudioTrack(
    'https://s3.amazonaws.com/vibe.mpaulweeks.com/music',
    'FIRSTAID_VibeWithYou.mp3',
    'FIRSTAID - Vibe With You',
    'https://first-aid.bandcamp.com/album/nostalgic-falling-down'
  ),
  new AudioTrack(
    'https://s3.amazonaws.com/vibe.mpaulweeks.com/music',
    'TheFatRat_TimeLapse.mp3',
    'TheFatRat - Time Lapse',
    'https://lnk.to/tfrtimelapse'
  ),
  new AudioTrack(
    'https://s3.amazonaws.com/vibe.mpaulweeks.com/music',
    'Justice_CloseCall.mp3',
    'Justice - Close Call',
    'https://itunes.apple.com/us/album/woman/id1151157609'
  ),
];

class AudioManager {
  constructor(cookie){
    this.cookie = cookie;

    this.tracks = tracks;
    this.index = 1;

    this.jukeboxPlaying = this.cookie.get(COOKIE_MUTE) === "false";
    this.loadTrack(this.cookie.get(COOKIE_SONG));
  }
  setCookie(){
    const options = {
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    }
    this.cookie.set(COOKIE_MUTE, !this.jukeboxPlaying, options);
    this.cookie.set(COOKIE_SONG, this.getData().filename, options);
  }
  loadTrack(filename){
    const { tracks } = this;

    var toLoad = tracks[0];
    for (var i = 0; i < tracks.length; i++){
      var currTitle = tracks[i].filename;
      if (currTitle === filename){
        toLoad = tracks[i];
        this.index = i;
      }
    }
    this.setCookie();
  }
  togglePlay(){
    this.jukeboxPlaying = !this.jukeboxPlaying;
    this.setCookie();
  }
  nextTrack(){
    const { tracks, index } = this;
    const newIndex = (index + 1 + tracks.length) % tracks.length;
    this.loadTrack(tracks[newIndex].filename);
  }
  getData(){
    return {
      ...this.tracks[this.index],
      isPlaying: this.jukeboxPlaying,
    }
  }
}

export default AudioManager;
