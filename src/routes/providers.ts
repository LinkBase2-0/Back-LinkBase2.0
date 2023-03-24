import { Router } from "express";

import { Categorie, Provider } from "../models";

const router = Router();

router.post("/", async (req, res, next) => {
  const { provider } = req.body;
  const { categorie } = req.body;
  try {
    const newProvider = await Provider.create(provider);
    const category = await Categorie.findOrCreate({
      where: { name: categorie },
    });
    await newProvider.addCategory(category[0]);
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

// El código que proporcionas para la ruta que busca los proveedores de una categoría parece correcto. Lo que hace es buscar una categoría por su nombre y luego incluir los proveedores asociados a ella.

// Al usar el método findOne de Sequelize, estás buscando una única categoría en función del nombre que recibes en la solicitud. Después, con la opción include del método, estás diciendo a Sequelize que incluya los proveedores asociados a la categoría encontrada.

// En resumen, este código debería buscar la categoría por su nombre y devolver los proveedores asociados a ella. Si todo está bien configurado en tus modelos y asociaciones, debería funcionar correctamente.

export default router;
