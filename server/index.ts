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
  userId: number;
  artLink: string;
  embeddedLink: string;
  title: string;
  genre: string;
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

interface UserInfo {
  id: number;
  displayName: string;
  username: string;
  password: string;
  profilePicture: string;
  songInReview: number;
  genres: string[];
}

interface HasReviewed {
  id: number;
  userId: number;
  songId: number;
}

let arrayOfSongs: SongInfo[] = [
  {
    id: 1,
    userId: 1,
    title: "Angel Voices",
    artLink: "https://i1.sndcdn.com/artworks-000377038188-z3jm7h-t500x500.jpg",
    embeddedLink: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F474445329",
    genre: "edm",
  },
  {
    id: 2,
    userId: 2,
    title: "Good Space",
    artLink: "https://i1.sndcdn.com/artworks-ylbfQTWEvsleLDep-6oWVdA-t500x500.jpg",
    embeddedLink: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1448872240",
    genre: "trap",
  },
  {
    id: 3,
    userId: 3,
    title: "moment",
    artLink: "https://i1.sndcdn.com/artworks-000572434217-zrbos8-t500x500.jpg",
    embeddedLink: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F656099120",
    genre: "drum and bass",
  },
];

let arrayOfUsers: UserInfo[] = [
  {
    id: 1,
    displayName: "fabio",
    username: "test",
    password: "test",
    profilePicture:
      "https://i.pinimg.com/originals/50/f0/c3/50f0c3351809f62d2d8d3fe255a72fa5.jpg",
    songInReview: 0,
    genres: ["trap", "drum and bass", "edm"],
  },
  {
    id: 2,
    displayName: "ronny",
    username: "test",
    password: "test",
    profilePicture:
      "https://i.pinimg.com/originals/50/f0/c3/50f0c3351809f62d2d8d3fe255a72fa5.jpg",
    songInReview: 0,
    genres: ["trap", "drum and bass", "edm"],
  },
  {
    id: 3,
    displayName: "jayjay",
    username: "test",
    password: "test",
    profilePicture:
      "https://i.pinimg.com/originals/50/f0/c3/50f0c3351809f62d2d8d3fe255a72fa5.jpg",
    songInReview: 0,
    genres: ["trap", "drum and bass", "edm"],
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
    arrangmentScore: 4,
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
    arrangmentScore: 4,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 3,
    reviewFor: 2,
    author: "Galantis",
    totalScore: 4.4,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 4,
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
    arrangmentScore: 4,
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
    arrangmentScore: 4,
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
    arrangmentScore: 4,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
  {
    id: 7,
    reviewFor: 2,
    author: "Subtronics",
    totalScore: 2.4,
    overallThoughts: "Whao song so cool",
    musicalityScore: 4,
    musicalityThoughts: "I like melody so fun happy bubbly",
    grooveScore: 5,
    grooveThoughts: "super groovy hoppy drums yay",
    soundDesignScore: 2,
    soundDesignThoughts: "crunchy munchy",
    arrangmentScore: 4,
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
    arrangmentScore: 4,
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
    arrangmentScore: 4,
    arrangmentThoughts: "great arrangment like the story",
    mixMasterScore: 2,
    mixMasterThoughts: "mix awesome stuff in cool places spacius",
  },
];

let hasReviewedArray: HasReviewed[] = [
  {
    id: 1,
    userId: 2,
    songId: 1,
  },
  {
    id: 2,
    userId: 2,
    songId: 2
  },
  {
    id: 3,
    userId: 1,
    songId: 3
  }
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

app.post("/createNewSong/:id", (req,res) => {

  let {id} = req.params
  let {body} = req

  let nextId = arrayOfSongs.slice(-1)[0].id + 1

  let newSong : SongInfo = {
    id: nextId,
    userId: id,
    title: body.title,
    artLink: body.artLink,
    embeddedLink: body.embeddedLink,
    genre: body.genre,
  }

  arrayOfSongs.push(newSong)

})

app.post("/getRandomSong/:id", (req, res) => {
  let userId = req.params.id;
  let user = arrayOfUsers.filter((currentUser) => {
    if (currentUser.id === +userId) {
      return currentUser;
    }
  });
  if (user[0].songInReview !== 0) {
    console.log("send user song in review");
    const song = arrayOfSongs.filter((song) => {
      if (song.id === user[0].songInReview) {
        return song;
      }
    })[0];
    res.send(song);
  } else {
    let userHasReviewed = hasReviewedArray.filter((hasReviewed) => {
      if(hasReviewed.userId === user[0].id){
        return hasReviewed
      }
    })
    // console.log(userHasReviewed, 'useHasReviewed')
    let userHasReviewedSongIdArray: number[] = []
    userHasReviewed.forEach((song) => {
      userHasReviewedSongIdArray.push(song.id)
    })
    console.log(userHasReviewedSongIdArray, "user has review these")
    let usersSongsArray = arrayOfSongs.filter((song) => {
      if(song.userId === user[0].id){
        return song
      }
    })
    // console.log(usersSongsArray, "user made these")
    let usersSongsIdArray : number[] = []
    usersSongsArray.forEach((song) => {
      usersSongsIdArray.push(song.id)
    })
    console.log(usersSongsIdArray, "user made these ID")
    let randomIndex = Math.floor(Math.random() * arrayOfSongs.length);
    console.log(`random index was ${randomIndex}`)
    while(userHasReviewedSongIdArray.includes(randomIndex + 1) || usersSongsIdArray.includes(randomIndex+1)){
      randomIndex = Math.floor(Math.random() * arrayOfSongs.length)
      console.log(randomIndex, "this should end on a viable index")
    }
    console.log(randomIndex);
    let randomSong = arrayOfSongs[randomIndex];
    console.log(randomSong)

    user[0].songInReview = randomSong.id;
    res.send(randomSong);
  }

  // on review submit set song in review to 0 to reset

});

app.post("/createSong",(req,res) =>{

})

server.listen(3000, console.log("listening on port 3000"));
