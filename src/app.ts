import express from "express";
import DataBase from "./db";
import { Categorie, User, Review, Provider } from "./models/index";
import router from "./routes";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", router);

DataBase.sync({ force: false }).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
