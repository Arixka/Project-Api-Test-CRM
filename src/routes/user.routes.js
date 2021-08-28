import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import { isEmail, roleValidation } from '../helpers/validations-mongodb'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/user.controller'


const router = Router()

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email').custom(isEmail),
        check('email', 'E-mail invalid').isEmail(),
        check('password', 'min. 6 characters')
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        check('role').custom(roleValidation),
        validateReq
    ],
    createUser
)
router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.patch('/:userId', updateUserById)
router.delete('/:userId', deleteUserById)

module.exports = router
