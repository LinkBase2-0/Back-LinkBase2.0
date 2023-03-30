import { Router } from "express";

import { Services } from "../models";
import User from "../models/Users";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newService = await Services.create(req.body);
    res.status(201).send(newService);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const serviceToDelete = await Services.findOne({ where: { name } });
    const serviceDeleted = await Services.destroy({ where: { name } });
    res.status(200).send(serviceToDelete);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const serviceUpdated = await Services.update(req.body, {
      where: { name },
      returning: true,
    });
    res.status(200).send(serviceUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const services = await Services.findAll();
    res.status(200).send(services);
  } catch (error) {
    console.log(error);
  }
});

export default router;