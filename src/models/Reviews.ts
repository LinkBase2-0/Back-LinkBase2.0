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

interface Scopes {
  attributes: {
    exclude: string[]
  }
}

const defaultScope: Scopes = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

export default class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  declare text: string;
  declare stars: number;
  declare id: number;

  public static associate() {
    Review.belongsTo(User);
    Review.belongsTo(Provider);
  }
}

Review.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    stars: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
      },
    },
  },
  { sequelize: DataBase, tableName: "reviews", defaultScope }
);
