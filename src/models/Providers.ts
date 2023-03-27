import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Categorie from "./Categories";
import Review from "./Reviews";

export default class Provider extends Model<
  InferAttributes<Provider>,
  InferCreationAttributes<Provider>
> {
  declare name: string;
  declare email: string;
  declare phone: number;
  declare web: string;
  declare photoURL: string;
  declare isPending: boolean;
  declare time: string;
  declare address: string;
  declare latitude: string;
  declare longitude: string;

  public readonly categories?: Categorie[];

  public static associate() {
    Provider.belongsToMany(Categorie, {
      through: "CategorieProvider",
      foreignKey: "ProviderId",
      as: "categories",
    });
    Provider.hasMany(Review, { as: "reviews" });
  }

  public async addCategory(category: Categorie): Promise<void> {
    await (this as any).addCategories(category);
  }

  public async addReview(review: Review): Promise<void> {
    await (this as any).addReviews(review);
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
    phone: {
      type: new DataTypes.BIGINT(),
      allowNull: false,
    },
    web: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    photoURL: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    isPending: {
      type: new DataTypes.BOOLEAN,
      defaultValue:true,
    },
    time: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    address: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    latitude: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    longitude: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  
  },
  { sequelize: DataBase, tableName: "providers" }
);
