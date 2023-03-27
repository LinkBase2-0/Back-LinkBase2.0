"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const routes_1 = __importDefault(require("./routes"));
const index_1 = require("./models/index");
index_1.Provider.associate();
index_1.Categorie.associate();
index_1.User.associate();
index_1.Review.associate();
index_1.Company.associate();
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/", routes_1.default);
db_1.default.sync({ force: false }).then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
});
