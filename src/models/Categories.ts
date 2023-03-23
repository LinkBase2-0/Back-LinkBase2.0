import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import DataBase from "../db";

export default class Categorie extends Model<
  InferAttributes<Categorie>,
  InferCreationAttributes<Categorie>
> {
  declare name: string;
}

Categorie.init(
  {
    name: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
  },
  { sequelize: DataBase, tableName: "categories" }
);
