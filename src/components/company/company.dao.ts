import { Company } from "./company.model";

export const getAllCompanies = async() => {
  const allCompanies = await Company.find();
  return allCompanies;
};

export const createCompany = async(data: object) => {
  const newCompany = await Company.create(data);
  return newCompany;
};

export const findCompanyById = async(id: any) => { // eslint-disable-line
  const company = await Company.findById(id);
  return company;
};

export const findCompanyAndUpdate = async (id: any, data: object) => { // eslint-disable-line
  const updateCompany = await Company.findByIdAndUpdate(id, data, { new: true });
  return updateCompany;
};

export const getCompanyById = async (id : any) => { // eslint-disable-line
  const company = await Company.findById(id);
  return company;
}

export const deleteCompany = async (id:any) => { // eslint-disable-line
  await Company.deleteOne(id);
  return true;
}
