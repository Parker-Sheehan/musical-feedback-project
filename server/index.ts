// @ts-ignore
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

interface SongInfo {
  id: number;
  title: string;
  link: string;
  albumArt: string;
}

interface ReviewInfo {
  id: number;
  reviewFor: number;
  author: string;
  totalScore: number;
  overallThoughts: string;
  musicalityScore: number;
  musicalityThoughts: string;
  grooveScore: number;
  grooveThoughts: string;
  soundDesignScore: number;
  soundDesignThoughts: string;
  arrangmentScore: number;
  arrangmentThoughts: string;
  mixMasterScore: number;
  mixMasterThoughts: string;
}

let arrayOfSongs: SongInfo[] = [
  {
    id: 1,
    title: "Angel Voices",
    link: "https://soundcloud.com/porter-robinson/virtual-self-angel-voices?si=9c5cab65a33f4de49aac720d08f4a82b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    albumArt:
      "https://i.scdn.co/image/ab6761610000e5ebd8b3a3a7c3fe3e6cfd835e46",
  },
  {
    id: 2,
    title: "Good Space",
    link: "https://soundcloud.com/skrillex/skrillex-starrah-good-space?si=82c4420afdcb44e581dfa65b7f70a403&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    albumArt:
      "https://media.pitchfork.com/photos/63ee3b25a6c6ccc33ce86c05/1:1/w_600/Skrillex-Quest-for-Fire.jpg",
  },
  {
    id: 3,
    title: "moment",
    link: "https://soundcloud.com/vierrecloud/moment-1?si=82c4420afdcb44e581dfa65b7f70a403&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b273716278881a0a609adf14ffc5",
  },
];

let arrayOfReviews: ReviewInfo[] = [
  {
    id: 1,
    reviewFor: 1,
    author: "Skrillex",
    totalScore: 3.8,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 2,
    reviewFor: 1,
    author: "Porter Robinson",
    totalScore: 3.2,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 3,
    reviewFor: 2,
    author: "Galantis",
    totalScore: 4.8,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 4,
    reviewFor: 2,
    author: "Skrillex",
    totalScore: 3.1,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 5,
    reviewFor: 2,
    author: "Porter Robinson",
    totalScore: 3.5,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 6,
    reviewFor: 2,
    author: "Virtual Self",
    totalScore: 4.7,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 7,
    reviewFor: 2,
    author: "Subtronics",
    totalScore: 2.8,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 8,
    reviewFor: 3,
    author: "Porter Robinson",
    totalScore: 3.9,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 9,
    reviewFor: 3,
    author: "SolRaKing",
    totalScore: 4.2,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 8,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
];

app.get("/getSongs", (req, res) => {
  console.log("in getSongs");
  res.send(arrayOfSongs);
});

// app.post('/postSong', (req,res) => {
//     console.log(req.body)
//     arrayOfSongs.push(req.body)

//     res.send(arrayOfSongs)
// })

app.put("/getCritique/:ID", (req, res) => {
  console.log(req.params.ID);
  let filteredReviews = arrayOfReviews.filter((review) => {
    if (review.reviewFor === +req.params.ID) {
      return review;
    }
  });
  // console.log(arrayOfSongs)
  res.send(filteredReviews);
});

// http://localhost:3000/getSong/${id}


app.put("/getSong/:id", (req, res) => {
  let songInfo = arrayOfSongs.filter((song) => {
    console.log(song.id, req.params.id);
    if (song.id === +req.params.id) {
      console.log("yyyayyyayy");
      return song;
    }
  });
  console.log(songInfo);
  res.send(songInfo[0]);
});

app.put("/getReview/:id", (req, res) => {
  let reviewInfo = arrayOfReviews.filter((song) => {
    console.log(req.params.id);
    if (song.id === +req.params.id) {
      console.log("yyyayyyayy");
      return song;
    }
  });
  console.log(reviewInfo);
  res.send(reviewInfo[0]);
});

// app.delete('/deleteSong/:song', (req,res) => {
//     let songTitle = req.params.song
//     let newArray = arrayOfSongs.filter((song) => {
//         if(song.songTitle !== songTitle){
//             return song
//         }
//     })

//     arrayOfSongs = newArray

//     res.send(arrayOfSongs)
// })

server.listen(3000, console.log("listening on port 3000"));
