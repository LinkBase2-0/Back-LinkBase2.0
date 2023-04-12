import { Company, User } from "../models";

export const createCompany = async (email: string, name: string) => {
  const newCompany = await Company.findOrCreate({ where: { name } });
  if (newCompany) {
    const user: any = await User.findOne({ where: { email } });
    await newCompany[0].addUser(user);
    return newCompany[0];
  } else throw new Error("Error loading form data");
};

export const getUsers = async (id: number) => {
  const users = await Company.findOne({
    where: { id },
    include: { model: User, as: "users" },
  });
  if (users) return users;
  else throw new Error("there is no company with that name");
};

export const getCompanies = async () => {
  const companies = await Company.findAll();
  if (companies) return companies;
  else throw new Error("Not found");
};
