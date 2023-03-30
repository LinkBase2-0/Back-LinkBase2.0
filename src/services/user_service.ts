import { Company, User } from "../models";

export const createUser = async (user:any ,name:string) =>{
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

