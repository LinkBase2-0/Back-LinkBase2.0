import { Company, User } from "../models";
import { generateToken } from "../config/token";

export const createUser = async (user: any, name: string) => {
  if (name) {
    const newCompany = await Company.findOrCreate({ where: { name } });
    const newUser = await User.create(user);
    await newCompany[0].addUser(newUser);
    return newUser;
  } else {
    const newUser = await User.create(user);
    if (newUser) return newUser;
    else throw new Error("Error loading form data");
  }
};

export const loggedUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { message: "invalid credentials" };
  const passwordMatches = await user.validatePassword(password);
  if (!passwordMatches) return { message: "invalid credentials" };
  const payload = {
    email: user.email,
    fullName: user.fullName,
    rol: user.rol,
  };
  const token = generateToken(payload);
  return {
    token: token,
    payload: payload,
  };
};

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  if (user) return { user: user };
  else throw new Error("There is no user with that id");
};

export const findAllUser = async () => {
  const users = await User.findAll();
  if (users) return { all: users };
  else throw new Error("No users could be found");
};

export const updateUserEmail = async (body: object, obj: any) => {
  const userUpdated = await User.update(body, obj);
  if (userUpdated[1][0]) return userUpdated[1][0];
  else throw new Error("Invalid fields");
};

export const deleteUser = async (id: number) => {
  return User.destroy({ where: { id } });
};

export const getUsers = async (rol: string) => {
  return User.findAll({ where: { rol } });
};
