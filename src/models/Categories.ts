import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Provider from "./Providers";

export default class Categorie extends Model<
  InferAttributes<Categorie>,
  InferCreationAttributes<Categorie>
> {
  declare name: string;

  public readonly providers?: Provider[];

  public static associate() {
    Categorie.belongsToMany(Provider, {
      through: 'CategorieProvider',
      foreignKey: 'CategorieId',
      as: 'providers',
    });
  }

  // para agregar un solo proveedor
  public async addProvider(provider: Provider): Promise<void> {
    await (this as any).addProvider(provider);
  }

  // para agregar varios proveedores
  public async addProviders(providers: Provider[]): Promise<void> {
    for (const provider of providers) {
      await this.addProvider(provider);
    }
  }
}

Categorie.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { sequelize: DataBase, tableName: "categories" }
);
