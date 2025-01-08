// Select the sound button and audio element
const soundButton = document.getElementById("soundButton");
const backgroundAudio = document.getElementById("backgroundAudio");

// Automatically play the audio when the page loads
window.addEventListener("load", () => {
  backgroundAudio.play();
  soundButton.textContent = "🔇 Sound Off";
});

// Track whether the audio is playing
let isPlaying = true;

// Function to toggle sound on/off
function toggleSound() {
  if (isPlaying) {
    // Pause the audio
    backgroundAudio.pause();
    soundButton.textContent = "🔊 Sound On";
  } else {
    // Play the audio
    backgroundAudio.play();
    soundButton.textContent = "🔇 Sound Off";
  }

  // Toggle the isPlaying flag
  isPlaying = !isPlaying;
}

// Add event listener to the button
soundButton.addEventListener("click", toggleSound);
