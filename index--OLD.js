import fetch from "node-fetch";
import fs from "fs";
import pug from "pug";

const trackLog = (track, full = false) => {
  if (full) {
    console.log(track);
  } else {
    console.log(
      `Name: ${track.snippet.title}, Link: https://www.youtube.com/watch?v=${track.snippet.resourceId.videoId}, Thumbnail: ${track.snippet.thumbnails.medium.url}`
    );
  }
};

// const html = pug.renderFile("./index.pug", { pretty: true });
// fs.writeFileSync("pug_test.html", html);

(async () => {
  try {
    let html = "<html><head><title>youtube trax scrape</title>";

    html += `<style>
    body {
        background-color: #bbb;
        font-family: sans-serif;
        color: #666;
    }
    table {
        font-size: 11px;
    }
    img {
        width: 50px;
        height: auto;
    }
    </style>`;

    html += "<body><table><tbody>";

    const params = new URLSearchParams({
      playlistId: "PLB9B0774DDF57CFAB",
      key: "AIzaSyD5UqPULDxbVVzi05fQImaKeRXlVCELb9o",
      maxResults: 3,
      part: "snippet",
    });

    const res = await fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?" + params
    );
    const data = await res.json();
    const tracks = data.items;

    for (const track of tracks) {
      trackLog(track, true);
      html += "<tr>";
      html += `<td><img src="${track.snippet.thumbnails.medium.url}" /></td>`;
      html += `<td>${track.snippet.title}</td>`;
      html += `<td><a href="https://www.youtube.com/watch?v=${track.snippet.resourceId.videoId}" target="_blank">Link</td>`;
      html += "</tr>";
    }
    html += "</tbody></table></body></html>";
    // fs.writeFileSync(new Date().getTime().toString() + ".html", html);
  } catch (err) {
    console.log(err.message); //can be console.error
  }
})();
