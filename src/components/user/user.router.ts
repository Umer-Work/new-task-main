import express from 'express';
import { registerNewEmployee, deleteEmployeeById, getAllEmployee, getEmployeeById, setEmployeeCompany, updateEmployeeById, loginEmployee } from './user.controller';
import { isAuth } from '../auth/auth.service';

const userRouter = express.Router();


userRouter.post('/createEmployee', registerNewEmployee);
userRouter.post('/loginEmployee', loginEmployee);

userRouter.get('/getAllEmployee', isAuth ,getAllEmployee);
userRouter.get('/getEmployee/:id', getEmployeeById);

userRouter.put('/updateEmployee/:id', updateEmployeeById);
userRouter.patch('/updateCompanyId/:id', setEmployeeCompany);


userRouter.delete('/deleteEmployee/:id', deleteEmployeeById);

export default userRouter;