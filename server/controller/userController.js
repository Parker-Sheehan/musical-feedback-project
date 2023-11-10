import { User, Song } from "../../database/model";

const getProfileInfo = async (req,res) => {
    let userId = req.params.userId
    const profileInfo = await User.findOne({
        where: {userId:userId},
        include:Song
    })

    console.log(profileInfo,"yay")
    res.send(profileInfo)
  }

  export {getProfileInfo}