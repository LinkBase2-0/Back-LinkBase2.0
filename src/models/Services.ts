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

export default class Services extends Model<
  InferAttributes<Services>,
  InferCreationAttributes<Services>
> {
  declare name: string;
  declare id: number;

  public readonly providers?: Provider[];

  public static associate() {
    Services.belongsToMany(Provider, {
      through: "ServiceProvider",
      foreignKey: "ServiceId",
      as: "providers",
    });
  }

  public async addProvider(provider: Provider): Promise<void> {
    await (this as any).addProvider(provider);
  }

  public async addProviders(providers: Provider[]): Promise<void> {
    for (const provider of providers) {
      await this.addProvider(provider);
    }
  }
}

Services.init(
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
  },
  { sequelize: DataBase, tableName: "Services", defaultScope }
);
