import axios from "axios";
import { User, Song, Review, Genre, UserGenre, SongGenre} from "../database/model.js";

console.log("Syncing Database...");

console.log("Seeding database...");

let genreArray = [
  "Drum and Bass",
  "Trap",
  "House",
  "Dubstep",
  "Techno",
  "Bass",
  "Experimental",
  "Trance",
  "Hard Dance",
  "Breakbeat"
]

let arrayOfSongs = [
  {
    id: 1,
    userId: 1,
    title: "Angel Voices",
    artLink: "https://i1.sndcdn.com/artworks-000377038188-z3jm7h-t500x500.jpg",
    embeddedLink:
      "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F474445329",
  },
  {
    id: 2,
    userId: 2,
    title: "Good Space",
    artLink:
      "https://i1.sndcdn.com/artworks-ylbfQTWEvsleLDep-6oWVdA-t500x500.jpg",
    embeddedLink:
      "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1448872240",
  },
  {
    id: 3,
    userId: 3,
    title: "moment",
    artLink: "https://i1.sndcdn.com/artworks-000572434217-zrbos8-t500x500.jpg",
    embeddedLink:
      "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F656099120",
  },
];

let arrayOfReviews = [
  {
    id: 2,
    reviewer: 2,
    reviewee: 1,
    song_id: 1,
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
    reviewer: 3,
    reviewee: 2,
    song_id: 2,
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
    reviewer: 5,
    reviewee: 2,
    song_id: 2,
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
    reviewer: 4,
    reviewee: 2,
    song_id: 2,
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
    reviewer: 1,
    reviewee: 2,
    song_id: 2,
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
    reviewer: 2,
    reviewee: 3,
    song_id: 3,
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
    reviewer: 5,
    reviewee: 3,
    song_id: 3,
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
    reviewer: 4,
    reviewee: 3,
    song_id: 3,
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

export const seed = async () => {
  genreArray.forEach(async (genre) => {
    await Genre.create({
      genreName: genre
    })
  })

  for (let i = 0; i < 5; i++) {
    await User.create({
      displayName: `dude${i}`,
      email: `test${i}`,
      password: `test${i}`,
      profilePicture:
        "https://i.pinimg.com/originals/50/f0/c3/50f0c3351809f62d2d8d3fe255a72fa5.jpg",
      songInReview: 1,
    });
  }

  for(let i = 0; i< 5; i++){
    let randomGenres = [i+1,i+2,i+3]
    for(let j = 0; j< 3; j++){
      await UserGenre.create({
        userId: i+1,
        genreId: randomGenres[j]
      })
    }
  }

  for (let i = 0; i < 3; i++) {
    arrayOfSongs.forEach( async (song) => {
       await Song.create({
        title: song.title + " " + i,
        embeddedLink: song.embeddedLink,
        userId: i + 1,
      });
    });
  }

  for (let i = 0; i < 9; i++){
    let randomGenres = [i+1,i+2]
    for(let j = 0; j< 2; j++){
      await SongGenre.create({
        songId: i+1,
        genreId: randomGenres[j]
      })
    }
  }

  let total;
  let arrOfScores = [];

  const createRandomScores = () => {
    total = 0;
    arrOfScores = [];

    for (let i = 0; i < 5; i++) {
      let num = Math.ceil(Math.random() * 5);
      total += num;
      arrOfScores.push(num);

    }
  };


  for(let i = 0; i < arrayOfReviews.length; i++){
    console.log("beginning of for each ================================")

    createRandomScores()

    await Review.create({
      // foreign keys of reviewer reviewee and song_id not included yet
      author: arrayOfReviews[i].author,
      totalScore: total / 5,
      overallThoughts: arrayOfReviews[i].overallThoughts,
      musicalityScore: arrOfScores[0],
      musicalityThoughts: arrayOfReviews[i].musicalityThoughts,
      grooveScore: arrOfScores[1],
      grooveThoughts: arrayOfReviews[i].grooveThoughts,
      soundDesignScore: arrOfScores[2],
      soundDesignThoughts: arrayOfReviews[i].soundDesignThoughts,
      arrangmentScore: arrOfScores[3],
      arrangmentThoughts: arrayOfReviews[i].arrangmentThoughts,
      mixMasterScore: arrOfScores[4],
      mixMasterThoughts: arrayOfReviews[i].mixMasterThoughts,
      userId: +arrayOfReviews[i].reviewer,
      songId: arrayOfReviews[i].song_id,
    });

    console.log(arrayOfReviews[i].reviewee, arrayOfReviews[i].grooveThoughts, arrOfScores[1])


    console.log("end of for each ================================")
 }

};

console.log("Finished seeding database!");
