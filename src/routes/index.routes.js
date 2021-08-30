import { Router } from "express"
import userRouter from './user.routes'
import authRouter from './auth.routes'
import customerRouter from './customer.routes'
import uploadRouter from './upload.routes'
const router = Router()


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/customer', customerRouter)
router.use('/upload', uploadRouter)



module.exports = router
