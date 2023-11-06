import express from 'express';
import connectDatabase from './config/database';
import bodyParser from 'body-parser';
import companyRouter from './components/company/company.router';
import userRouter from './components/user/user.router';
import cookieParser from 'cookie-parser';
import { LogAPI } from './middleware/logger.middleware';
import { upload } from './util/multer';
import { registerNewEmployee } from './components/user/user.controller';


const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Logs Middleware
app.use(LogAPI);


//Multer
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/create.html');
});

app.post('/register', upload.single('filename'),registerNewEmployee)


connectDatabase();
app.use(companyRouter);
app.use(userRouter);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});