import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Provider from "./Providers";

export default class Services extends Model<
  InferAttributes<Services>,
  InferCreationAttributes<Services>
> {
  declare name: string;

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
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { sequelize: DataBase, tableName: "Services" }
);
