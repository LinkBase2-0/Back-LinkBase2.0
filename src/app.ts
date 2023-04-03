import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import DataBase from "./db";

import router from "./routes";

import { port, secret, db_Name, db_Password, db_Username } from "./dotenv";

import { Services, User, Review, Provider, Company } from "./models/index";
import { Optional } from "sequelize";
import swaggerDocs from "./swagger/swagger";

Provider.associate();
Services.associate();
User.associate();
Review.associate();
Company.associate();

const app = express();
const PORT = port;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors());

app.use("/", router);

// El Middleware para manejo de errores posee un parámetro extra, en este caso lo llamamos err
// Este último Middleware detecta los errores y los coloca en dicho parámetro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Some custom error!!");
});

DataBase.sync({ force: true }).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
    swaggerDocs(app, PORT);
  });
});
