import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import DataBase from "../db";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare name: string;
}

User.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { sequelize: DataBase, tableName: "user" }
);
