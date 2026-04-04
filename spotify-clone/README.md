# Spotify Clone 🎵

A responsive Spotify web player clone built with pure HTML, CSS, and JavaScript.

## Folder Structure

```
spotify-clone/
├── index.html          ← Main HTML file
├── style.css           ← All styles + responsive breakpoints
├── script.js           ← All JavaScript logic
├── songs.json          ← Song data (edit this to add/change songs)
├── firebase.json       ← Firebase hosting config
├── .gitignore
└── src/
    └── assets/
        ├── songs/      ← Put your .mp3 files here
        │   ├── choo-lo.mp3
        │   ├── Raataan Lambiyan.mp3
        │   └── ... (other mp3s)
        └── images/     ← Put your album cover images here
            ├── Raataan-Lambiyan.jpeg
            ├── kesariya.jpeg
            └── ... (other images)
```

## How to Add Songs

1. Place your `.mp3` files in `src/assets/songs/`
2. Place album cover images in `src/assets/images/`
3. Edit `songs.json` to add entries:

```json
{
  "id": 9,
  "title": "Song Name",
  "artist": "Artist Name",
  "album": "Album Name",
  "duration": 240,
  "src": "./src/assets/songs/song-name.mp3",
  "cover": "./src/assets/images/cover.jpeg"
}
```

## Responsive Breakpoints

| Screen Size         | Layout                                      |
|---------------------|---------------------------------------------|
| > 1024px (Desktop)  | Full sidebar with labels, all controls      |
| ≤ 1024px (Laptop)   | Icon-only sidebar (72px)                    |
| ≤ 768px  (Tablet)   | No sidebar, bottom navigation bar           |
| ≤ 480px  (Phone)    | Compact player, 2-col quick picks           |
| ≤ 360px  (Small)    | 1-col quick picks                           |

## Keyboard Shortcuts

| Key          | Action          |
|--------------|-----------------|
| Space        | Play / Pause    |
| N            | Next song       |
| P            | Previous song   |
| M            | Mute / Unmute   |
| S            | Toggle shuffle  |
| Arrow Right  | Seek +5s        |
| Arrow Left   | Seek -5s        |
| Arrow Up     | Volume up       |
| Arrow Down   | Volume down     |

## Deploy to Firebase

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```
