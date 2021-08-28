import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import { checkToken, isAdmin } from '../middlewares/checkAuth'
import {
    emailExist,
    idUserExist,
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

router.get('/', checkToken, isAdmin, getAllUsers)

router.get(
    '/:userId',
    [
        checkToken,
        isAdmin,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idUserExist),
        validateReq
    ],
    getUserById
)

router.post(
    '/',
    [
        checkToken,
        isAdmin,
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'LastName is required').not().isEmpty(),
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
        checkToken,
        isAdmin,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idUserExist),
        validateReq
    ],
    updateUserById
)

router.delete(
    '/:userId',
    [
        checkToken,
        isAdmin,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idUserExist),
        validateReq
    ],
    deleteUserById
)

module.exports = router
