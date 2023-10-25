import mongoose from "mongoose";

// export default interface ICompany {
//   name : string,
//   email : string,
//   address: {
//     line1: string;
//     line2?: string;
//     city: string;
//     state: string;
//     country: string;
//     zip: number;
//   };
//   contact : string,
//   status : "ACTIVE" | "INACTIVE"
// }

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  contact: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "INACTIVE"],
  },
});

export const Company = mongoose.model("Company", CompanySchema);
