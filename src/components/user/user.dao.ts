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
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
};

export const deleteUser = async (id: any) => {
  await User.findByIdAndDelete(id);
  return true;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const findUserByDesignation = async (data: string) => {
  const users = await User.find({ designation: data }, { new: true });
  console.log(users);
  return users;
};

export const searchUser =async (field : string, query : string) => {
  let filter: any = {};
  if (field === "firstName") {
    filter = { firstName: { $regex: new RegExp(query, 'i') } };
  } else if (field === "lastName") {
    filter = { lastName: { $regex: new RegExp(query, 'i') } };
  } else if (field === "email") {
    filter = { email: { $regex: new RegExp(query, 'i') } };
  } else if (field === "designation") {
    filter = { designation: { $regex: new RegExp(query, 'i') } };
  }
const companies = await User.find(filter);
return companies;
}