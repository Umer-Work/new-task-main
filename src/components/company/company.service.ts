import { CompanySchema, updateCompanySchema } from "./company.validation";
import {
  createCompany,
  deleteCompany,
  findCompanyAndUpdate,
  getAllCompanies,
  getCompanyById,
  findCompanyById
} from "./company.dao";

export const createNewCompany = (companyData: object) => {
  try {
    const { value, error }: any = CompanySchema.validate(companyData); // eslint-disable-line
    if (error) {
      throw new Error(
        "Validation Error : " +
          error.details.map((detail: any) => detail.message).join(", ") // eslint-disable-line
      );
    }
    const newCompany = createCompany(value);
    return newCompany;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCompanies = () => {
  try {
    const companies = getAllCompanies();
    return companies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCompanyById = (id: unknown, data: object) => {
  try {
    const { value, error }: any = updateCompanySchema.validate(data); // eslint-disable-line
    if (error) {
      throw new Error(
        "Validation Error : " +
          error.details.map((detail: any) => detail.message).join(", ") // eslint-disable-line
      );
    }
    const companyUpdated = findCompanyAndUpdate(id, value);
    return companyUpdated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// eslint-disable-next-line
export const fetchCompanyById = (id: any) => {
  try {
    const company = getCompanyById(id);
    if (!company) {
      throw new Error("Company not Found, Please provide valid Company Id");
    }
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// eslint-disable-next-line
export const deleteCompanyById = async (id: any) => {
  try {
    const company =  await findCompanyById(id);
    if(!company){
      throw new Error("Company not Found, Please provide valid Company Id");
    }
    await deleteCompany(id);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// eslint-disable-next-line

