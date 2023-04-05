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

    categories.map(async (categoryName: string) => {
      const category = await Categories.findOne({
        where: { name: categoryName },
      });
      category && (await newProvider.addCategorie(category));
      
    });

    User.findOne({ where: { email: user.email } }).then(
      (user) => user && newProvider.setTo(user)
    );

    return newProvider;
  } else throw new Error("Error loading form data");
};

export const updateProvider = async (body: any, name: any) => {
  const providerUpdated = await Provider.update(body, {
    where: { name },
    returning: true,
  });
  if (providerUpdated) return providerUpdated[1][0];
  else throw new Error("Invalid fields");
};

export const deleteProvider = async (name: string) => {
  return Provider.destroy({ where: { name } });
};

export const getProvider = async (name: string) => {
  const provider = await Provider.findOne({ where: { name } });
  if (provider) return provider;
  else throw new Error("there is no user with that name");
};

export const getProviders = async () => {
  const providers = await Provider.findAll({
    include: { model: Categories, as: "categories" },
  });
  if (providers) return providers;
  else throw new Error("Not found");
};

export const filterByCategorie = async (name: string) => {
  const providers = await Categories.findOne({
    where: { name },
    include: { model: Provider, as: "providers" },
  });
  console.log(providers)
  if (providers?.providers) return providers?.providers;
  else throw new Error("there is no category with that name");
};

export const filterByService = async (name: string) => {
  const providers = await Services.findOne({
    where: { name },
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
