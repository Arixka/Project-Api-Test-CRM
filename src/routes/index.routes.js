import { Router } from "express"
import userRouter from './user.routes'
import authRouter from './auth.routes'
import customerRouter from './customer.routes'

const router = Router()


router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/customers', customerRouter)


module.exports = router
