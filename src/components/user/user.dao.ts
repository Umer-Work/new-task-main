import User from "./user.model";

export const createUser = async (data : object) => {
    const newUser = await User.create(data);
    return newUser;
}

export const findUser = async (id : any) => {  // eslint-disable-line
    const user = await User.findById(id);
    return user;
}

export const findAllUser = async () => {
    const allUser = await User.find();
    return allUser;
}

export const findUserAndUpdate =async (id: any, data : object) => { // eslint-disable-line
    const user = await User.findByIdAndUpdate(id, data, {new: true});
    return user;
}

export const deleteUser = async (id:any) => { // eslint-disable-line
    await User.findByIdAndDelete(id);
    return true;
}

export const findUserByEmail = async(email : string) => {
    const user = await User.findOne({email});
    return user;
}