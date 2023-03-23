import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import bcrypt from "bcrypt";

import DataBase from "../db";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare salt: string;
  declare lastName: string;
  declare fullName: string;
  declare adress: string;
  declare isAdmin: boolean;
  declare hash: (password: string, salt: string) => Promise<String>;
  declare validatePassword: (password: string) => Promise<Boolean>;
}

User.init(
  {
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    fullName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    adress: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    salt: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    isAdmin: {
      type: new DataTypes.BOOLEAN(),
      defaultValue: false
    },
  },
  { sequelize: DataBase, tableName: "users" }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSaltSync(9);
  user.salt = salt;
  const hash = await bcrypt.hash(user.password, user.salt);
  user.password = hash;
});

User.prototype.hash = async function (password: string, salt: string) {
  return await bcrypt.hash(password, salt);
};

User.prototype.validatePassword = async function (password: string) {
  return await bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};
