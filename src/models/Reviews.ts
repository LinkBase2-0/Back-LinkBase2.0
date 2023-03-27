import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Provider from "./Providers";
import User from "./Users";

export default class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  declare text: string;
  declare stars: number;

  public static associate() {
    Review.belongsTo(User);
    Review.belongsTo(Provider);
  }
}

Review.init(
  {
    text: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    stars: {
      type: new DataTypes.FLOAT(),
      allowNull: true,
      validate: {
        max: 5,
        min: 0,
      },
    },
  },
  { sequelize: DataBase, tableName: "reviews" }
);
