require('dotenv').config();
import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../configs/models/user.model';
import { HTTP_BAD_REQUEST } from '../constant/http_status';
import bcrypt from 'bcryptjs'

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
     const usersCount = await UserModel.countDocuments();
     if(usersCount> 0){
       res.send("Seed is already done!");
       return;
     }

     await UserModel.create(sample_users);
     res.send("Seed Is Done!");
 }
 ))

router.post("/login", asyncHandler (
  async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne ({email, password});

   if(user) {
    res.send(generateTokenReponse(user));
   }
   else{

     res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
   }

}) 
)

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(HTTP_BAD_REQUEST)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  }
))

const generateTokenReponse = (user: User) => {
  const token = jwt.sign({
     id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token: token,
  };
}
export default router;