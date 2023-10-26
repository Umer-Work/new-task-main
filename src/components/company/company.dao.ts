import { Company } from "./company.model";

export const getAllCompanies = async() => {
  const allCompanies = await Company.find();
  return allCompanies;
};

export const createCompany = async(data: object) => {
  const newCompany = await Company.create(data);
  return newCompany;
};

export const findCompanyById = async(id: any) => { 
  const company = await Company.findById(id);
  return company;
};

export const findCompanyAndUpdate = async (id: any, data: object) => { 
  const updateCompany = await Company.findByIdAndUpdate(id, data, { new: true });
  return updateCompany;
};

export const getCompanyById = async (id : any) => { 
  const company = await Company.findById(id);
  return company;
}

export const deleteCompany = async (id:any) => { 
  await Company.deleteOne(id);
  return true;
}

export const searchCompany =async (field : string, query : string) => {
    let filter: any = {};
    if (field === "name") {
      filter = { name: { $regex: new RegExp(query, 'i') } };
    } else if (field === "email") {
      filter = { email: { $regex: new RegExp(query, 'i') } };
    } else if (field === "status") {
      filter = { status: { $regex: new RegExp(query, 'i') } };
    }
  const companies = await Company.find(filter);
  return companies;
}