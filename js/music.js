const playlist = [
  {
    title: "Focus Soundtrack1",
    artist: "Mr. Tiny's Studio",
    src: "../assets/music/Music0.mp3",
    thumbnail: "../assets/img/Music/Screenshot 2025-12-24 005753.png",
    duration: "2:00:04"
  },
];

let currentIndex = null;
const audio = document.getElementById("audioPlayer");

/* ---------- PLAY SONG ---------- */
function playSong(index) {
  const song = playlist[index];

  if (!song) return;

  // Load new song
  audio.src = song.src;
  audio.play();

  currentIndex = index;

  updateHeadline(song);
  highlightCurrent(index);
}

/* ---------- UPDATE DISPLAY ---------- */
function updateHeadline(song) {
  const title = document.querySelector(".title");
  const artist = document.querySelector(".artistName");
  const disImg = document.querySelector(".disImg");

  if (title) title.textContent = song.title;
  if (artist) artist.textContent = song.artist;
  if (disImg) disImg.src = song.thumbnail;
}

/* ---------- PLAY / PAUSE ---------- */
function togglePlay() {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/* ---------- HIGHLIGHT CURRENT SONG ---------- */
function highlightCurrent(index) {
  const rows = document.querySelectorAll(".song-row");
  rows.forEach(row => row.classList.remove("bg-lightgrey"));

  const currentRow = document.getElementById(`song-${index}`);
  if (currentRow) currentRow.classList.add("bg-lightgrey");
}

/* ---------- AUTO STOP WHEN ENDED ---------- */
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
});

/* ---------- OPTIONAL: AUTO LOAD FIRST SONG ---------- */
// playSong(0);
