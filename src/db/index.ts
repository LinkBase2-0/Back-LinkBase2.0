import { Sequelize } from "sequelize";

const DataBase = new Sequelize("linkBase", "", "", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default DataBase;
