"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const Reviews_1 = __importDefault(require("./Reviews"));
class User extends sequelize_1.Model {
    static associate() {
        User.hasMany(Reviews_1.default, { as: "reviews" });
    }
    addReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addReviews(review);
        });
    }
}
exports.default = User;
User.init({
    fullName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    address: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    salt: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    rol: {
        type: new sequelize_1.DataTypes.ENUM("admin", "client", "superAdmin"),
        defaultValue: "client",
    },
    charge: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, { sequelize: db_1.default, tableName: "users" });
User.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSaltSync(9);
    user.salt = salt;
    const hash = yield bcrypt_1.default.hash(user.password, user.salt);
    user.password = hash;
}));
User.prototype.hash = function (password, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, salt);
    });
};
User.prototype.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default
            .hash(password, this.salt)
            .then((hash) => hash === this.password);
    });
};
