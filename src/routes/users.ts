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
        fullName: user.fullName,
        //admin: user.admin,
      };
      const token = generateToken(payload);
      res.cookie("token", token, { httpOnly: true });
      res.send(payload);
    });
  });
});

router.get("/", validateAuth, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

export default router;
