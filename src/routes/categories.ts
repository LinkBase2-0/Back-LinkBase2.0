import { Router } from "express";

import { Categorie } from "../models";
import User from "../models/Users";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newCategorie = await Categorie.create(req.body);
    res.status(201).send(newCategorie);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const categorieToDelete = await Categorie.findOne({ where: { name } });
    const categorieDeleted = await Categorie.destroy({ where: { name } });
    res.status(200).send(categorieToDelete);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const categorieUpdated = await Categorie.update(req.body, {
      where: { name },
      returning: true,
    });
    res.status(200).send(categorieUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
  }
});

export default router;