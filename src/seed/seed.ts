import { Company, Provider, User } from "../models";

import axios from "axios";

import { users } from "./Users.json";
import { providers } from "./Providers.json";
import { companies } from "./Companies.json";
import { reviews } from "./Reviews.json";
import { setTimeout } from "timers/promises";

const setReview = () => {
  return new Promise((resolve, rej) => {
    reviews
      .reduce(
        (p, x) => p.then(() => axios.post("http://localhost:3001/reviews/", x)),
        Promise.resolve()
      )
      .then((res) => resolve(res));
  });
};

const setProviders = () => {
  return new Promise((resolve, rej) => {
    providers
      .reduce(
        (p, x) =>
          p.then(() => axios.post("http://localhost:3001/providers/", x)),
        Promise.resolve()
      )
      .then((res) => resolve(res));
  });
};

const setUsers = () => {
  return new Promise((resolve, rej) => {
    users
      .reduce(
        (p, x) =>
          p.then(() => axios.post("http://localhost:3001/users/register/", x)),
        Promise.resolve()
      )
      .then((res) => resolve(res));
  });
};

setUsers()
  .then((res) => setProviders())
  .then((res) => setReview());
