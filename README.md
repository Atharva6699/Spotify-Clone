# 🎵 Spotify Clone Web Player

A dynamic, fully functional web-based music player built from scratch using Vanilla JavaScript, HTML, and CSS. This project mimics the core UI and functionality of Spotify, featuring a custom audio player, dynamic data fetching, and an integrated navigation system.

## ✨ Features
* **Custom Audio Player:** Play, pause, skip, and rewind tracks with a fully functional progress bar and volume controls.
* **Dynamic UI Rendering:** Playlists, artist cards, and track lists are generated dynamically via JavaScript by fetching data from a custom local `songs.json` database.
* **Artist Deep-Dives:** Click on an artist card to instantly filter the database and view a dedicated page of their top tracks.
* **Custom Navigation Router:** Features a built-in history manager allowing users to use "Back" and "Forward" arrows to seamlessly navigate between the Home, Search, and Artist screens without refreshing the page.
* **Live Search:** Instantly filter the song database by title, artist, or album.
* **Keyboard Shortcuts:** Control playback (Spacebar), skip tracks (N/P), volume (Up/Down arrows), and mute (M) using your keyboard.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Data Storage:** JSON (Simulating a backend REST API response)

## 🚀 How to Run Locally

Because this application uses the JavaScript `fetch()` API to load the local `songs.json` file, it must be run through a local web server to avoid browser CORS (Cross-Origin Resource Sharing) security errors. 

1. **Clone this repository** to your local machine:
   ```bash
   git clone [https://github.com/Atharva6699/Spotify-Clone.git](https://github.com/Atharva6699/Spotify-Clone.git)