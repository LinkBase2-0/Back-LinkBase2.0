import { Sequelize } from "sequelize";

import { db_Name, db_Password, db_Username } from "../dotenv";

const db = db_Name || "";
const name = db_Username || "";
const password = db_Password || "";

const DataBase = new Sequelize(db, name, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default DataBase;
