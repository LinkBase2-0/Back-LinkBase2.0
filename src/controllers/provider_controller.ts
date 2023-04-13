import { Request, Response, NextFunction } from "express";
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
  filterByCategorieName,
} from "../services/provider_service";
import { sendEmail } from "../config/emailConfig";

export const provider_seed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { provider } = req.body;
  const { services } = req.body;
  const { categories } = req.body;
  const { user } = req.body;
  try {
    const newProvider = await createProvider(
      provider,
      services,
      categories,
      user
    );
    return res.status(201).send(newProvider);
  } catch (error) {
    next(error);
  }
};

export const provider_create_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { provider } = req.body;
  const { services } = req.body;
  const { categories } = req.body;
  const { user } = req.body;
  try {
    const newProvider = await createProvider(
      provider,
      services,
      categories,
      user
    );

    await sendEmail("superAdmin", newProvider, "A new provider has been registered");
    await sendEmail("adminProviders", newProvider, "A new provider has been registered");

    return res.status(201).send(newProvider);
  } catch (error) {
    next(error);
  }
};

export const provider_update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const providerUpdated = await updateProvider(req.body, parseInt(id));
    return res.status(200).send(providerUpdated);
  } catch (error) {
    next(error);
  }
};

export const provider_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const providerToDelete = await getProvider(parseInt(id));
    await deleteProvider(id);
    return res.status(200).send(providerToDelete);
  } catch (error) {
    next(error);
  }
};

export const provider_get_one = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const provider = await getProvider(parseInt(id));
    return res.status(200).send(provider);
  } catch (error) {
    next(error);
  }
};

export const provider_get_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providers = await getProviders();
    return res.status(200).send(providers);
  } catch (error) {
    next(error);
  }
};

export const provider_filter_by_categorie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.categoryId;
  try {
    const providers = await filterByCategorie(parseInt(id));
    return res.status(200).send(providers);
  } catch (error) {
    next(error);
  }
};


export const provider_filter_by_categorieName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.params.categoryName;
  try {
    const providers = await filterByCategorieName(name);
    return res.status(200).send(providers);
  } catch (error) {
    next(error);
  }
};



export const provider_filter_by_service = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.serviceId;
  try {
    const providers = await filterByService(parseInt(id));
    return res.status(200).send(providers);
  } catch (error) {
    next(error);
  }
};

export const provider_pending_false = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providers = await getProvidersF();
    return res.status(200).send(providers);
  } catch (error) {
    next(error);
  }
};

export const provider_pending_true = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providers = await getProvidersT();
    return res.status(200).send(providers);
  } catch (error) {
    next(error);
  }
};
