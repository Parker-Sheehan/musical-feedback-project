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
  console.log(req.params.userId);
  console.log(req.body);
  console.log(req.session.email);
  let { displayName, profilePicture } = req.body;
  //     displayName: 'me',
  //   genres: [ 'Add Genre Prefrence' ],
  //   profilePicture: 'updateProfileInfo\\'
  try {
    if (req.session.email) {
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
      console.log(updatedProfileInfo);
      res.send(updatedProfileInfo);
    }
  } catch (err) {
    res.error(err, "user id not found");
  }
};

export { getProfileInfo, updateProfile };
