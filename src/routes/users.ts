import { Router } from "express";

import { generateToken } from "../config/token";
import { validateAuth } from "../middleware/auth";

import User from "../models/Users";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.create({ ...req.body });
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user)
      return res.status(401).send({
        message: "invalid credentials",
      });

    user.validatePassword(password).then((passwordMatches) => {
      if (!passwordMatches)
        return res.status(401).send({
          message: "invalid credentials",
        });

      const payload = {
        email: user.email,
        fullName: user.fullName
      };
      const token = generateToken(payload);
      res.cookie("token", token, { httpOnly: true });
      res.send(payload);
    });
  });
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ where: { email } });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

// ----- ADMIN ------

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const userUpdated = await User.update(req.body, {
      where: { email },
      returning: true,
    });
    res.status(200).send(userUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const userToDelete = await User.findOne({ where: { email } });
    const userDeleted = await User.destroy({ where: { email } });
    res.status(200).send(userToDelete);
  } catch (error) {
    console.log(error);
  }
});

export default router;
