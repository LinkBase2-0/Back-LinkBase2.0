import { Request, Response, NextFunction } from "express";
import {
  createCompany,
  getCompanies,
  getUsers,
} from "../services/company_service";

export const company_create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body.user;
  const { name } = req.body.company;
  try {
    const newCompany = await createCompany(email, name);
    return res.status(200).send(newCompany);
  } catch (error) {
    next(error);
  }
};

export const company_get_users_of_company = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;
  try {
    const users = await getUsers(name);
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const company_get_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companies = await getCompanies();
    return res.status(200).send(companies);
  } catch (error) {
    next(error);
  }
};
