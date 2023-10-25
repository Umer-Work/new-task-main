import { createNewUser, getallUsers, updateUserById, findUserWithId , deleteUserById, updateUsersCompanyId, loginUser} from "./user.service";
import { Request, Response } from "express";


export const registerNewEmployee = async (req : Request, res : Response) => {
    try {
        const data = req.body;
        const newUser = await createNewUser(data);

        return res.status(201).json({
            success : true,
            message : "Employee Created Successfully",
            userInfo : newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Unable to create Employee at the moment : " + error
        })
    }
} 

export const getAllEmployee =async (req : Request, res : Response) => {
    try {
        const allUser = await getallUsers();
        console.log(allUser);
        return res.status(200).json({
            success : true,
            message : "All Users Fetched",
            Users : allUser
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : "Unable to fetch all Users" + error
        })
    }
}

export const updateEmployeeById =async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const data = req.body;

        const updateUser = await updateUserById(id, data);

        return res.status(200).json({
            success : true,
            message : "Update User's Information Successfully",
            userInfo : updateUser
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : "Unable to update User" + error
        })
    }
}

export const getEmployeeById =async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const user = await findUserWithId(id);
        return res.status(200).json({
            success : true,
            message : "User Fetched Successfully",
            UserInfo : user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Unable to Fetch User" + error
        })
    }
}


export const deleteEmployeeById = async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        await deleteUserById(id);
        return res.status(200).json({
            success : true,
            message : "User Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Unable to delete User" + error
        })
    }
}

export const setEmployeeCompany =async (req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const {companyId} = req.body;
        console.log(companyId);

        const updateUser = await updateUsersCompanyId(id, companyId);
        return res.status(200).json({
            success : true,
            message : "User's Company Id Changed",
            UserInfo : updateUser
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Unable to Fetch User" + error
        })
    }
}

export const loginEmployee = async (req : Request, res : Response) => {
    try {
        const {email, password} = req.body;
        const user = await loginUser(email, password); 
        const options = {
            expires: new Date(Date.now() +   60 * 60 * 1000)
        }
        const token = user.token;
        return res.cookie('tokenName', token, options).status(200).json({
            success : true,
            message : "Logged in Successfully",
            userDetails : user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Unable to Login User" + error
        })        
    }
}