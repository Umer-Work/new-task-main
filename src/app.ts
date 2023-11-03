import express from 'express';
import connectDatabase from './config/database';
import bodyParser from 'body-parser';
import companyRouter from './components/company/company.router';
import userRouter from './components/user/user.router';
import cookieParser from 'cookie-parser';
import { LogAPI } from './middleware/logger.middleware';
// import {transports,format} from 'winston';
// import expressWinston from 'express-winston';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(LogAPI);
// // Add Logger Middleware {Using Winston Library}
// app.use(expressWinston.logger({
//   transports : [
//     new transports.File({
//       level : 'warn',
//       filename: 'src/logs/warningLogger.log'
//     }),
//     new transports.File({
//       level : 'error',
//       filename: 'src/logs/errorLogger.log'
//     }),
//   ],
//   format : format.combine(
//     format.json(),
//     format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
//     format.prettyPrint()
//   ),
//   statusLevels : true
// }));





connectDatabase();
app.use(companyRouter);
app.use(userRouter);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});