import { Request, Response } from "express";
import {
  createCompany,
  getCompanies,
  getUsers,
} from "../services/company_service";

export const company_create = async (req: Request, res: Response) => {
  const { email } = req.body.user;
  const { name } = req.body.company;
  const newCompany = await createCompany(email, name);
  return res.status(200).send(newCompany);
};

export const company_get_users_of_company = async (
  req: Request,
  res: Response
) => {
  const { name } = req.params;
  const users = await getUsers(name);
  return res.status(200).send(users);
};

export const company_get_all = async (req: Request, res: Response) => {
  const companies = await getCompanies();
  return res.status(200).send(companies);
};
