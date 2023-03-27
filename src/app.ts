import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import DataBase from "./db";

import router from "./routes";

import { Categorie, User, Review, Provider, Company } from "./models/index";
import { Optional } from "sequelize";

Provider.associate();
Categorie.associate();
User.associate();
Review.associate();
Company.associate();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors());

app.use("/", router);

DataBase.sync({ force: false }).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
