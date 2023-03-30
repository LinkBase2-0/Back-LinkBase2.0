import { Request, Response } from "express";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../services/services_service";

export const service_create = async (req: Request, res: Response) => {
  const newService = await createService(req.body);
  return res.status(201).send(newService);
};

export const service_delete = async (req: Request, res: Response) => {
  const { name } = req.params;
  const serviceToDelete = await deleteService(name);
  return res.status(200).send(serviceToDelete);
};

export const service_update = async (req: Request, res: Response) => {
  const { name } = req.params;
  const serviceUpdated = await updateService(req.body, name);
  return res.status(200).send(serviceUpdated);
};

export const service_get_all = async (req: Request, res: Response) => {
  const services = await getServices();
  return res.status(200).send(services);
};
