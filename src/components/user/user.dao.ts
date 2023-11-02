import User from "./user.model";
import mongoose from "mongoose";

export const createUser = async (data: object) => {
  const newUser = await User.create(data);
  return newUser;
};

export const findUser = async (id: any) => {
  const ObjectId = mongoose.Types.ObjectId;
  const user = await User.aggregate([
    {$match : {_id: new ObjectId(id)}}
  ]);
  return user;
};

export const findAllUser = async () => {
  const allUser = await User.aggregate([
    {$match : {}}
  ]);
  return allUser;
};

export const findUserAndUpdate = async (id: any, data: object) => {
  const ObjectId = mongoose.Types.ObjectId;
  const updateUserInfo = await User.aggregate([
    {$match : {_id: new ObjectId(id)}},
    {$replaceRoot : { newRoot : {$mergeObjects : ['$$ROOT', data]}}},
  ]);
  const updatedUser = await User.findByIdAndUpdate({_id : updateUserInfo[0]._id }, updateUserInfo[0], {new:true})
  return updatedUser;
};

export const deleteUser = async (id: any) => {
  await User.findByIdAndDelete(id);
  return true;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const searchUser = async (query: string) => {
  const filter = new RegExp(query, "i");
  const users = await User.aggregate([
    {$match : {$or: [{ firstName: filter }, { lastName: filter }, { email: filter }, { designation: filter }]}}  
  ]);
  return users;
};
