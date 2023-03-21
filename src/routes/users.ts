import { Router } from "express";
import User from "../models/Users";
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create({ ...req.body });
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

export default router;
