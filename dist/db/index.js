"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DataBase = new sequelize_1.Sequelize("linkBase", "postgres", "123456", {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});
exports.default = DataBase;
