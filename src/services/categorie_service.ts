import { Categories } from "../models";

export const createCategorie = async (body: any) => {
  const newCategory = await Categories.create(body);
  if (newCategory) return newCategory;
  else throw new Error("Error loading form data");
};

export const getCategories = async () => {
  const categories = await Categories.findAll();
  if (categories) return categories;
  else throw new Error("Not found");
};
