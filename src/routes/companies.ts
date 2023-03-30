import { Router } from "express";

import { Company, User } from "../models";

const router = Router();

router.get("/:name", async (req, res) => {
  const { name } = req.params;
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
