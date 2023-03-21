import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import DataBase from '../db';

export default class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { sequelize: DataBase, tableName: "review" }
);
