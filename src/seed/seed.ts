import { Categorie, Company, Provider, User } from "../models";

import axios from "axios";

import { users } from "./Users.json";
import { providers } from "./Providers.json";
import { companies } from "./Companies.json";
import { categories } from "./Categories.json";

Promise.all(
  providers.map((obj) => {
    return axios.post("http://localhost:3001/providers", obj);
  })
).then((res) => {
  console.log(res);
});
