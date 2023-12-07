import { userModel } from "../../../databases/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchAsyncError.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const signUp = catchAsyncError(async (req, res, next) => {
    const isFound = await userModel.findOne({ email: req.body.email })
    if (isFound) return next(new AppError("Account Already Exist Before", 403))
    const user = new userModel(req.body)
    await user.save()
    res.json({ message: "success", user })
})
const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    const isFound = await userModel.findOne({ email })
    if (!email || !(await bcrypt.compare(password, isFound.password))) {
        return next(new AppError("Error in Gmail or Password"))
    }
    let token = jwt.sign({ userId: isFound._id, Gmail: isFound.email, name: isFound.name }, 'qwdqwdqwdjqdniolqo');
    res.json({ message: "login", token })

})
const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const token = req.headers.token
    if (!token) return next(new AppError("TOKEN MUST BE PROVIDED", 401))
    let decoded = await jwt.verify(token, 'qwdqwdqwdjqdniolqo')
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("Invalid Token", 401))
    if (user.changePassword) {
        let changePassword = parseInt(user.changePassword.getTime() / 1000)
        if (changePassword > decoded.iat) return next(new AppError("Invalid Token", 401))
    }
    req.user = user
    next()
})
const changePasswordOfUser = catchAsyncError(async (req, res, next) => {
    req.body.changePassword = Date.now()
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
    !user && next(new AppError("User Not Found", 401))
    user && res.json({ message: "success", user })
})
export {
    signUp,
    signIn,
    protectedRoutes,
    changePasswordOfUser
}