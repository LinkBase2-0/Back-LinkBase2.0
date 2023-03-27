import { Router } from "express";

import { Categorie, Provider } from "../models";

const router = Router();

router.post("/", async (req, res, next) => {
  console.log("entroooooooo");
  
  const { provider } = req.body;
  const { categories } = req.body;
  try {
    const newProvider = await Provider.create(provider);
    categories.map(
      (categorie: string) => {
        Categorie.findOrCreate({
          where: { name: categorie },
        }).then((category) => newProvider.addCategory(category[0]));
      }
    );
    console.log(newProvider);
    res.status(201).send(newProvider);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const providerUpdated = await Provider.update(req.body, {
      where: { name },
      returning: true,
    });
    res.status(200).send(providerUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const providerToDelete = await Provider.findOne({ where: { name } });
    const providerDeleted = await Provider.destroy({ where: { name } });
    res.status(200).send(providerToDelete);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const provider = await Provider.findOne({ where: { name } });
    res.status(200).send(provider);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const providers = await Provider.findAll();
    res.status(200).send(providers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/filter/:categorieName", async (req, res, next) => {
  const name = req.params.categorieName;
  try {
    const providers = await Categorie.findOne({
      where: { name },
      include: { model: Provider, as: "providers" },
    });
    res.status(200).send(providers?.providers);
  } catch (error) {
    console.log(error);
  }
});

export default router;
