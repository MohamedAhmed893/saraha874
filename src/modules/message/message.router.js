import express from 'express'
import { addMessage, deleteMessage, getAllMessage } from './message.controller.js'
import { protectedRoutes } from '../user/user.controller.js'

const messageRouter =express.Router()

messageRouter.post('/:sendTo',addMessage)
messageRouter.get('/',protectedRoutes,getAllMessage)
messageRouter.delete('/',protectedRoutes ,deleteMessage)
export default messageRouter