import { Services } from "../models";

export const createService = async (body: any) => {
  try {
    const newService = await Services.create(body);
    return newService;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (name: string) => {
  try {
    const serviceToDelete = await Services.findOne({ where: { name } });
    const serviceDeleted = await Services.destroy({ where: { name } });
    return serviceToDelete;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (body: any, name: string) => {
  try {
    const serviceUpdated = await Services.update(body, {
      where: { name },
      returning: true,
    });
    return serviceUpdated[1][0];
  } catch (error) {
    console.log(error);
  }
};

export const getServices = async () => {
  try {
    const services = await Services.findAll();
    return services;
  } catch (error) {
    console.log(error);
  }
};
