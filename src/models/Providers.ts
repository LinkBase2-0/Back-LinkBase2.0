import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Categorie from "./Categories";

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

  public readonly categories?: Categorie[];

  public static associate() {
    Provider.belongsToMany(Categorie, {
      through: 'CategorieProvider',
      foreignKey: 'ProviderId',
      as: 'categories',
    });
  }

  public async addCategory(category: Categorie): Promise<void> {
    await (this as any).addCategories(category);
  }
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
