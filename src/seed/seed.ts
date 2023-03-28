import { Categorie, Company, Provider, User } from "../models";

import axios from "axios";

import { users } from "./Users.json";
import { providers } from "./Providers.json";
import { companies } from "./Companies.json";
import { categories } from "./Categories.json";
import { reviews } from "./Reviews.json";

// const arr = [1, 2, 3, 4];
// arr.map((e) => {
//   if (e === 1) {
//     providers.reduce(
//       (p, x) => p.then(() => axios.post("http://localhost:3001/providers/", x)),
//       Promise.resolve()
//     );
//   } else if (e === 2) {
//     users.reduce(
//       (p, x) =>
//         p.then(() => axios.post("http://localhost:3001/users/register/", x)),
//       Promise.resolve()
//     );
//   } else if (e === 3) {
//     reviews.reduce(
//       (p, x) => p.then(() => axios.post("http://localhost:3001/reviews/", x)),
//       Promise.resolve()
//     );
//   } else {
//     companies.reduce(
//       (p, x) => p.then(() => axios.post("http://localhost:3001/companies/", x)),
//       Promise.resolve()
//     );
//   }
// });

providers.map(async (obj) => {
  const arrarRes = [];
  await axios
    .post("http://localhost:3001/providers/", obj)
    .then((res) => arrarRes.push(res))
    .catch((error) => console.log(error));
});

users.map(async (obj) => {
  const arrarRes = [];
  await axios
    .post("http://localhost:3001/users/register/", obj)
    .then((res) => arrarRes.push(res))
    .catch((error) => console.log(error));
});

reviews.map(async (obj) => {
  const arrarRes = [];
  await axios
    .post("http://localhost:3001/reviews/", obj)
    .then((res) => arrarRes.push(res))
    .catch((error) => console.log(error));
});

companies.reduce(
  (p, x) => p.then(() => axios.post("http://localhost:3001/companies/", x)),
  Promise.resolve()
);
