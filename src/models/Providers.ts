import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import Services from "./Services";
import Categories from "./Categories";
import Review from "./Reviews";
import User from "./Users";

interface Scopes {
  attributes: {
    exclude: string[]
  }
}

const defaultScope: Scopes = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

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
  declare id: number;

  public readonly services?: Services[];
  public readonly categories?: Categories[];

  public static associate() {
    Provider.belongsToMany(Services, {
      through: "ServiceProvider",
      foreignKey: "ProviderId",
      as: "services",
    });
    Provider.belongsToMany(Categories, {
      through: "CategoryProvider",
      foreignKey: "ProviderId",
      as: "categories",
    });
    Provider.hasMany(Review, { as: "reviews" });
    Provider.belongsTo(User);
  }

  public async addService(service: Services): Promise<void> {
    await (this as any).addServices(service);
  }

  public async setTo(user: User): Promise<void> {
    await (this as any).setUser(user);
  }

  public async addCategorie(category: Categories): Promise<void> {
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
    id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    isPending: {
      type: new DataTypes.BOOLEAN(),
      defaultValue: true,
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
  { sequelize: DataBase, tableName: "providers", defaultScope }
);
