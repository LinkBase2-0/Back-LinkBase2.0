import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Provider from "./Providers";

interface Scopes {
  attributes: {
    exclude: string[];
  };
}

const defaultScope: Scopes = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

export default class Categories extends Model<
  InferAttributes<Categories>,
  InferCreationAttributes<Categories>
> {
  declare name: string;
  declare id: number;
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
    id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    iconURL: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
  },
  { sequelize: DataBase, tableName: "Categories", defaultScope }
);
