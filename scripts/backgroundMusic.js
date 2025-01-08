let backgroundAudio = document.createElement("audio");
backgroundAudio.src = "./assets/audio/background-music.mp3";
backgroundAudio.loop = true;
document.body.appendChild(backgroundAudio);

// Automatically play the audio when the page loads
backgroundAudio.play();

const soundButton = document.getElementById("soundButton");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

// Toggle sound on/off
soundButton.addEventListener("click", () => {
  if (backgroundAudio.paused) {
    backgroundAudio.play();
    soundButton.textContent = "🔇 Sound Off";
  } else {
    backgroundAudio.pause();
    soundButton.textContent = "🔊 Sound On";
  }
});

// Placeholder -- change to question page
startButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission
  window.location.href = "scores.html"; // Redirect to scores page
});
