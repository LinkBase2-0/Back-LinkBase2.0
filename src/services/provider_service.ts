import { Categories, Provider, Services, User } from "../models";

export const createProvider = async (
  provider: any,
  services: any,
  categories: any,
  user: any
) => {
  try {
    const newProvider = await Provider.create(provider);

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
  } catch (error) {
    console.log(error);
  }
};

export const updateProvider = async (body: any, name: any) => {
  try {
    const providerUpdated = await Provider.update(body, {
      where: { name },
      returning: true,
    });
    return providerUpdated[1][0];
  } catch (error) {
    console.log(error);
  }
};

export const deleteProvider = async (name: string) => {
  try {
    const providerToDelete = await Provider.findOne({ where: { name } });
    const providerDeleted = await Provider.destroy({ where: { name } });
    return providerToDelete;
  } catch (error) {
    console.log(error);
  }
};

export const getProvider = async (name: string) => {
  try {
    const provider = await Provider.findOne({ where: { name } });
    return provider;
  } catch (error) {
    console.log(error);
  }
};

export const getProviders = async () => {
  try {
    const providers = await Provider.findAll();
    return providers;
  } catch (error) {
    console.log(error);
  }
};

export const filterByCategorie = async (name: string) => {
  try {
    const providers = await Categories.findOne({
      where: { name },
      include: { model: Provider, as: "providers" },
    });
    return providers?.providers;
  } catch (error) {
    console.log(error);
  }
};

export const filterByService = async (name: string) => {
  try {
    const providers = await Services.findOne({
      where: { name },
      include: { model: Provider, as: "providers" },
    });
    return providers?.providers;
  } catch (error) {
    console.log(error);
  }
};

export const getProvidersF = async () => {
  try {
    const providers = await Provider.findAll({ where: { isPending: false } });
    return providers;
  } catch (error) {
    console.log(error);
  }
};

export const getProvidersT = async () => {
  try {
    const providers = await Provider.findAll({ where: { isPending: true } });
    return providers;
  } catch (error) {
    console.log(error);
  }
};
