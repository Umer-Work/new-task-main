import mongoose from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designation: string;
  companyId: string;
  isVerified: boolean;
  profilePicture: string;
  accessToken?: string;
  refreshToken?: string;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        enum: ['MANAGER', 'TEAM_LEADER', 'DEVELOPER'],
        required: true,
      },
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      },
      isVerified: {
        type: Boolean,
        required: true,
      },
      accessToken : {
        type : String
      },
      refreshToken: {
        type : String
      }
});

export default mongoose.model('User', userSchema);