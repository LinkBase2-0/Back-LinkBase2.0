import { Router } from "express";
import { Categories, Provider } from "../models";


const router = Router();

router.post("/", async (req, res, next) => {
    try {
      const newCategory = await Categories.create(req.body);
      res.status(201).send(newCategory);
    } catch (error) {
      console.log(error);
    }
  });

router.get("/filter/:categoryName", async (req, res, next) => {
    const name = req.params.categoryName;
    try {
        const providers = await Categories.findOne({
            where: { name },
            include: { model: Provider, as: "providers" },
        });
        res.status(200).send(providers?.providers);
    } catch (error) {
        console.log(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const categories = await Categories.findAll();
        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
    }
});

export default router;
