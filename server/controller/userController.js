import { User, Song } from "../../database/model";

const getProfileInfo = async (req,res) => {
    console.log('in getProfileInfo')
    console.log(req.params, "from params")
    console.log(res.locals.userId, "from jwt")
    console.log(req.session.email, "this is email")
    try{
        if(req.session.email){
            const profileInfo = await User.findOne({
                where: {userId:req.params.userId},
                include:Song
            })
            console.log(req.session)
            console.log(profileInfo,"yay")
            res.send(profileInfo)
        }
        // }else if(res.locals.userId){
        //     console.log(res.locals.userId)
        //     const profileInfo = await User.findOne({
        //         where: {userId: res.locals.userId},
        //         include:Song
        //     })
        //     res.send(profileInfo)
        // }
    }catch(err){
        res.error(err, "user id not detected")
    }
  }

  export {getProfileInfo}