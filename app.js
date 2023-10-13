// app player
const videoWorks = !!document.createElement('video').canPlayType;
const playSvg = `<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                height="100%"
                width="100%"
                viewBox="0 0 24 24"
                enable-background="new 0 0 24 24"
                >
                <g>
                <path 
                d="M6,4l12,8L6,20V4z"
                >
                </path>
                </g>
                </svg>`;
const pauseSvg = `<svg
                  version="1.1"
                  viewBox="0 0 36 36"
                  fill="#fff" height="100%"
                  width="100%"
                  >
                  <path
                  d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                  >
                  </path>
                  </svg>`;

if (videoWorks) {
  const videoElements = document.querySelectorAll('video.vid');
  const defaultConfig = {
    playerType: 'single',
  };
  const playerConfig = {};
  // Iterate through each video element and replace it
  videoElements.forEach((videoElement, index) => {
    // Read the value of the "data-config" attribute
    try {
      const dataConfig = JSON.parse(videoElement.getAttribute('data-config'));
      if (!dataConfig.type) {
        dataConfig.type = defaultConfig.playerType;
      }
      if (dataConfig.type === 'single') {
        // Set attributes using setAttribute method

        playerConfig.pnbutton = false;
      } else if (dataConfig.type === 'playlist') {
        return;
      } else if (dataConfig.type === 'fetch') {
        return;
      }
      // Create a new div element with the class "player"
      const playerDiv = document.createElement('div');
      playerDiv.classList.add('player');
      playerDiv.id = 'video' + index;

      // Create the inner HTML structure for the player div without "controls"
      playerDiv.innerHTML = `
          <video class="video" id="video" preload="metadata">
            ${videoElement.innerHTML}
          </video>
          <div class="video-controls start" id="video-controls${index}">
            <div class="up-control">
              <div class="top">
                <div class="left"></div>
                <div class="right"></div>
              </div>
              <div class="center">
                <div class="cleft"></div>
                <div class="ccenter">
                  <div class="prev${playerConfig.pnbutton ? '' : ' hidden'}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="100%" width="100%" viewBox="0 0 24 24"><path d="M19,6L9,12l10,6V6L19,6z M7,6H5v12h2V6z"></path></svg>
                  </div>
                  <div></div>
                  <div class="play first" id="start${index}">
                    ${playSvg}
                  </div>
                  <div></div>
                  <div class="next${playerConfig.pnbutton ? '' : ' hidden'}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="100%" width="100%" viewBox="0 0 24 24"><path d="M5,18l10-6L5,6V18L5,18z M19,6h-2v12h2V6z"></path></svg>
                  </div>
                </div>
                <div class="cright"></div>
              </div>
              <div class="bottom">
                <div class="left"></div>
                <div class="right"></div>
              </div>
            </div>
            <div class="play-line"></div>
            <div class="main-control">
              <div class="main-left">
                  <div class="start-main${index}"></div>
              </div>
              <div class="main-right">
              </div>
            </div>
          </div>
  `;

      // Replace the original video element with the new player div
      videoElement.replaceWith(playerDiv);
      document.getElementById('video' + index).querySelector('.video').id =
        'play' + index;
      document
          .getElementById('start' + index)
          .addEventListener('click', () => startPlay(index));
    } catch (e) {
      return;
    }
  });
}

/**
 * Play and Pause a Player
 *
 * @param {int} index Get Player Index.
 */
function togglePlay(index) {
  const play = document.getElementById('play' + index);
  const start = document.getElementById('start' + index);
  const startMain = document.querySelector('.start-main' + index);
  if (play.paused || play.ended) {
    play.play();
    start.innerHTML = pauseSvg;
    startMain.innerHTML = pauseSvg;
  } else {
    play.pause();
    start.innerHTML = playSvg;
    startMain.innerHTML = playSvg;
  }
}

/**
 * First Start of a Player
 *
 * @param {int} index Get Player Index.
 */
function startPlay(index) {
  document.getElementById('video-controls' + index).classList.remove('start');
  document.addEventListener('video' + index, () => togglePlay(index));
  togglePlay(index);
}
