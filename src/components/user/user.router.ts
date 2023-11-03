import express, {Request , Response } from 'express';
import { registerNewEmployee, deleteEmployeeById, getAllEmployee, getEmployeeById, setEmployeeCompany, updateEmployeeById, loginEmployee, searchEmployeeByFilter } from './user.controller';
import { refreshTokenController } from '../auth/auth.service';
import { verifyingAuthentication } from '../auth/auth.controller';



const userRouter = express.Router();


userRouter.post('/refreshToken', refreshTokenController);

userRouter.post('/createEmployee', registerNewEmployee);
userRouter.post('/loginEmployee', loginEmployee);


userRouter.get('/protectedRoute', verifyingAuthentication ,(req : Request ,res : Response )=>{
    res.send('Welcome to protected route');
})

userRouter.get('/getAllEmployee', verifyingAuthentication ,getAllEmployee);
userRouter.get('/getEmployee/:id', verifyingAuthentication, getEmployeeById);
userRouter.get("/searchEmployee" , verifyingAuthentication, searchEmployeeByFilter);


userRouter.put('/updateEmployee/:id', verifyingAuthentication, updateEmployeeById);
userRouter.patch('/updateCompanyId/:id', verifyingAuthentication, setEmployeeCompany);

userRouter.delete('/deleteEmployee/:id', verifyingAuthentication , deleteEmployeeById);



//TEST LOGGER ROUTES
userRouter.get('/warning',(req : Request, res : Response) => {
    res.status(400).send('warning route');
})

userRouter.get('/error',(req : Request, res : Response) => {
    res.status(500).send('warning route');
})

export default userRouter;