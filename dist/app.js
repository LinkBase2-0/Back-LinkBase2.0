"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use("/", routes_1.default);
db_1.default.sync({ force: false }).then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
});
