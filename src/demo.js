import videojs from 'video.js';
import './index';
import Vast from './index';
import { handleVMAP } from './features';

/**
 * Search a param value in the current query string
 */
const getURLParameter = (param) => {
  const result = window.location.search.match(new RegExp(`(\\?|&)${param}(\\[\\])?=([^&]*)`));
  return result ? decodeURIComponent(result[3]) : undefined;
};
globalThis.getURLParameter = getURLParameter;
const player = videojs('my-video', { autoplay: false, muted: true });
const vastAd = "https://cdn.theoplayer.com/demos/ads/vast/vast.xml"
const vmapAd = "https://cdn.theoplayer.com/demos/ads/vmap/single-pre-mid-post-no-skip.xml"
// Initialize the VAST plugin
const options = {
  vastUrl: vastAd,
  vmapUrl: vmapAd,
  debug: true,
}
const vastPlugin = player.vast(options);
// console.log(player)
// Add event listeners
player.on('play', () => {
  console.log('Video started playing');
});

player.on('pause', () => {
  console.log('Video paused');
});

player.on('ended', () => {
  console.log('Video ended');
});
let oldtime = -1
player.on('timeupdate', (e) => {
  console.log(player.currentTime())
  let currentTime = player.currentTime()
  currentTime = Math.floor(currentTime)
  if(oldtime !== currentTime && currentTime % 5 === 0){
    console.log("I AM HERE")
    oldtime = currentTime
    vastPlugin.schdeuleAdBreak(options)
  }
})

// ...

// You can add more event listeners as needed

globalThis.adsPlugin = vastPlugin;
globalThis.player = player;