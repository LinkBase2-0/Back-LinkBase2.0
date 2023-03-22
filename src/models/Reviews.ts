import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import DataBase from "../db";

export default class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  declare text: string;
  declare stars: number;
}

Review.init(
  {
    text: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    stars: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
      },
    },
  },
  { sequelize: DataBase, tableName: "reviews" }
);
