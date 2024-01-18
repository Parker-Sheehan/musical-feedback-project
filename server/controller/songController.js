import { Review, Song, User, UserGenre } from "../../database/model";

const createNewSong = async (req, res) => {
  console.log(req.params.userId);
  console.log(req.body);
  console.log("hit create new song");

  let { title, embeddedLink, genre } = req.body;

  if (req.session.email) {
    try {
      const newSong = await Song.create({
        userId: req.params.userId,
        title: title,
        embeddedLink: embeddedLink,
        genre: genre,
      });

      console.log(newSong);
      res.send("yay");
    } catch (err) {
      res.send(err, "error");
    }
  } else {
    res.send("you need to log in");
  }

};

const getSong = async (req, res) => {
  console.log("hit getSong")
  console.log(req.params)
  let {songId} = req.params
  let song = await Song.findByPk(songId, {
    include: [
      {
        model: User
      }
    ]
  })
  res.send(song)
}

const getRandomSong = async (req,res) => {
  console.log("hit getRandomSong")
  console.log(req.params)
  let {userId} = req.params
  // need to create array of song ID that can't be chosen using songs reviewed by user and songs created by user
  // also need to use genre array to make sure song chosen is within the genres chosen by user
  // also also need to make sure it priotitizes lowest review count
  let alreadyReviewed = await Review.findAll({
    where: {
      userId: userId
    },
    attributes: ["songId"]
  })

  let songsCreated = await Song.findAll({
    where: {
      userId: userId
    },
    attributes: ["songId"]
  })

  let genresToPickFrom = await UserGenre.findAll({
    where: {
      userId: userId
    },
    attributes: ["genreId"]
  })

  console.log(songsCreated, alreadyReviewed, genresToPickFrom)

  let songNotToPick = songsCreated.concat(alreadyReviewed).map((song)=> {
    return song.songId
  })

  let destructuredGenresArray = genresToPickFrom.map((genre) => {
    return genre.genreId
  })

  console.log(songNotToPick, destructuredGenresArray)

  

  res.send("yay")
}



const viewSong = async (req, res) => {
  console.log(req.params.userId);
  console.log(req.body);
};



export { createNewSong, getSong, getRandomSong };
