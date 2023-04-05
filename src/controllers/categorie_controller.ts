import { Request, Response, NextFunction } from "express";
import { createCategorie, getCategories } from "../services/categorie_service";

export const categorie_create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = await createCategorie(req.body);
    return res.status(201).send(newCategory);
  } catch (error) {
    next(error);
  }
};

export const categorie_get_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getCategories();
    return res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
};
