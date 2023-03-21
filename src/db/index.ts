import { Sequelize } from "sequelize";
import Review from "../models/Reviews";
import User from "../models/Users";

const DataBase = new Sequelize("linkBase", "", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default DataBase;
