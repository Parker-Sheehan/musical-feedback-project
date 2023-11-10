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
      type: DataTypes.STRING,
      allowNull: true,
    },
    songInReview: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    genres: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "song",
    sequelize: db,
  }
);

Review.init(
  {
    reviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    // foreign keys of review by and review for
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    overallThoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    musicalityScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    musicalityThoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grooveScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grooveThoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soundDesignScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    soundDesignThoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrangmentScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arrangmentThoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mixMasterScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mixMasterThoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "reviews",
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
User.hasMany(Song, {foreignKey:'userId'})
Song.hasOne(User, {foreignKey: 'userId'})

//Review Table
User.hasMany(Review, {foreignKey:'userId'})
Review.belongsTo(User, {foreignKey:'userId'})

Song.hasMany(Review, {foreignKey:'reviewId'})
Review.belongsTo(Song, {foreignKey: 'songId'})




// await db.sync({ force: true })

// await db.close()
