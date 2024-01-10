import { User, Song, Genre, UserGenre } from "../../database/model";

const getProfileInfo = async (req, res) => {
  console.log("in getProfileInfo");
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
    if (req.session.email) {
      res.send(profileInfo);
    }
  } catch (err) {
    res.error(err, "user id not detected");
  }
};

const updateProfile = async (req, res) => {
  console.log("updateProfileHit");
  console.log(req.body);
  console.log(req.session.email)

  let { displayName, profilePicture, genres } = req.body;
  let {userId} = req.params
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
      where: {userId: req.params.userId}
    })

    UserGenre.bulkCreate(genres.map(({genreId}) => ({userId, genreId})))
    console.log(updatedProfileInfo,"updated prfoile info");
    res.send("yay");
    if (req.session.email) {
    }
  } catch (err) {
    res.error(err, "user id not found");
  }
};

export { getProfileInfo, updateProfile };
