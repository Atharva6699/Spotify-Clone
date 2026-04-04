/* ============================================================
   SPOTIFY CLONE — script.js
   Music player + Mock API + Search + Shuffle / Repeat / Like
   ============================================================ */

"use strict";

// ─────────────────────────────────────────────────────────────
// MOCK API
// Replace BASE_URL with a real backend endpoint if you have one.
// ─────────────────────────────────────────────────────────────
const API = {
  BASE_URL: null,

  // Homepage sections (playlists, charts, artists)
  sections: [
    {
      id: "recently-played",
      title: "Recently Played",
      type: "playlist",
      items: [
        { id: "rp1", name: "Top 50 – Global",  cover: "https://picsum.photos/seed/top50g/300/300",  info: "Your daily update of the most played tracks globally." },
        { id: "rp2", name: "Mood Booster",     cover: "https://picsum.photos/seed/mood/300/300",    info: "Good mood guaranteed." },
        { id: "rp3", name: "Bollywood Hits",   cover: "https://picsum.photos/seed/bolly/300/300",   info: "The biggest Bollywood songs right now." },
        { id: "rp4", name: "Chill Vibes",      cover: "https://picsum.photos/seed/chill/300/300",   info: "Kick back with mellow beats." },
        { id: "rp5", name: "Rap Caviar",       cover: "https://picsum.photos/seed/rapcav/300/300",  info: "Hip-hop's flagship playlist." },
      ],
    },
    {
      id: "trending",
      title: "Trending Near You",
      type: "playlist",
      items: [
        { id: "tr1", name: "Top 50 – India",   cover: "https://picsum.photos/seed/top50i/300/300",  info: "The most played tracks in India today." },
        { id: "tr2", name: "Punjabi 101",      cover: "https://picsum.photos/seed/punjabi/300/300", info: "The best of Punjabi music." },
        { id: "tr3", name: "Filhaal Trending", cover: "https://picsum.photos/seed/filhaal/300/300", info: "Trending songs this week." },
        { id: "tr4", name: "EDM Hits",         cover: "https://picsum.photos/seed/edm/300/300",     info: "Electronic beats to keep you going." },
        { id: "tr5", name: "Indie Fresh",      cover: "https://picsum.photos/seed/indie/300/300",   info: "Fresh indie finds." },
      ],
    },
    {
      id: "featured-charts",
      title: "Featured Charts",
      type: "chart",
      items: [
        { id: "fc1", name: "Viral 50 – Global", cover: "https://picsum.photos/seed/viral50/300/300",  info: "The most viral tracks on social media." },
        { id: "fc2", name: "Top Songs – India", cover: "https://picsum.photos/seed/topindia/300/300", info: "India's top streaming tracks." },
        { id: "fc3", name: "EQUAL India",       cover: "https://picsum.photos/seed/equal/300/300",    info: "Supporting female artists." },
        { id: "fc4", name: "Pop Rising",        cover: "https://picsum.photos/seed/poprise/300/300",  info: "The next generation of pop." },
        { id: "fc5", name: "New Music Friday",  cover: "https://picsum.photos/seed/nmf/300/300",      info: "The best new music every Friday." },
      ],
    },
    {
      id: "artists",
      title: "Popular Artists",
      type: "artist",
      items: [
        { id: "ar1", name: "Arijit Singh", cover: "https://picsum.photos/seed/arijit/300/300",   info: "Artist" },
        { id: "ar2", name: "Taylor Swift", cover: "https://picsum.photos/seed/tswift/300/300",   info: "Artist" },
        { id: "ar3", name: "A.R. Rahman",  cover: "https://picsum.photos/seed/arrahman/300/300", info: "Artist" },
        { id: "ar4", name: "Badshah",      cover: "https://picsum.photos/seed/badshah/300/300",  info: "Artist" },
        { id: "ar5", name: "The Weeknd",   cover: "https://picsum.photos/seed/weeknd/300/300",   info: "Artist" },
      ],
    },
  ],

  async getSections() {
    if (this.BASE_URL) {
      const res = await fetch(`${this.BASE_URL}/sections`);
      return res.json();
    }
    return new Promise(resolve => setTimeout(() => resolve(this.sections), 400));
  },

  /** Load songs from songs.json; falls back to built-in demo list. */
  async getSongs() {
    try {
      const response = await fetch("./songs.json");
      if (!response.ok) throw new Error("songs.json not found");
      const data = await response.json();
      // Handle both [ ] and { "songs": [ ] } formats
      const list = data.songs ? data.songs : data;
      console.log(`Loaded ${list.length} songs from songs.json`);
      return list;
    } catch (err) {
      console.warn("Could not load songs.json — using demo songs.", err.message);
      return DEMO_SONGS;
    }
  },

  async search(query) {
    if (this.BASE_URL) {
      const res = await fetch(`${this.BASE_URL}/search?q=${encodeURIComponent(query)}`);
      return res.json();
    }
    const q = query.toLowerCase();
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(
          songs.filter(s =>
            s.title.toLowerCase().includes(q) ||
            s.artist.toLowerCase().includes(q) ||
            s.album.toLowerCase().includes(q)
          )
        );
      }, 200)
    );
  },
};

// Demo songs shown when songs.json is unavailable
const DEMO_SONGS = [
  { id: 1, title: "Choo Lo",                   artist: "The Local Train",          album: "Aalas Ka Pedh",         duration: 210, src: "./src/assets/songs/choo-lo.mp3",                        cover: "https://c.saavncdn.com/606/Aalas-Ka-Pedh-Hindi-2015-500x500.jpg" },
  { id: 2, title: "Raataan Lambiyan",           artist: "Jubin Nautiyal & Asees Kaur", album: "Shershaah",          duration: 230, src: "./src/assets/songs/Raataan Lambiyan.mp3",               cover: "./src/assets/images/Raataan-Lambiyan.jpeg" },
  { id: 3, title: "Tum Se Hi",                 artist: "Mohit Chauhan",            album: "Jab We Met",            duration: 323, src: "./src/assets/songs/Tum Se Hi.mp3",                      cover: "./src/assets/images/tum-se-hi.jpeg" },
  { id: 4, title: "Kesariya",                  artist: "Arijit Singh",             album: "Brahmastra",            duration: 268, src: "./src/assets/songs/Kesariya.mp3",                       cover: "./src/assets/images/kesariya.jpeg" },
  { id: 5, title: "Tujh Mein Rab Dikhta Hai", artist: "Roop Kumar Rathod",        album: "Rab Ne Bana Di Jodi",   duration: 284, src: "./src/assets/songs/Tujh Mein Rab Dikhta Hai.mp3",      cover: "./src/assets/images/Tujh-Mein-Rab-Dikhta-Hai.jpeg" },
  { id: 6, title: "Pehli Nazar Mein",          artist: "Atif Aslam",              album: "Race",                  duration: 314, src: "./src/assets/songs/Pehli Nazar Mein.mp3",               cover: "./src/assets/images/Pehli-Nazar-Mein.jpeg" },
  { id: 7, title: "Shayad",                    artist: "Arijit Singh",             album: "Love Aaj Kal",          duration: 248, src: "./src/assets/songs/Shayad.mp3",                         cover: "./src/assets/images/Shayad.jpeg" },
  { id: 8, title: "Chaleya",                   artist: "Arijit Singh & Shilpa Rao", album: "Jawan",               duration: 200, src: "./src/assets/songs/Chaleya.mp3",                        cover: "./src/assets/images/Chaleya.jpeg" },
];

// ─────────────────────────────────────────────────────────────
// DOM REFS
// ─────────────────────────────────────────────────────────────
const audio           = document.getElementById("audio");
const playBtn         = document.getElementById("play-btn");
const playIcon        = document.getElementById("play-icon");
const prevBtn         = document.getElementById("prev-btn");
const nextBtn         = document.getElementById("next-btn");
const shuffleBtn      = document.getElementById("btn-shuffle");
const repeatBtn       = document.getElementById("btn-repeat");
const likeBtn         = document.getElementById("btn-like");
const progressBar     = document.getElementById("progress-bar");
const volumeSlider    = document.getElementById("volumeSlider");
const currTimeEl      = document.getElementById("curr-time");
const totTimeEl       = document.getElementById("tot-time");
const songTitleEl     = document.getElementById("song-title");
const artistNameEl    = document.getElementById("artist-name");
const albumImgEl      = document.getElementById("album-img");
const albumPlaceEl    = document.getElementById("album-placeholder");
const muteBtn         = document.getElementById("btn-mute");
const volIcon         = document.getElementById("vol-icon");
const searchInput     = document.getElementById("search-input");
const searchResultsEl = document.getElementById("search-results");
const mainContent     = document.getElementById("main-content");
const homeSection     = document.getElementById("home-section");
const searchSection   = document.getElementById("search-section");
const sectionsContainer = document.getElementById("sections-container");
const greetingRow     = document.getElementById("greeting-row");
const quickPicks      = document.getElementById("quick-picks");
const playlistList    = document.getElementById("playlist-list");

// All nav buttons (sidebar + mobile bottom nav)
const allNavBtns = document.querySelectorAll("[data-section]");

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
let songs         = [];
let songIndex     = 0;
let isPlaying     = false;
let isShuffle     = false;
let repeatMode    = 0;   // 0 = off | 1 = all | 2 = one
let likedSongs    = new Set();
let prevVolume    = 0.7;
let searchDebounce = null;

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
async function init() {
  setGreeting();
  songs = await API.getSongs();
  renderQuickPicks();
  renderSections();
  renderPlaylistSidebar();
  loadSong(songIndex, false);
  audio.volume = parseFloat(volumeSlider.value);
  updateVolumeSliderFill();
}

// ─────────────────────────────────────────────────────────────
// GREETING
// ─────────────────────────────────────────────────────────────
function setGreeting() {
  const h = new Date().getHours();
  const text = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  greetingRow.innerHTML = `<h1>${text}</h1>`;
}

// ─────────────────────────────────────────────────────────────
// LOAD SONG
// ─────────────────────────────────────────────────────────────
function loadSong(index, autoPlay = true) {
  const song = songs[index];
  if (!song) return;

  audio.src            = song.src;
  songTitleEl.textContent  = song.title;
  artistNameEl.textContent = song.artist;

  if (song.cover) {
    albumImgEl.src           = song.cover;
    albumImgEl.style.display = "block";
    albumPlaceEl.style.display = "none";
  } else {
    albumImgEl.style.display   = "none";
    albumPlaceEl.style.display = "flex";
  }

  updateLikeBtn();

  if (autoPlay) {
    audio.play().catch(() => {});
    setPlaying(true);
  } else {
    setPlaying(false);
  }

  // Reset progress bar
  progressBar.value      = 0;
  updateProgressFill(0);
  currTimeEl.textContent = "0:00";
  totTimeEl.textContent  = formatTime(song.duration);

  // Highlight the active card
  document.querySelectorAll(".card.playing, .quick-pick-card.playing")
    .forEach(el => el.classList.remove("playing"));
  document.querySelectorAll(`[data-song-id="${song.id}"]`)
    .forEach(el => el.classList.add("playing"));
}

function setPlaying(state) {
  isPlaying        = state;
  playIcon.className = state ? "fa-solid fa-pause" : "fa-solid fa-play";
}

// ─────────────────────────────────────────────────────────────
// PLAY / PAUSE
// ─────────────────────────────────────────────────────────────
playBtn.addEventListener("click", () => {
  if (!songs.length) return;
  if (isPlaying) {
    audio.pause();
    setPlaying(false);
  } else {
    audio.play().catch(() => showToast("Add MP3 files to /src/assets/songs/"));
    setPlaying(true);
  }
});

// ─────────────────────────────────────────────────────────────
// NEXT / PREV
// ─────────────────────────────────────────────────────────────
nextBtn.addEventListener("click", playNext);

prevBtn.addEventListener("click", () => {
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
});

function playNext() {
  if (isShuffle) {
    let r;
    do { r = Math.floor(Math.random() * songs.length); }
    while (r === songIndex && songs.length > 1);
    songIndex = r;
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songIndex);
}

audio.addEventListener("ended", () => {
  if (repeatMode === 2) {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === 1 || songIndex < songs.length - 1) {
    playNext();
  } else {
    setPlaying(false);
    progressBar.value = 0;
    updateProgressFill(0);
  }
});

// ─────────────────────────────────────────────────────────────
// SHUFFLE & REPEAT
// ─────────────────────────────────────────────────────────────
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  showToast(isShuffle ? "Shuffle on" : "Shuffle off");
});

repeatBtn.addEventListener("click", () => {
  repeatMode = (repeatMode + 1) % 3;
  const icons  = ["fa-repeat", "fa-repeat", "fa-1"];
  const labels = ["Repeat off", "Repeat all", "Repeat one"];
  repeatBtn.querySelector("i").className = `fa-solid ${icons[repeatMode]}`;
  repeatBtn.classList.toggle("active", repeatMode > 0);
  showToast(labels[repeatMode]);
});

// ─────────────────────────────────────────────────────────────
// LIKE
// ─────────────────────────────────────────────────────────────
likeBtn.addEventListener("click", () => {
  const song = songs[songIndex];
  if (!song) return;
  if (likedSongs.has(song.id)) {
    likedSongs.delete(song.id);
    showToast("Removed from Liked Songs");
  } else {
    likedSongs.add(song.id);
    showToast("Added to Liked Songs");
  }
  updateLikeBtn();
});

function updateLikeBtn() {
  const song  = songs[songIndex];
  if (!song) return;
  const liked = likedSongs.has(song.id);
  likeBtn.classList.toggle("liked", liked);
  likeBtn.querySelector("i").className = liked ? "fa-solid fa-heart" : "fa-regular fa-heart";
}

// ─────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressBar.value      = pct;
  updateProgressFill(pct);
  currTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  totTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  const pct = parseFloat(progressBar.value);
  updateProgressFill(pct);
  if (audio.duration) audio.currentTime = (pct / 100) * audio.duration;
});

function updateProgressFill(pct) {
  progressBar.style.setProperty("--val", `${pct}%`);
}

// ─────────────────────────────────────────────────────────────
// VOLUME
// ─────────────────────────────────────────────────────────────
volumeSlider.addEventListener("input", () => {
  const val  = parseFloat(volumeSlider.value);
  audio.volume = val;
  prevVolume   = val > 0 ? val : prevVolume;
  updateVolumeUI(val);
});

muteBtn.addEventListener("click", () => {
  if (audio.volume > 0) {
    prevVolume       = audio.volume;
    audio.volume     = 0;
    volumeSlider.value = 0;
    updateVolumeUI(0);
  } else {
    audio.volume       = prevVolume;
    volumeSlider.value = prevVolume;
    updateVolumeUI(prevVolume);
  }
});

function updateVolumeUI(val) {
  updateVolumeSliderFill();
  volIcon.className =
    val === 0  ? "fa-solid fa-volume-xmark" :
    val < 0.4  ? "fa-solid fa-volume-low"   :
                 "fa-solid fa-volume-high";
}

function updateVolumeSliderFill() {
  const pct = parseFloat(volumeSlider.value) * 100;
  volumeSlider.style.setProperty("--val", `${pct}%`);
}

// ─────────────────────────────────────────────────────────────
// RENDER: QUICK PICKS
// ─────────────────────────────────────────────────────────────
function renderQuickPicks() {
  quickPicks.innerHTML = "";
  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "quick-pick-card";
    div.setAttribute("data-song-id", song.id);
    div.innerHTML = `
      <div class="quick-pick-img">
        <img
          src="${song.cover}"
          alt="${song.title}"
          onerror="this.parentElement.innerHTML='<i class=\\'fa-solid fa-music\\'></i>'"
        >
      </div>
      <span class="quick-pick-name">${song.title}</span>
      <button class="quick-pick-play" title="Play ${song.title}">
        <i class="fa-solid fa-play"></i>
      </button>
    `;
    div.querySelector(".quick-pick-play").addEventListener("click", e => {
      e.stopPropagation();
      songIndex = i;
      loadSong(songIndex);
    });
    div.addEventListener("click", () => { songIndex = i; loadSong(songIndex); });
    quickPicks.appendChild(div);
  });
}

// ─────────────────────────────────────────────────────────────
// RENDER: SECTIONS (skeleton → real data)
// ─────────────────────────────────────────────────────────────
async function renderSections() {
  sectionsContainer.innerHTML = "";

  // Skeleton placeholders
  for (let s = 0; s < 3; s++) {
    const sk = document.createElement("div");
    sk.style.marginBottom = "32px";
    sk.innerHTML = `
      <div class="section-header">
        <div class="skeleton" style="width:180px;height:24px;border-radius:4px;"></div>
      </div>
      <div class="cards-row">
        ${Array(5).fill(`
          <div class="card">
            <div class="skeleton" style="width:100%;aspect-ratio:1;border-radius:8px;margin-bottom:14px;"></div>
            <div class="skeleton" style="width:80%;height:14px;margin-bottom:6px;border-radius:3px;"></div>
            <div class="skeleton" style="width:60%;height:12px;border-radius:3px;"></div>
          </div>
        `).join("")}
      </div>
    `;
    sectionsContainer.appendChild(sk);
  }

  const sections = await API.getSections();
  sectionsContainer.innerHTML = "";

  sections.forEach((section, si) => {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="section-header">
        <h2>${section.title}</h2>
        <a href="#">Show all</a>
      </div>
      <div class="cards-row" id="section-row-${si}"></div>
    `;
    const row = wrap.querySelector(`#section-row-${si}`);

    section.items.forEach(item => {
      const card = document.createElement("div");
      card.className = `card${section.type === "artist" ? " artist" : ""}`;
      card.innerHTML = `
        <div class="card-img-wrap">
          <img src="${item.cover}" alt="${item.name}" class="card-img" onerror="this.style.display='none'">
          <button class="card-play-btn" title="Play ${item.name}">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
        <p class="card-title">${item.name}</p>
        <p class="card-info">${item.info}</p>
      `;
      const play = () => {
        songIndex = Math.floor(Math.random() * songs.length);
        loadSong(songIndex);
        showToast(`Playing: ${item.name}`);
      };
      card.querySelector(".card-play-btn").addEventListener("click", e => { e.stopPropagation(); play(); });
      card.addEventListener("click", play);
      row.appendChild(card);
    });

    sectionsContainer.appendChild(wrap);
  });
}

// ─────────────────────────────────────────────────────────────
// RENDER: PLAYLIST SIDEBAR
// ─────────────────────────────────────────────────────────────
function renderPlaylistSidebar() {
  playlistList.innerHTML = "";
  songs.forEach((song, i) => {
    const item = document.createElement("div");
    item.className = "playlist-item";
    item.setAttribute("data-song-id", song.id);
    item.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" onerror="this.src=''">
      <div class="playlist-item-info">
        <div class="playlist-item-name">${song.title}</div>
        <div class="playlist-item-meta">Song · ${song.artist}</div>
      </div>
    `;
    item.addEventListener("click", () => { songIndex = i; loadSong(songIndex); });
    playlistList.appendChild(item);
  });
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION  (sidebar + mobile bottom nav share one handler)
// ─────────────────────────────────────────────────────────────
function switchSection(section) {
  homeSection.style.display   = section === "home"   ? "block" : "none";
  searchSection.style.display = section === "search" ? "block" : "none";

  allNavBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.section === section));

  if (section === "search") setTimeout(() => searchInput.focus(), 100);
}

allNavBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    switchSection(btn.dataset.section);
  });
});

// ─────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────
searchInput.addEventListener("input", () => {
  clearTimeout(searchDebounce);
  const q = searchInput.value.trim();
  if (!q) { searchResultsEl.innerHTML = ""; return; }
  searchResultsEl.innerHTML = `<p style="color:var(--text-secondary);font-size:13px;">Searching…</p>`;
  searchDebounce = setTimeout(async () => {
    const results = await API.search(q);
    renderSearchResults(results, q);
  }, 300);
});

function renderSearchResults(results, q) {
  if (!results.length) {
    searchResultsEl.innerHTML = `<p style="color:var(--text-secondary);font-size:13px;">No results for "<strong>${q}</strong>"</p>`;
    return;
  }
  searchResultsEl.innerHTML = `<p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">Results for "<strong style="color:#fff">${q}</strong>"</p>`;
  results.forEach(song => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" onerror="this.style.display='none'">
      <div class="search-result-info">
        <div class="result-name">${song.title}</div>
        <div class="result-artist">${song.artist} · ${song.album}</div>
      </div>
      <span style="margin-left:auto;font-size:12px;color:var(--text-secondary)">${formatTime(song.duration)}</span>
    `;
    item.addEventListener("click", () => {
      const idx = songs.findIndex(s => s.id === song.id);
      if (idx >= 0) { songIndex = idx; loadSong(songIndex); }
    });
    searchResultsEl.appendChild(item);
  });
}

// ─────────────────────────────────────────────────────────────
// KEYBOARD SHORTCUTS
// ─────────────────────────────────────────────────────────────
document.addEventListener("keydown", e => {
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  switch (e.code) {
    case "Space":
      e.preventDefault();
      playBtn.click();
      break;
    case "ArrowRight":
      e.preventDefault();
      audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
      break;
    case "ArrowLeft":
      e.preventDefault();
      audio.currentTime = Math.max(0, audio.currentTime - 5);
      break;
    case "ArrowUp":
      e.preventDefault();
      audio.volume = Math.min(1, audio.volume + 0.05);
      volumeSlider.value = audio.volume;
      updateVolumeUI(audio.volume);
      break;
    case "ArrowDown":
      e.preventDefault();
      audio.volume = Math.max(0, audio.volume - 0.05);
      volumeSlider.value = audio.volume;
      updateVolumeUI(audio.volume);
      break;
    case "KeyN": nextBtn.click();    break;
    case "KeyP": prevBtn.click();    break;
    case "KeyM": muteBtn.click();    break;
    case "KeyS": shuffleBtn.click(); break;
  }
});

// ─────────────────────────────────────────────────────────────
// STICKY NAV SCROLL EFFECT
// ─────────────────────────────────────────────────────────────
mainContent.addEventListener("scroll", () => {
  document.querySelector(".sticky-nav")
    .classList.toggle("scrolled", mainContent.scrollTop > 10);
});

// ─────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
function formatTime(secs) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────
init();
