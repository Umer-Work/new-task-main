import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  createUser,
  findAllUser,
  findUserAndUpdate,
  findUser,
  deleteUser,
  findUserByEmail,
} from "./user.dao";
import { validateUser, validateUserUpdate } from "./user.validation";
import { findCompanyById } from "../company/company.dao";

dotenv.config();

export const createNewUser = async (data: object) => {
  try {
    const { value, error } = validateUser(data);

    if (error) {
      throw new Error("Error : " + error);
    }
    const saltRound: number = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRound);

    value.password = hashedPassword;

    //Company Validation ?
    const isCompany = await findCompanyById(value.companyId);
    if (!isCompany) {
      throw new Error("Company not found, Please provide valid company Id");
    }

    const newUser = await createUser(value);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getallUsers = async () => {
  try {
    const allUsers = await findAllUser();

    if (!allUsers) {
      return new Error("No User Available, Please signup first");
    }
    return allUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// eslint-disable-next-line
export const updateUserById = async (id: any, data: object) => {
  try {
    const { value, error } = validateUserUpdate(data);
    if (error) {
      throw error;
    }
    const updateUserInfo = await findUserAndUpdate(id, value);

    return updateUserInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// eslint-disable-next-line
export const findUserWithId = async (id: any) => {
  try {
    const user = await findUser(id);
    if (!user) {
      throw new Error("User not Found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// eslint-disable-next-line
export const deleteUserById = async (id: any) => {
  try {
    const user = await deleteUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// eslint-disable-next-line
export const updateUsersCompanyId = async (id : any, companyId : any ) => {
  try {
    const isUser = await findUser(id);
    if(!isUser){
      throw new Error('User not found, please provide valid Id');
    }
    
    const isCompany = await findCompanyById(companyId);
    if(!isCompany){
      throw new Error('Company not found, Please provide valid Id');
    }

    const updateUser = await findUserAndUpdate(id, {companyId});
    return updateUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const loginUser =async (email: string , password : string) => {
  try {
    const user = await findUserByEmail(email);
    if(!user){
      throw new Error('User not found, please provide valid details');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new Error('Wrong Password, Please try again');
    }

    const payload = {
      email : user.email,
      password : user.password
    }
    const secretKey: any = process.env.JWT_SECRET_KEY; // eslint-disable-line
    const token = jwt.sign(payload, secretKey, {expiresIn : 1800});

    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
    throw error;    
  }
}