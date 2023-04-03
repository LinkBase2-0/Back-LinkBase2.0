import { Request, Response } from "express";
import {
  createProvider,
  updateProvider,
  deleteProvider,
  getProvider,
  getProviders,
  filterByCategorie,
  filterByService,
  getProvidersF,
  getProvidersT,
} from "../services/provider_service";

export const provider_create_post = async (req: Request, res: Response) => {
  const { provider } = req.body;
  const { services } = req.body;
  const { categories } = req.body;
  const { user } = req.body;
  const newProvider = await createProvider(
    provider,
    services,
    categories,
    user
  );
  return res.status(201).send(newProvider);
};

export const provider_update = async (req: Request, res: Response) => {
  const { name } = req.params;
  const providerUpdated = await updateProvider(req.body, name);
  return res.status(200).send(providerUpdated);
};

export const provider_delete = async (req: Request, res: Response) => {
  const { name } = req.params;
  const providerToDelete = await deleteProvider(name);
  return res.status(200).send(providerToDelete);
};

export const provider_get_one = async (req: Request, res: Response) => {
  const { name } = req.params;
  const provider = await getProvider(name);
  return res.status(200).send(provider);
};

export const provider_filter_by_categorie = async (
  req: Request,
  res: Response
) => {
  const name = req.params.categorieName;
  const providers = await filterByCategorie(name);
  return res.status(200).send(providers);
};

export const provider_filter_by_service = async (
  req: Request,
  res: Response
) => {
  const name = req.params.serviceName;
  const providers = await filterByService(name);
  return res.status(200).send(providers);
};
export const provider_get_all = async (req: Request, res: Response) => {
  const providers = await getProviders();
  return res.status(200).send(providers);
};

export const provider_pending_false = async (req: Request, res: Response) => {
  const providers = await getProvidersF();
  return res.status(200).send(providers);
};

export const provider_pending_true = async (req: Request, res: Response) => {
  const providers = await getProvidersT();
  return res.status(200).send(providers);
};
