console.log("INDEX.JS")

var isMute = false;

window.wirewax.addEventListener(window.wirewax.events.listeners.PLAYER_READY, function(data) {
  console.log('Player is ready!');
});

window.wirewax.addEventListener(window.wirewax.events.listeners.HAS_PAUSED, function(data) {
  console.log('Video has paused!');
});

window.wirewax.addEventListener(window.wirewax.events.listeners.HAS_PLAYED, function(data) {
  console.log('Video has played!');
});

window.wirewax.addEventListener(window.wirewax.events.listeners.VIDEO_END, function(data) {
  console.log('Video has ended!');
});

window.addEventListener('resize', function() {
	window.wirewax.triggerEvent(window.wirewax.events.triggers.WINDOW_RESIZE)
});

window.playVideo = function() {
  console.log("Click PlayVideo");
  window.wirewax.triggerEvent(window.wirewax.events.triggers.PLAY);
}

window.pauseVideo = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.PAUSE);
}

window.seekVideo = function() {
window.wirewax.triggerEvent(window.wirewax.events.triggers.SEEK, 20);
}

window.goToTag = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.GO_TO_TAG, 5339763);
}

window.openTag = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.OPEN_TAG, 5339763);
}

window.closeOverlay = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.CLOSE_WIDGET);
}

window.getCurrentTime = function() {
	window.wirewax.triggerEvent(window.wirewax.events.triggers.GET_CURRENT_TIME);
}

window.changeVolume = function(volume) {
	window.wirewax.triggerEvent(window.wirewax.events.triggers.CHANGE_VOLUME, volume);
}

window.toggleMute = function() {
	isMute = !isMute;
  if(isMute) {
		window.wirewax.triggerEvent(window.wirewax.events.triggers.MUTE_VOLUME, isMute);
  } else {
		window.wirewax.triggerEvent(window.wirewax.events.triggers.UNMUTE_VOLUME, isMute);
  }
}

window.changeRendition = function() {
	var value = document.getElementById("rendition").value;
	window.wirewax.triggerEvent(window.wirewax.events.triggers.CHANGE_RENDITION, value);
}