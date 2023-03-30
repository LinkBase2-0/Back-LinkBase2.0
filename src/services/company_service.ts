import { Company, User } from "../models";

export const createCompany = async (email: string, name: string) => {
  try {
    const newCompany = await Company.findOrCreate({ where: { name } });
    const user: any = await User.findOne({ where: { email } });
    await newCompany[0].addUser(user);
    return newCompany[0];
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (name: string) => {
  try {
    const users = await Company.findOne({
      where: { name },
      include: { model: User, as: "users" },
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getCompanies = async () => {
  try {
    const companies = await Company.findAll();
    return companies;
  } catch (error) {
    console.log(error);
  }
};
