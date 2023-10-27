import mongoose from "mongoose";

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