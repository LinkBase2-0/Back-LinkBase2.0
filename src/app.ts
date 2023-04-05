import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import DataBase from "./db";

import router from "./routes";

import { port} from "./dotenv";

import { Services, User, Review, Provider, Company, Categories } from "./models/index";
import swaggerDocs from "./swagger/swagger";

Provider.associate();
Services.associate();
User.associate();
Review.associate();
Company.associate();
Categories.associate()

const app = express();
const PORT = port;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors());

app.use("/", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  //funcionTraductora(err)
  res.status(500).send(`Error: ${err.errors[0].message}`);
});

DataBase.sync({ force: true }).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
    swaggerDocs(app, PORT);
  });
});
