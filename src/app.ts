import express from 'express';
import connectDatabase from './config/database';
import bodyParser from 'body-parser';
import companyRouter from './components/company/company.router';
import userRouter from './components/user/user.router';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


connectDatabase();
app.use(companyRouter);
app.use(userRouter);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});