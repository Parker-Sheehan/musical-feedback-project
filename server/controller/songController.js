import { Op } from "sequelize";
import {
  Genre,
  Review,
  Song,
  SongGenre,
  User,
  UserGenre,
} from "../../database/model";

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
  console.log("hit getSong");
  console.log(req.params);
  let { songId } = req.params;
  let song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
      },
    ],
  });
  res.send(song);
};

const getRandomSong = async (req, res) => {
  console.log("hit getRandomSong");
  console.log(req.params);
  let { userId } = req.params;
  // need to create array of song ID that can't be chosen using songs reviewed by user and songs created by user
  // also need to use genre array to make sure song chosen is within the genres chosen by user
  // also also need to make sure it priotitizes lowest review count
  let alreadyReviewed = await Review.findAll({
    where: {
      reviewByUserId: userId,
    },
    attributes: ["songId"],
  });

  let songsCreated = await Song.findAll({
    where: {
      userId: userId,
    },
    attributes: ["songId"],
  });

  let genresToPickFrom = await UserGenre.findAll({
    where: {
      userId: userId,
    },
    attributes: ["genreId"],
  });

  console.log(songsCreated, alreadyReviewed, genresToPickFrom);

  let songNotToPick = songsCreated.concat(alreadyReviewed).map((song) => {
    return song.songId;
  });

  let destructuredGenresArray = genresToPickFrom.map((genre) => {
    return genre.genreId;
  });

  console.log(songNotToPick, destructuredGenresArray);

  let newSongArray = await Song.findAll({
    where: {
      songId: { [Op.notIn]: songNotToPick },
      reviewToken: { [Op.ne]: 0 },
    },
    include: [
      {
        model: Genre,
        through: SongGenre,
        where: {
          genreId: destructuredGenresArray,
        },
      },
      {
        model: User,
      },
    ],
  });

  console.log(newSongArray, "potential songs");

  let randomNumMultiplyer = newSongArray.reduce(
    (accumulator, song) => song.reviewToken + accumulator,
    0
  );

  console.log(randomNumMultiplyer, "random number mult");

  let randomNum = Math.ceil(Math.random() * randomNumMultiplyer);

  console.log(randomNum, "random number");
  let currentTokenCount = 0;
  for (let i = 0; i < newSongArray.length; i++) {
    console.log(newSongArray[i], i);
    currentTokenCount += newSongArray[i].reviewToken;
    console.log(currentTokenCount);
    if (currentTokenCount >= randomNum) {
      await User.update(
        { songInReview: newSongArray[i].songId },
        { where: { userId: userId } }
      );
      await Song.update(
        { reviewToken: newSongArray[i].reviewToken - 1 },
        { where: { songId: newSongArray[i].songId } }
      );
      console.log(newSongArray[i], "updatedSong");
      res.send(newSongArray[i]);

      return newSongArray[i];
    }
  }

  // console.log(newSongArray, "new song")
};

const getSongProfileInfo = async (req, res) => {
  console.log("hit getSongProfileInfo");
  console.log(req.params);
  let { songId } = req.params;
  let song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
      },
      {
        model: Review,
        where: {
          songId: songId,
        },
      },
    ],
  });
  console.log(song);
  res.send(song);
};

const postCritique = async (req, res) => {
  console.log(req.params.userId);
  let userId = req.params
  console.log(userId)
  console.log(req.body);
  let {
    arrangmentScore,
    arrangmentText,
    mixScore,
    mixText,
    musicalityScore,
    musicalityText,
    overallScore,
    overallText,
    rhythmScore,
    rhythmText,
    soundDesignScore,
    soundDesignText,
  } = req.body;

  let newReview = await Review.create({
    author: +userId,
    arrangmentScore,
    arrangmentText,
    mixScore,
    mixText,
    musicalityScore,
    musicalityText,
    overallScore,
    overallText,
    rhythmScore,
    rhythmText,
    soundDesignScore,
    soundDesignText,
  });
};

export {
  createNewSong,
  getSong,
  getRandomSong,
  getSongProfileInfo,
  postCritique,
};
