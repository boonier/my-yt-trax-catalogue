import fetch from "node-fetch";
import fs from "fs";
import pug from "pug";
import dotenv from "dotenv";

dotenv.config();

const trackLog = (track, full = false) => {
  if (full) {
    console.log(track);
  } else {
    console.log(
      `Name: ${track.snippet.title}, Link: https://www.youtube.com/watch?v=${track.snippet.resourceId.videoId}, Thumbnail: ${track.snippet.thumbnails.medium.url}`
    );
  }
};

(async () => {
  try {
    const params = new URLSearchParams({
      playlistId: process.env.PLAYLIST_ID,
      key: process.env.YT_KEY,
      maxResults: 300,
      part: "snippet",
    });

    const res = await fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?" + params
    );

    const data = await res.json();
    const tracks = data.items;

    // console.log(tracks.length);
    // for (let track of tracks) {
    //   trackLog(track);
    // }

    const html = pug.renderFile("./index.pug", {
      pretty: true,
      tracks: tracks,
      title: "yt trax scrape",
      date: new Date().toLocaleDateString("de-DE"),
    });

    fs.writeFileSync("index.html", html);
  } catch (err) {
    console.log(err.message); //can be console.error
  }
})();
