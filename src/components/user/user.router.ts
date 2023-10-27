import express, {Request , Response } from 'express';
import { registerNewEmployee, deleteEmployeeById, getAllEmployee, getEmployeeById, setEmployeeCompany, updateEmployeeById, loginEmployee, searchEmployeeByFilter } from './user.controller';
import { isAuth, refreshTokenController } from '../auth/auth.service';


const userRouter = express.Router();


userRouter.post('/refreshToken', refreshTokenController);

userRouter.post('/createEmployee', registerNewEmployee);
userRouter.post('/loginEmployee', loginEmployee);


userRouter.get('/protectedRoute', isAuth ,(req : Request ,res : Response )=>{
    res.send('Welcome to protected route');
})

userRouter.get('/getAllEmployee', isAuth ,getAllEmployee);
userRouter.get('/getEmployee/:id', isAuth, getEmployeeById);
userRouter.get("/searchEmployee", isAuth , searchEmployeeByFilter);


userRouter.put('/updateEmployee/:id', isAuth, updateEmployeeById);
userRouter.patch('/updateCompanyId/:id', isAuth, setEmployeeCompany);

userRouter.delete('/deleteEmployee/:id', isAuth , deleteEmployeeById);

export default userRouter;