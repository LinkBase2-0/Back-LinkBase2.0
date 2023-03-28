import { Router } from "express";

import { Company, User } from "../models";

const router = Router();

router.post("/", async (req, res) => {
  const { email } = req.body.user;
  const { name } = req.body.company;
  try {
    const newCompany = await Company.findOrCreate({ where: { name } });
    const user: any = await User.findOne({ where: { email } });
    await newCompany[0].addUser(user);
    res.status(200).send(newCompany[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:name", async (req, res) => {
  const { name } = req.params
  try {
    const users = await Company.findOne({
      where: { name },
      include: { model: User, as: "users" },
    });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).send(companies);
  } catch (error) {
    console.log(error);
  }
});

export default router;
