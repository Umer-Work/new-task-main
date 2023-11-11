import User from "./user.model";

export const createUser = async (data: object) => {
  const newUser = await User.create(data);
  return newUser;
};

export const findUser = async (id: any) => {
  const user = await User.findById(id);
  return user;
};

export const findAllUser = async () => {
  const allUser = await User.find();
  return allUser;
};

export const findUserAndUpdate = async (id: any, data: object) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, {new : true});
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
