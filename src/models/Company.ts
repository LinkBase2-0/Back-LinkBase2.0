import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
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

export default class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  declare name: string;
  declare id: number;

  public readonly user?: User[];

  public static associate() {
    Company.hasMany(User, { as: "users" });
  }

  public async addUser(user: User): Promise<void> {
    await (this as any).addUsers(user);
  }
}

Company.init(
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
    },
  },
  { sequelize: DataBase, tableName: "companies", defaultScope }
);
