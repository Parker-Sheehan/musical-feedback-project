import { Op, Sequelize } from "sequelize";
import {
  Genre,
  Review,
  Song,
  SongGenre,
  User,
  UserGenre,
  SongLikes,
} from "../../database/model";

const createNewSong = async (req, res) => {
  console.log(req.params.userId);
  console.log(req.body);
  console.log("hit create new song");

  let { title, embeddedLink, genre, artistQuestion } = req.body;

  console.log(artistQuestion);

  if (req.session.email) {
    try {
      const newSong = await Song.create({
        userId: req.params.userId,
        title: title,
        embeddedLink: embeddedLink,
        genre: genre,
        artistQuestion: artistQuestion,
      });

      let user = await User.update(
        {
          userReviewToken: Sequelize.literal("user_review_token - 1"),
          songInReview: 0,
        },
        { where: { userId: req.params.userId } }
      );

      console.log(user);

      console.log(genre);
      console.log("making song 1");

      newSong.addGenre(genre);

      res.send("yay");
    } catch (err) {
      res
        .status(400)
        .send(
          "Are you sure this your song? It seems somebody's already posted this."
        );
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

const getRandomSong = async (userId) => {
  console.log("hit getRandomSong");
  // console.log(req.params);
  // let { userId } = req.params;
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

  if (newSongArray[0] === undefined) {
    return newSongArray[0]
  }

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
      console.log(newSongArray[i], "updatedSong");
      return(newSongArray[i]);

      // return newSongArray[i];
    }
  }

  // console.log(newSongArray, "new song")
};

const getReviewSong = async (req, res) => {
  let { userId } = req.params;

  let userInfo = await User.findOne({
    where: {
      userId: userId,
    },
  });

  if(userInfo.songInReview === 0){
    let reviewSong = await getRandomSong(userId)
    console.log(reviewSong, "review Song")
    if(reviewSong !== undefined){
      await User.update({songInReview : reviewSong.songId},{where: {userId : userId}})
      res.status(200).send(reviewSong)
    }else{
      res.status(400).send("No songs to critique in specified genres, try expanding genre selection")
    }
  }else{
    let song = await Song.findByPk(userInfo.songInReview, {
      include: [
        {
          model: User,
        },
      ],
    });
    console.log(song,"this is song in else")
    res.status(200).send(song)

  }
};

const getSongProfileInfo = async (req, res) => {
  console.log("hit getSongProfileInfo");
  console.log(req.params);
  let { songId } = req.params;
  try {
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
    console.log(song, "first");
    if (song === null) {
      song = await Song.findByPk(songId, {
        include: [
          {
            model: User,
          },
        ],
      });
    }
    console.log(song, "second");
    res.send(song);
  } catch (err) {
    res.send(err, "something broke in songControler 188");
  }
  // console.log(song.reviews, "song");
  // res.send(song);
};

const postCritique = async (req, res) => {
  try {
    // console.log(req.params.userId);
    let { userId } = req.params;
    // console.log(userId);
    // console.log(req.body);
    let {
      aestheticCritique,
      technicalCritique,
      artistCritique,
      reviewForId,
      songId,
    } = req.body;

    console.log(userId);

    let newReview = await Review.create({
      reviewByUserId: +userId,
      reviewForUserId: +reviewForId,
      songId: +songId,
      aestheticCritique,
      technicalCritique,
      artistCritique,
    });

    // await User.increment("userReviewToken", { where: { userId: +userId } });
    let user = await User.update(
      {
        userReviewToken: Sequelize.literal("user_review_token + 1"),
        songInReview: 0,
      },
      { where: { userId: +userId } }
    );
    // console.log(user);

    console.log("rah");

    // try{
    const [rowsAffected, updatedSongs] = await Song.update(
      {
        songReviewToken: Sequelize.literal("song_review_token - 1"),
      },
      {
        where: {
          songId: +songId,
          songReviewToken: { [Sequelize.Op.gt]: 0 },
        },
        returning: true,
      }
    );

    console.log("rah");

    console.log(updatedSongs, "raaaaah");

    try {
      if (updatedSongs[0].songReviewToken === 0) {
        console.log("inside update song in review");
        await User.update(
          {
            songInReview: 0,
          },
          { where: { songInReview: +songId } }
        );
      }
    } catch {
      console.log("already set stuff to 0");
    }

    res.send("success");
  } catch (err) {
    res.status(400).send(err, "error");
  }
};

const getReviewInfo = async (req, res) => {
  console.log(req.params.reviewId);
  let { reviewId } = req.params;
  try {
    let reviewInfo = await Review.findByPk(reviewId, {
      include: [
        {
          model: Song,
        },
        {
          model: User,
          as: "reviewFor",
        },
        {
          model: User,
          as: "reviewBy",
        },
      ],
    });

    console.log(reviewInfo);

    res.send(reviewInfo);
  } catch (err) {
    res.send(err, "invalid reviewId");
  }
};

const addTokenToSong = async (req, res) => {
  let { songId } = req.params;
  let { userId } = req.body;
  console.log(songId);
  console.log("add token hit");

  try {
    let song = await Song.update(
      {
        songReviewToken: Sequelize.literal("song_review_token + 1"),
      },
      { where: { songId: req.params.songId } }
    );

    let user = await User.update(
      {
        userReviewToken: Sequelize.literal("user_review_token - 1"),
      },
      { where: { userId: userId } }
    );

    console.log(song, "song");
    console.log(user, "user");

    res.send(song);
  } catch {
    console.log("failed");
    res.send("failure");
  }
};

const submitCritiqueScore = async (req, res) => {
  let { reviewId, critiqueScore } = req.body;
  await Review.update(
    {
      critiqueScore: critiqueScore,
    },
    {
      where: { reviewId: reviewId },
    }
  );
};

const likeSong = async (req, res) => {
  console.log(req.body);
  let { userId, songId, likeStatus } = req.body;
  let result;
  if (likeStatus) {
    result = await SongLikes.destroy({
      where: {
        [Op.and]: [{ userId: userId }, { songId: songId }],
      },
    });
  } else {
    result = await SongLikes.create({
      userId: userId,
      songId: songId,
    });
  }

  console.log(result);
};

export {
  createNewSong,
  getSong,
  getRandomSong,
  getReviewSong,
  getSongProfileInfo,
  postCritique,
  getReviewInfo,
  addTokenToSong,
  submitCritiqueScore,
  likeSong,
};
