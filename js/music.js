const playlist = [
  {
    title: "Focus Soundtrack1",
    artist: "Mr. Tiny's Studio",
    src: "../assets/music/Music0.mp3",
    thumbnail: "../assets/img/Music/Screenshot 2025-12-24 005753.png",
    duration: "2:00:04"
  },
   {
    title: "Focus Soundtrack2",
    artist: "Cigarettes After Sex",
    src: "../assets/music/Cigarettes After Sex (Full Album) - Cigarettes After Sex [8scL5oJX6CM].mp3",
    thumbnail: "../assets/img/Music/image copy.png",
    duration: "00:46:42"
  },
   {
    title: "Focus Soundtrack3",
    artist: "Ed Sheeran",
    src: "../assets/music/Ed Sheeran - Soft Piano [sleep, study, relax, calm, chill, no mid-roll ads, instrumental] [bXABghLhGGQ].mp3",
    thumbnail: "../assets/img/Music/Screenshot 2025-12-25 233130.png",
    duration: "00:35:54"
  },
   {
    title: "Focus Soundtrack4",
    artist: "Relaxing Zen Music",
    src: "../assets/music/15 Minute Timer - Relaxing Zen Music.mp3",
    thumbnail: "../assets/img/Music/image.png",
    duration: "00:15:00"
  },
];

let currentIndex = null;
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");


/* ---------- PLAY SONG ---------- */
function playSong(index) {
  const song = playlist[index];
  if (!song) return;

  audio.src = song.src;
  audio.play();

  currentIndex = index;

  updateHeadline(song);
  highlightCurrent(index);

  // 👇 add this
  playPauseBtn.textContent = "Pause";
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
  // If no song is loaded yet, do nothing
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audio.pause();
    playPauseBtn.textContent = "Play";
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
