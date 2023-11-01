import { Company } from "./company.model";
import mongoose from 'mongoose'

export const getAllCompanies = async () => {
  const allCompanies = await Company.aggregate([
    {$match : {}}
  ]);
  return allCompanies;
};

export const createCompany = async (data: object) => {
  const newCompany = await Company.create(data);
  return newCompany;
};

export const findCompanyById = async (companyId: any) => {
  const ObjectId = mongoose.Types.ObjectId;
  const company = await Company.aggregate([
    { $match: { _id: new ObjectId(companyId) } }
  ]);
  return company;
};


export const findCompanyAndUpdate = async (id: any, data: object) => {
  const ObjectId = mongoose.Types.ObjectId;
  const updateCompanyInfo = await Company.aggregate([
    { $match: { _id: new ObjectId(id) } },
    {$replaceRoot: { newRoot: { $mergeObjects: [ "$$ROOT", data ] } }},
  ]);
  // How to change value in database???
  const company = await Company.findOneAndUpdate({_id : updateCompanyInfo[0]._id}, updateCompanyInfo[0], {new:true})
  return company;
};

export const deleteCompany = async (id: any) => {
  await Company.deleteOne(id);
  return true;
};

export const searchCompany = async (query: string) => {
  const filter = new RegExp(query, "i");
  const companies = await Company.aggregate([
    {$match : { $or: [{ name: filter }, { email: filter }, { status: filter }]}}
  ]);
  return companies;
};
// export const searchCompany =async (field : string, query : string) => {
//     let filter: any = {};
//     if (field === "name") {
//       filter = { name: { $regex: new RegExp(query, 'i') } };
//     } else if (field === "email") {
//       filter = { email: { $regex: new RegExp(query, 'i') } };
//     } else if (field === "status") {
//       filter = { status: { $regex: new RegExp(query, 'i') } };
//     }
//   const companies = await Company.find(filter);
//   return companies;
// }