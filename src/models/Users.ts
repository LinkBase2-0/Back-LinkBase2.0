import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import bcrypt from "bcrypt";

import DataBase from "../db";
import Review from "./Reviews";
import Company from "./Company";
import Provider from "./Providers";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare email: string;
  declare password: string;
  declare id: number;
  declare salt: string;
  declare fullName: string;
  declare rol: boolean;
  declare charge: string;
  declare isPending: string;
  declare photoURL: string;
  declare hash: (password: string, salt: string) => Promise<String>;
  declare validatePassword: (password: string) => Promise<Boolean>;

  public static associate() {
    User.hasMany(Review, { as: "reviews" });
    User.belongsTo(Company);
    User.belongsTo(Provider);
    User.belongsTo(Provider);
  }

  public async addReview(review: Review): Promise<void> {
    await (this as any).addReviews(review);
  }

  public async addCompany(company: Company): Promise<void> {
    await (this as any).addCompanies(company);
  }
}

User.init(
  {
    fullName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
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
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    salt: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    rol: {
      type: new DataTypes.ENUM("adminProviders", "client", "superAdmin",'adminReviews','checker'),
      defaultValue: "client",
    },
    charge: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    isPending: {
      type: new DataTypes.BOOLEAN(),
      defaultValue: true,
    },
    photoURL: {
      type: new DataTypes.STRING(256),
      allowNull: true,
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
