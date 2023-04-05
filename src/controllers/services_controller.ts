import { Request, Response, NextFunction } from "express";
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from "../services/services_service";

export const service_create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newService = await createService(req.body);
    return res.status(201).send(newService);
  } catch (error) {
    next(error);
  }
};

export const service_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;
  try {
    const serviceToDelete = await deleteService(name);
    return res.status(200).send(serviceToDelete);
  } catch (error) {
    next(error);
  }
};

export const service_update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;
  try {
    const serviceUpdated = await updateService(req.body, name);
    return res.status(200).send(serviceUpdated);
  } catch (error) {
    next(error);
  }
};

export const service_get_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await getServices();
    return res.status(200).send(services);
  } catch (error) {
    next(error);
  }
};
