import { Categories, Provider, Services, User } from "../models";

export const createProvider = async (
  provider: any,
  services: any,
  categories: any,
  user: any
) => {
  const newProvider = await Provider.create(provider);

  if (newProvider) {
    services.map((service: string) => {
      Services.findOrCreate({
        where: { name: service },
      }).then((service) => {
        newProvider.addService(service[0]);
      });
    });

    categories.map((categoryName: string) => {
      Categories.findOrCreate({
        where: { name: categoryName },
      }).then((category) => {
        newProvider.addCategorie(category[0]);
      });
    });

    User.findOne({ where: { email: user.email } }).then(
      (user) => user && newProvider.setTo(user)
    );

    return newProvider;
  } else throw new Error("Error loading form data");
};

export const updateProvider = async (body: any, id: number) => {
  const providerUpdated = await Provider.update(body, {
    where: { id },
    returning: true,
  });
  if (providerUpdated) return providerUpdated[1][0];
  else throw new Error("Invalid fields");
};

export const deleteProvider = async (name: string) => {
  return Provider.destroy({ where: { name } });
};

export const getProvider = async (id: number) => {
  const provider = await Provider.findByPk(id);
  if (provider) return provider;
  else throw new Error("there is no user with that name");
};

export const getProviders = async () => {
  const providers = await Provider.findAll();
  if (providers) return providers;
  else throw new Error("Not found");
};

export const filterByCategorie = async (id: number) => {
  const providers = await Categories.findOne({
    where: { id },
    include: { model: Provider, as: "providers" },
  });
  if (providers?.providers) return providers?.providers;
  else throw new Error("there is no category with that name");
};

export const filterByCategorieName = async (name: string) => {
  const providers = await Categories.findOne({
    where: { name },
    include: { model: Provider, as: "providers" },
  });
  if (providers?.providers) return providers?.providers;
  else throw new Error("there is no category with that name");
};



export const filterByService = async (id: number) => {
  const providers = await Services.findOne({
    where: { id },
    include: { model: Provider, as: "providers" },
  });
  if (providers?.providers) return providers?.providers;
  else throw new Error("there is no service with that name");
};

export const getProvidersF = async () => {
  const providers = await Provider.findAll({ where: { isPending: false } });
  if (providers) return providers;
  else throw new Error("Not found");
};

export const getProvidersT = async () => {
  const providers = await Provider.findAll({ where: { isPending: true } });
  if (providers) return providers;
  else throw new Error("Not found");
};
