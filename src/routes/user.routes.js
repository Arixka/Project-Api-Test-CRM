import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import {
    emailExist,
    idExist,
    roleValid
} from '../helpers/validations-mongodb'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/user.controller'

const router = Router()
router.get('/', getAllUsers)
router.get(
    '/:userId',
    [
        check('email').custom(emailExist),
        check('email', 'E-mail invalid').isEmail()
    ],
    getUserById
)
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email').custom(emailExist),
        check('email', 'E-mail invalid').isEmail(),
        check('password', 'min. 6 characters')
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        check('role').custom(roleValid),
        validateReq
    ],
    createUser
)
router.put(
    '/:userId',
    [
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idExist),
        validateReq
    ],
    updateUserById
)
router.delete(
    '/:userId',
    [
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idExist),
        validateReq
    ],
    deleteUserById
)

module.exports = router
