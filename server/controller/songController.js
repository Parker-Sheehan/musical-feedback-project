import { Song } from "../../database/model";

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

const viewSong = async (req, res) => {
  console.log(req.params.userId);
  console.log(req.body);
};

export { createNewSong };
