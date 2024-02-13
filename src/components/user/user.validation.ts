import Joi from "joi";
import mongoose from "mongoose";


const userJoiSchema = Joi.object ({
  firstName: Joi.string().required().min(3).messages({
    'string.min' : 'First Name should be at least 3 characters long', 
  }),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  designation: Joi.string()
    .valid("MANAGER", "TEAM_LEADER", "DEVELOPER")
    .required(),
  companyId: Joi.string()
    .custom((value:any, helpers:any) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("Invalid companyId format");
      }
      return value;
    })
    .required(),
  isVerified: Joi.boolean().required(),
  profileImage : Joi.string().allow("",null).optional(),
  token: Joi.string().allow("", null).optional(),
});

export function validateUser(user: object) {
  return userJoiSchema.validate(user);
}

const updateUserJoiSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  designation: Joi.string().valid("MANAGER", "TEAM_LEADER", "DEVELOPER"),
  companyId: Joi.string().custom((value:any, helpers:any) => {
    if (value && !mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("Invalid companyId format");
    }
    return value;
  }),
  isVerified: Joi.boolean(),
  token: Joi.string().allow("", null),
});

export function validateUserUpdate(user: object) {
  return updateUserJoiSchema.validate(user);
}