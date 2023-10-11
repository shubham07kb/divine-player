// app player
const videoWorks = !!document.createElement("video").canPlayType;

if (videoWorks) {
  const videoElements = document.querySelectorAll("video.vid");
  const defaultConfig = {
    playerType: "single",
  };
  const playerConfig = {};
  // Iterate through each video element and replace it
  videoElements.forEach((videoElement, index) => {
    // Read the value of the "data-config" attribute
    try {
      const dataConfig = JSON.parse(videoElement.getAttribute("data-config"));
      if (!dataConfig.type) {
        dataConfig.type = defaultConfig.playerType;
      }
      if (dataConfig.type === "single") {
        // Set attributes using setAttribute method

        playerConfig.pnbutton = false;
      } else if (dataConfig.type === "playlist") {
      } else if (dataConfig.type === "fetch") {
      }
      // Create a new div element with the class "player"
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player");
      playerDiv.id = "video" + index;

      // Create the inner HTML structure for the player div without "controls"
      playerDiv.innerHTML = `
          <video class="video" id="video" preload="metadata">
            ${videoElement.innerHTML}
          </video>
          <div class="video-controls start" id="video-controls${index}">
          </div>
  `;

      // Replace the original video element with the new player div
      videoElement.replaceWith(playerDiv);
      document.getElementById("video" + index).querySelector(".video").id =
        "play" + index;
      document
        .getElementById("start" + index)
        .addEventListener("click", () => startPlay(index));
    } catch (e) {}
  });
}
