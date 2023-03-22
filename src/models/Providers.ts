import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import DataBase from "../db";

export default class Provider extends Model<
  InferAttributes<Provider>,
  InferCreationAttributes<Provider>
> {
  declare name: string;
  declare email: string;
  declare adress: string;
  declare latitude: number;
  declare longitude: number;
  declare cp: number;
}

Provider.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    adress: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    latitude: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    longitude: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    cp: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  { sequelize: DataBase, tableName: "providers" }
);
