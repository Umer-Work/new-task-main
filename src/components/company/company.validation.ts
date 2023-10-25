import * as Joi from "types-joi";

export const CompanySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().lowercase(),
  address: Joi.object({
    line1: Joi.string().required(),
    line2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.number().required(),
  }),
  contact: Joi.number().required().min(1000000000).max(9999999999), // 10 Digit Number 
  status: Joi.string().valid("ACTIVE", "INACTIVE").required(),
});

export const updateCompanySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    address: Joi.object({
      line1: Joi.string(),
      line2: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      zip: Joi.number(),
    }),
    contact: Joi.number().min(1000000000).max(9999999999), // 10 Digit Number 
    status: Joi.string().valid("ACTIVE", "INACTIVE"),
  });


