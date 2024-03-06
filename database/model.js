import { Model, DataTypes } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///musical-feedback");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Song extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Review extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Genre extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class UserGenre extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class SongGenre extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Follow extends Model{
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Message extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class ChatRoom extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    songInReview: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userReviewToken: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

Song.init(
  {
    songId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    embeddedLink: {
      type: DataTypes.TEXT,
      allowNull: false,
      // unique: true,
    },
    artistQuestion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    songReviewToken: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    modelName: "song",
    sequelize: db,
  }
);

//rah

Review.init(
  {
    reviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    aestheticCritique: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    technicalCritique: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    artistCritique: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    modelName: "reviews",
    sequelize: db,
  }
);

Genre.init(
  {
    genreId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    genreName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "genre",
    sequelize: db,
  }
);

UserGenre.init(
  {
    UserGenreId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  },
  {
    modelName: "usergenre",
    sequelize: db,
  }
);

SongGenre.init(
  {
    SongGenreId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  },
  {
    modelName: "songgenre",
    sequelize: db,
  }
);

Follow.init(
  {
    followId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "follow",
    sequelize: db,
  }
);

Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    modelName: "message",
    sequelize: db,
  }
);

ChatRoom.init(
  {
    chatRoomId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    modelName: "chatroom",
    sequelize: db,
  }
);


// UserReviewed.init(
//   {
//     reviewId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       unique: true,
//     },
//     // foreign key of userId and SongId
//   },
//   {
//     modelName: "userReview",
//     sequelize: db,
//   }
// );

// Song Table
User.hasMany(Song, { foreignKey: "userId" });
Song.belongsTo(User, { foreignKey: "userId" });

//Review Table
User.hasMany(Review, { foreignKey: "reviewForUserId", as: "reviewsFor" });
Review.belongsTo(User, { foreignKey: "reviewForUserId", as: "reviewFor" });

User.hasMany(Review, { foreignKey: "reviewByUserId", as: "reviewsBy" });
Review.belongsTo(User, { foreignKey: "reviewByUserId", as: "reviewBy" });


Song.hasMany(Review, { foreignKey: "songId" });
Review.belongsTo(Song, { foreignKey: "songId" });

User.belongsToMany(Genre, { foreignKey: "userId", through: "usergenre" });
Genre.belongsToMany(User, { foreignKey: "genreId", through: "usergenre" });

Song.belongsToMany(Genre, { foreignKey: "songId", through: "songgenre" });
Genre.belongsToMany(Song, { foreignKey: "genreId", through: "songgenre" });

User.hasMany(Follow, { foreignKey: "followerId", as: "followers" });
User.hasMany(Follow, { foreignKey: "followingId", as: "followings" });

Follow.belongsTo(User, { foreignKey: "followerId", as: "follower" });
Follow.belongsTo(User, { foreignKey: "followingId", as: "following" });

Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' });
ChatRoom.hasMany(Message, { foreignKey: 'chatRoomId' });