import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Provider from "./Providers";

export default class Categories extends Model<
  InferAttributes<Categories>,
  InferCreationAttributes<Categories>
> {
  declare name: string;
  declare iconURL: string;

  public readonly providers?: Provider[];

  public static associate() {
    Categories.belongsToMany(Provider, {
      through: "CategoryProvider",
      foreignKey: "CategoryId",
      as: "providers",
    });
  }

  public async addProvider(provider: Provider): Promise<void> {
    await (this as any).addProvider(provider);
  }

}

Categories.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    iconURL: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
  },
  { sequelize: DataBase, tableName: "Categories" }
);
