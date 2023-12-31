import express from "express";

import {
  newCompany,
  fetchAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  searchCompanyByFilter
} from "./company.controller";


const companyRouter = express();

companyRouter.post("/createCompany", newCompany);

companyRouter.put("/updateCompany/:id", updateCompany);
companyRouter.patch("/updateCompany/:id", updateCompany);

companyRouter.get("/getCompanies", fetchAllCompanies);
companyRouter.get("/getCompany/:id", getCompanyById);
companyRouter.get("/searchCompany", searchCompanyByFilter);

companyRouter.delete("/deleteCompany/:id", deleteCompany);

export default companyRouter;
