"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Review extends sequelize_1.Model {
}
exports.default = Review;
Review.init({
    text: {
        type: new sequelize_1.DataTypes.TEXT(),
        allowNull: true,
    },
    stars: {
        type: new sequelize_1.DataTypes.FLOAT(),
        allowNull: false,
        validate: {
            max: 5,
            min: 0,
        },
    },
}, { sequelize: db_1.default, tableName: "reviews" });
