import { Sequelize } from "sequelize";

const DataBase = new Sequelize("linkBase", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default DataBase;
 