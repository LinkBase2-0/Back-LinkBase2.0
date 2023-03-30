import { Request, Response } from "express";
import { createCategorie, getCategories } from "../services/categorie_service";

export const categorie_create = async (req: Request, res: Response) => {
  const newCategory = await createCategorie(req.body);
  return res.status(201).send(newCategory);
};

export const categorie_get_all = async (req: Request, res: Response) => {
  const categories = await getCategories();
  return res.status(200).send(categories);
};
