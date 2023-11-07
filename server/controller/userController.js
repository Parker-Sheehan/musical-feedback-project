import { User, Song } from "../../database/model";

const getProfileInfo = async (req,res) => {
    let userId = req.params.userId
    console.log(+userId)
    const profileInfo = await User.findOne({
        where: {userId:3},
        include:Song
    })

    console.log(profileInfo,"yay")
    res.send(profileInfo)
  }

  export {getProfileInfo}