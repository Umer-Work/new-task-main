import {
  createNewUser,
  getallUsers,
  updateUserById,
  findUserWithId,
  deleteUserById,
  updateUsersCompanyId,
  loginUser,
  searchUserByFilter,
} from "./user.service";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { drive } from "../../util/googleDriveService";

export const registerNewEmployee = async (req: Request, res: Response) => {
  try {
    const data = req.body
    console.log("current dir :" + __dirname);
    if(req.file){
      data.profileImage = req.file.filename;
      const filePath = path.join(__dirname, '../../uploads', req.file.filename);
      const response = await drive.files.create({
        requestBody: {
          name: req.file.filename, 
          mimeType: req.file.mimetype,
          parents : ["1DPpNTpkUv6EpNcLKVL7tnqxvI6dQZ8XE"]
        },
        media: {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(filePath),
        },
      });
      console.log('File uploaded to Google Drive:', response.data);
    }

    const newUser = await createNewUser(data);

    return res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
      userInfo: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      messages: `${error}`,
    });
  }
};

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const allUser = await getallUsers();
    return res.status(200).json({
      success: true,
      message: "All Users Fetched",
      Users: allUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to fetch all Users" + `${error}`,
    });
  }
};

export const updateEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateUser = await updateUserById(id, data);

    return res.status(200).json({
      success: true,
      message: "Update User's Information Successfully",
      userInfo: updateUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to update User" + `${error}`,
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await findUserWithId(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found",
        })
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      UserInfo: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unable to Fetch User" + `${error}`,
    });
  }
};

export const deleteEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unable to delete User" + `${error}`,
    });
  }
};

export const setEmployeeCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { companyId } = req.body;
    console.log(companyId);

    const updateUser = await updateUsersCompanyId(id, companyId);
    return res.status(200).json({
      success: true,
      message: "User's Company Id Changed",
      UserInfo: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unable to set User's Company Id" + `${error}`,
    });
  }
};

export const searchEmployeeByFilter = async (req: Request, res: Response) => {
  try {
    const field = Object.keys(req.query)[0];
    const query = req.query[field] as string;
    console.log(field + " " + query);
    const companies = await searchUserByFilter(query);
    return res.status(200).json({
      success: true,
      message: "Users Found",
      companies: companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to search User: " + `${error}`,
    });
  }
};

export const loginEmployee = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const options: object = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "strict",
    };
    res
      .cookie("refreshToken", user.refreshToken, options)
      .header("Authorization", user.accessToken)
      .send(user);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unable to Login User" + `${error}`,
    });
  }
};
