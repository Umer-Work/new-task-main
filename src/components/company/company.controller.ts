import { Request, Response } from "express";
import { createNewCompany, getCompanies, updateCompanyById, fetchCompanyById, deleteCompanyById, searchByFilter } from "./company.service";

export const newCompany = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const company = await createNewCompany(data);
    return res.status(201).json({
      success: true,
      message: "Company created Successfully",
      CompanyInfo: company,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Cannot create a new company at the moment",
      error: error,
    });
  }
};

export const fetchAllCompanies = async (req: Request, res: Response) => {
  try {
    const allCompanies = await getCompanies();
    if(allCompanies.length === 0){
      return res.status(404).json({
        success: true,
        message: "No Company is there in database",
      });      
    }
    return res.status(200).json({
      success: true,
      message: "Company created Successfully",
      allCompanies: allCompanies,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unable to Fetched all Companies",
    });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: object = req.body;

    const updatedCompany = await updateCompanyById(id, data);

    return res.status(200).json({
      success: true,
      message: "Company's information updated Successfully",
      CompanyInfo: updatedCompany,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to update Company's Information" + error,
    });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    console.log(id)
    const company = await fetchCompanyById(id);
    return res.status(200).json({
      success: true,
      message: "Company Fetched",
      CompanyInfo: company,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "" + error,
    });
  }
}

export const deleteCompany = async (req : Request, res : Response) => {
  try {
    const {id} = req.params;

    await deleteCompanyById(id);
    return res.status(200).json({
      success : true,
      message : "Company Deleted successfully"
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to delete Company" + error,
    });
  }
}

export const searchCompanyByFilter = async (req: Request, res: Response) => {
  try {
    const field = Object.keys(req.query)[0]; 
    const query = req.query[field] as string;
    console.log(field + " " + query);
    const companies = await searchByFilter(query);
    if(companies.length === 0){
      return res.status(404).json({
        success: true,
        message: "No Company Found",
      });      
    }
    return res.status(200).json({
      success: true,
      message: "Companies Found",
      companies: companies,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to search Company: " + error,
    });
  }
};