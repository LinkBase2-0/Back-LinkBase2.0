import { Company, User } from "../models";
import { generateToken } from "../config/token";

export const createUser = async (user: any, name: string) => {
    try {
        if (name) {
            const newCompany = await Company.findOrCreate({ where: { name } });
            const newUser = await User.create(user);
            await newCompany[0].addUser(newUser);
            return newUser
        } else {
            const newUser = await User.create(user);
            return newUser;
        }
    } catch (error) {
        console.log(error);
    }
}

export const loggedUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } })
    if (!user) return {message: "invalid credentials"}
    const passwordMatches = await user.validatePassword(password)
    if (!passwordMatches) return{message: "invalid credentials"}
    const payload = {
        email: user.email,
        fullName: user.fullName,
    };
    const token = generateToken(payload);
    return {
        token: token,
        payload: payload,
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ where: { email } });
        return {user : user}
      } catch (error) {
        return {error : 'No existe usuario con ese mail'}
      }
}

export const findAllUser = async () => {
    try {
        const users = await User.findAll();
        return {all:users}
      } catch (error) {
        return {error : 'No se pudo encontrar usuarios'}
      }
}

export const updateUserEmail = async (body:object, obj:any) => {
    try {
        const userUpdated = await User.update( body, obj)
        return userUpdated[1][0]
      } catch (error) {
        console.log(error);
      }
}

export const deleteUser = async (email:string) => {
    const user = User.destroy({ where: { email } })
    return user
}





