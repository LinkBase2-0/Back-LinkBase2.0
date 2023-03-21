import express from "express";
import DataBase from "./db";
import Review from "./models/Reviews";
import User from "./models/Users";
import router from "./routes/users";
const app = express();

app.use(express.json());

app.use("/", router);

DataBase.sync({ force: false }).then(() => {
  app.listen(3000);
  console.log("Serever listen on port 3000");
})
