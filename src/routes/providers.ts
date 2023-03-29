import { Router } from "express";

import { Services, Provider } from "../models";

const router = Router();

router.post("/", async (req, res, next) => {
  const { provider } = req.body;
  const { services } = req.body;
  try {
    const newProvider = await Provider.create(provider);
    services.map((service: string) => {
      Services.findOrCreate({
        where: { name: service },
      }).then((service) => newProvider.addService(service[0]));
    });
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

router.get("/pendingF", async (req, res, next) => {
  try {
    const providers = await Provider.findAll({ where: { isPending: false } });
    res.status(200).send(providers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pendingT", async (req, res, next) => {
  try {
    const providers = await Provider.findAll({ where: { isPending: true } });
    res.status(200).send(providers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/filter/:serviceName", async (req, res, next) => {
  const name = req.params.serviceName;
  try {
    const providers = await Services.findOne({
      where: { name },
      include: { model: Provider, as: "providers" },
    });
    res.status(200).send(providers?.providers);
  } catch (error) {
    console.log(error);
  }
});

export default router;
