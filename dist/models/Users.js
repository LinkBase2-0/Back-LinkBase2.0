"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, { sequelize: db_1.default, tableName: "user" });
