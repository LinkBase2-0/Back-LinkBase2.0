import { Categorie, Company, Provider, User } from "../models";

import axios from "axios";

import { users } from "./Users.json";
import { providers } from "./Providers.json";
import { companies } from "./Companies.json";
import { categories } from "./Categories.json";


providers.map(async (obj) => {
  const arrarRes = []
  await axios
    .post("http://localhost:3001/providers/", obj)
    .then(res => arrarRes.push(res))
    .catch((error) => console.log(error));

})

