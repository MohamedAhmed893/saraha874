import express from "express";
import { changePasswordOfUser, protectedRoutes, signIn, signUp } from "./user.controller.js";

const userRouter =express.Router()
userRouter.post('/signup',signUp)
userRouter.post('/signin',signIn)
userRouter.put('/changePasswordOfUser',protectedRoutes,changePasswordOfUser)

export default userRouter