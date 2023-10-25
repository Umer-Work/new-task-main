// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// export const sendVerificationEmail =async (email : string, verificationToken : string) => {
//     try {
//         const transporter = nodemailer.createTransport{
//             host : 'smtp.gmail.com',
//             auth : {
//                 user : 'karachiwalaumer2612@gmail.com',
//                 pass : 'Soul'
//             }
//         }
//         // const verificationLink = `https://example.com/verify?token=${verificationToken}`;

//         const info = await transporter.sendMail({
//             from: 'WebOsmotics',
//             to: email,
//             subject: 'Email Verification',
//             // text: `Click the following link to verify your email: ${verificationLink}`,
//             text : 'Click the following link to verify your email'
//         });
//         console.log(info);
//         return info;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }