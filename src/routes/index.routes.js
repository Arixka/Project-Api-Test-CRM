import { Router } from "express"
import userRouter from './user.routes'
import authRouter from './auth.routes'

const router = Router()


router.use('/auth', authRouter)
router.use('/users', userRouter)


module.exports = router
