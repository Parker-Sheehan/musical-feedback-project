import { Op } from "sequelize";
import { User, Song, Genre, UserGenre, Follow, ChatRoom, Message } from "../../database/model";

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
  // console.log(newProfileInfo);
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
    // console.log(profileInfo)
    let newProfileInfo = {
      userId: profileInfo.userId,
      displayName: profileInfo.displayName,
      email: profileInfo.email,
      profilePicture:profileInfo.profilePicture,
      songInReview: profileInfo.songInReview,
      userReviewToken: profileInfo.userReviewToken,
      genres: profileInfo.genres,
      songs: profileInfo.songs,
      following: false,
    };
    // console.log(newProfileInfo);
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
    // console.log(updatedProfileInfo, "updated prfoile info");
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

  // console.log(followingUserId);
  // console.log(loggedInUserId);

  try {
    if (req.session.email) {
    const followResults = await Follow.create({
      followerId: loggedInUserId,
      followingId: followingUserId,
    });
      res.status(200).send(true);
    }
  } catch (err) {
    res.send(err, "error");
  }
};

const unfollowUser = async (req, res) => {
  console.log("unfollow user hit");

  let { followingUserId } = req.body;
  let loggedInUserId = +req.params.loggedInUserId;

  try {
    if (req.session.email) {
        const followResults = await Follow.destroy({
          where: {
            followerId: loggedInUserId,
            followingId: followingUserId,
          }
        });
        // console.log(followResults)
          res.status(200).send(false);
    }
  } catch (err) {
    res.status(400).send(err, "error");
  }
};


const getChatRooms = async (req,res) => {
  console.log("getChatRooms hit")
  let {loggedInUserId} = req.params
  console.log(loggedInUserId)



  let chatRooms = await ChatRoom.findAll({
    where: {
      [Op.or]: [
        {user1Id : loggedInUserId},
        {user2Id: loggedInUserId}
      ]
    },
    include: [{
      model: Message,
      // order: [["messageId", "ASC"]]
    },
    {
      model: User,
      as: 'user1', 
      attributes: ['userId', 'displayName', 'profilePicture'] 
    },
    {
      model: User,
      as: 'user2',
      attributes: ['userId', 'displayName', 'profilePicture'] 
    }],
    order: [['updatedAt', 'DESC']]
  })

  console.log(chatRooms)
  res.status(200).send(chatRooms)
}

const getMessages = async (req,res) =>{
  console.log(req.params.chatRoomId)
  let {chatRoomId} = req.params

  console.log(chatRoomId)
  
      let messageArray = await Message.findAll({
        where: {
          chatRoomId: +chatRoomId
        }
      })
      
      // console.log(messageArray)
      
      res.status(200).send(messageArray)
  try{
  }catch(err){
    res.status(400).send(err, "error with db query")
  }
}

const createNewMessage = async (req,res) => {
  console.log(req.body)
  console.log("createNewMessage hit")

  
  let {content, recipientId, senderId, chatRoomId}= req.body
  try{
    let newMessage = await Message.create({ senderId, recipientId, content, chatRoomId });

    await ChatRoom.update({ updatedAt: new Date() }, {
      where: { chatRoomId: chatRoomId }
    });

    let messageArray = await Message.findAll({
      where: {
        chatRoomId: chatRoomId
      }
    })

    console.log(messageArray)

    // console.log(newMessage)
    res.status(200).send(messageArray)

  }catch(err){
    res.status(400).send(err, "error with message create")
  }
}

const createChatRoom = async(req,res) => {
  let {user1Id, user2Id, content} = req.body
  console.log(user1Id, user2Id)
  // try{
    let newChatRoom = await ChatRoom.create({
      user1Id: user1Id,
      user2Id: user2Id,
    });

    console.log(newChatRoom)

    let newMessage = await Message.create({ senderId : user1Id, recipientId : user2Id, content : content, chatRoomId: newChatRoom.chatRoomId });

    console.log(newMessage)

    let chatRoom = await ChatRoom.findOne({
      where: {
        [Op.and]: [
          {user1Id : user1Id},
          {user2Id: user2Id}
        ]
      },
      include: [{
        model: Message,
        // order: [["messageId", "ASC"]]
      },
      {
        model: User,
        as: 'user1', 
        attributes: ['userId', 'displayName', 'profilePicture'] 
      },
      {
        model: User,
        as: 'user2',
        attributes: ['userId', 'displayName', 'profilePicture'] 
      }],
    })

    console.log(chatRoom, "controller")

    res.status(200).send(chatRoom)
  // }catch(err){
  //   res.status(400).send(err)
  // }

}

export { getProfileInfo, updateProfile, followUser, unfollowUser, getChatRooms, createNewMessage, getMessages, createChatRoom };
