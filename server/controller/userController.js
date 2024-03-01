import { User, Song, Genre, UserGenre, Follow } from "../../database/model";

const getProfileInfo = async (req, res) => {
  console.log("in getProfileInfo");
  console.log(req.session);
  try {
  const profileInfo = await User.findOne({
    where: { userId: req.params.userId },
    include: [
      {
        model: Genre,
        through: UserGenre,
      },
      {
        model: Song,
      },
    ],
  });
  console.log(req.session.userId);
  let newProfileInfo = { ...profileInfo, following: true };
  console.log(newProfileInfo);
  if (req.session.userId !== +req.params.userId) {
    // Checking if they are following user
    try{
    let followingCheck = await Follow.findOne({
      where: {
        followerId: req.session.userId,
        followingId: req.params.userId,
      },
    });
    console.log("following hcekc");
    console.log(followingCheck);
    if (req.session.email && followingCheck) {
      console.log("true hit");
      let newProfileInfo = {
        userId: profileInfo.userId,
        userId: 1,
        displayName: profileInfo.displayName,
        email: profileInfo.email,
        profilePicture:profileInfo.profilePicture,
        songInReview: profileInfo.songInReview,
        userReviewToken: profileInfo.userReviewToken,
        genres: profileInfo.genres,
        songs: profileInfo.songs,
        following: true,
      };
      console.log(newProfileInfo);
      res.send(newProfileInfo);
      return;
    } else if (req.session.email) {
      console.log("false hit");
      let newProfileInfo = {
        userId: profileInfo.userId,
        userId: 1,
        displayName: profileInfo.displayName,
        email: profileInfo.email,
        profilePicture:profileInfo.profilePicture,
        songInReview: profileInfo.songInReview,
        userReviewToken: profileInfo.userReviewToken,
        genres: profileInfo.genres,
        songs: profileInfo.songs,
        following: false,
      };
      console.log(newProfileInfo);
      res.send(newProfileInfo);
      return;
    }
    }catch(err){
      res.error(err)
    }
  }
  if (req.session.email) {
    console.log("default");
    console.log(profileInfo)
    let newProfileInfo = {
      userId: profileInfo.userId,
      userId: 1,
      displayName: profileInfo.displayName,
      email: profileInfo.email,
      profilePicture:profileInfo.profilePicture,
      songInReview: profileInfo.songInReview,
      userReviewToken: profileInfo.userReviewToken,
      genres: profileInfo.genres,
      songs: profileInfo.songs,
      following: false,
    };
    console.log(newProfileInfo);
    res.send(newProfileInfo);
  }
  } catch (err) {
    res.error(err, "user id not detected");
  }
};

const updateProfile = async (req, res) => {
  console.log("updateProfileHit");
  console.log(req.body);
  console.log(req.session.email);

  let { displayName, profilePicture, genres } = req.body;
  let { userId } = req.params;
  try {
    const updatedProfileInfo = await User.update(
      {
        displayName: displayName,
        profilePicture: profilePicture,
      },
      {
        where: {
          userId: req.params.userId,
        },
      }
    );

    await UserGenre.destroy({
      where: { userId: req.params.userId },
    });

    UserGenre.bulkCreate(genres.map(({ genreId }) => ({ userId, genreId })));
    console.log(updatedProfileInfo, "updated prfoile info");
    if (req.session.email) {
      res.send("yay");
    }
  } catch (err) {
    res.error(err, "user id not found");
  }
};

const followUser = async (req, res) => {
  console.log("follow user hit");

  let { followingUserId } = req.body;
  let loggedInUserId = +req.params.loggedInUserId;

  console.log(followingUserId);
  console.log(loggedInUserId);

  try {
    const followResults = Follow.create({
      followerId: loggedInUserId,
      followingId: followingUserId,
    });
    if (req.session.email) {
      res.send(followResults);
    }
  } catch (err) {
    res.send(err, "error");
  }
};

export { getProfileInfo, updateProfile, followUser };
