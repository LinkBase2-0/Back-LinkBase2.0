import { Company, User } from "../models";
import { generateToken } from "../config/token";
import bcrypt from "bcrypt";

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
    id: user.id,
    rol: user.rol,
    email:user.email,
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

export const updateUserById = async (body: object, obj: any) => {
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


export const updateUserPassword = async (body: any, obj: any) => {
 // Buscar al usuario por su id
  const user = await User.findOne(obj);
  if (!user) {
    return "Usuario no encontrado";
  }
  // Confirmo password vieja
  const oldHash = await  bcrypt.hash(body.oldPassword, user.salt);

  if(oldHash === user.password){
     // Actualizar la contraseña del usuario
    const hash = await bcrypt.hash(body.newPassword, user.salt);
    const userUpdated = await User.update({password: hash}, obj);
    return userUpdated[1][0];
  }else {throw new Error("Invalid password")}
};

