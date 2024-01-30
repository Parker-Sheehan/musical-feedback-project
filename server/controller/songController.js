import { Op, Sequelize } from "sequelize";
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
        genre: genre
      });

      console.log(genre)
      console.log("making song 1")

      newSong.addGenre(genre)

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
      songReviewToken: { [Op.ne]: 0 },
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
    (accumulator, song) => song.songReviewToken + accumulator,
    0
  );

  console.log(randomNumMultiplyer, "random number mult");

  let randomNum = Math.ceil(Math.random() * randomNumMultiplyer);

  console.log(randomNum, "random number");
  let currentTokenCount = 0;
  for (let i = 0; i < newSongArray.length; i++) {
    console.log(newSongArray[i], i);
    currentTokenCount += newSongArray[i].songReviewToken;
    console.log(currentTokenCount);
    if (currentTokenCount >= randomNum) {
      await User.update(
        { songInReview: newSongArray[i].songId },
        { where: { userId: userId } }
      );
      await Song.update(
        { songReviewToken: newSongArray[i].songReviewToken - 1 },
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
  try{
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
          include: [
            {
              as: "reviewBy",
              model: User,
            },
          ],
        },
      ],
    });
    console.log(song, "first")
    if(song === null){
      song = await Song.findByPk(songId, {
        include: [
          {
            model: User
          }
        ]
      })
      
    }
    console.log(song, "second")
    res.send(song)

  }catch(err){
    res.send(err, "something broke in songControler 188")
  }
  // console.log(song.reviews, "song");
  // res.send(song);
};

const postCritique = async (req, res) => {
  try {
    console.log(req.params.userId);
    let { userId } = req.params;
    console.log(userId);
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
      reviewForId,
      songId,
    } = req.body;

    console.log(userId);

    let newReview = await Review.create({
      reviewByUserId: +userId,
      reviewForUserId: +reviewForId,
      songId: +songId,
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

    // await User.increment("userReviewToken", { where: { userId: +userId } });
    let user = await User.update(
      {
        userReviewToken: Sequelize.literal("user_review_token + 1"),
        songInReview: 0,
      },
      { where: { userId: +userId } }
    );
    console.log(user);

    // console.log(newReview);
    res.send("success");
  } catch (err) {
    res.send(err, "error");
  }
};

export {
  createNewSong,
  getSong,
  getRandomSong,
  getSongProfileInfo,
  postCritique,
};
