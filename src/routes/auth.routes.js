import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.controller'
import { validateReq } from '../middlewares/validateReq'

const router = Router()

router.post(
    '/login',
    [
        check('email', 'E-mail is required').not().isEmpty(),
        check('email', 'E-mail invalid').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validateReq
    ],
    login
)

module.exports = router
