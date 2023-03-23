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
const express_1 = require("express");
const token_1 = require("../config/token");
const Users_1 = __importDefault(require("../models/Users"));
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield Users_1.default.create(Object.assign({}, req.body));
        res.status(201).send(newUser);
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    Users_1.default.findOne({ where: { email } }).then((user) => {
        if (!user)
            return res.status(401).send({
                message: "invalid credentials",
            });
        user.validatePassword(password).then((passwordMatches) => {
            if (!passwordMatches)
                return res.status(401).send({
                    message: "invalid credentials",
                });
            const payload = {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
            };
            const token = (0, token_1.generateToken)(payload);
            res.cookie("token", token, { httpOnly: true });
            res.send(payload);
        });
    });
});
router.post("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.sendStatus(204);
}));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users_1.default.findAll();
        res.status(200).send(users);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const user = yield Users_1.default.findOne({ where: { email } });
        res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
    }
}));
router.put("/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const userUpdated = yield Users_1.default.update(req.body, {
            where: { email },
            returning: true,
        });
        res.status(200).send(userUpdated[1][0]);
    }
    catch (error) {
        console.log(error);
    }
}));
router.delete("/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const userToDelete = yield Users_1.default.findOne({ where: { email } });
        const userDeleted = yield Users_1.default.destroy({ where: { email } });
        res.status(200).send(userToDelete);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
