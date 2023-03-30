import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  DataTypes,
} from "sequelize";

import DataBase from "../db";
import User from "./Users";

export default class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  declare name: string;

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
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { sequelize: DataBase, tableName: "companies" }
);
