import { Categories } from "../models";

export const createCategorie = async (body: any) => {
  try {
    const newCategory = await Categories.create(body);
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const categories = await Categories.findAll();
    return categories;
  } catch (error) {
    console.log(error);
  }
};
