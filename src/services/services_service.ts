import { Services } from "../models";

export const createService = async (body: any) => {
  const newService = await Services.create(body);
  if (newService) return newService;
  else throw new Error("Error loading form data");
};

export const deleteService = async (name: string) => {
  const serviceToDelete = await Services.findOne({ where: { name } });
  if (serviceToDelete) {
    const serviceDeleted = await Services.destroy({ where: { name } });
    return serviceToDelete;
  } else throw new Error("there is no service with that name");
};

export const updateService = async (body: any, name: string) => {
  const serviceUpdated = await Services.update(body, {
    where: { name },
    returning: true,
  });
  if (serviceUpdated[1][0]) return serviceUpdated[1][0];
  else throw new Error("Invalid fields");
};

export const getServices = async () => {
  const services = await Services.findAll();
  if (services) return services;
  else throw new Error("Not found");
};
