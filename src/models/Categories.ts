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
  
    public readonly providers?: Provider[];
  
    public static associate() {
      Categories.belongsToMany(Provider, {
        through: 'CategoryProvider',
        foreignKey: 'CategoryId',
        as: 'providers',
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
  
  Categories.init(
    {
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    { sequelize: DataBase, tableName: "Categories" }
  );
  