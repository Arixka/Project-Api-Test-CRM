import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import { checkToken, isAdmin } from '../middlewares/checkAuth'
import * as validateDB from '../helpers/validations-mongodb'
import * as userCrtl from '../controllers/user.controller'

const router = Router()

router.get('/', checkToken, isAdmin, userCrtl.getAllUsers)

router.get(
    '/:userId',
    [
        checkToken,
        isAdmin,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(validateDB.idUserExist),
        validateReq
    ],
    userCrtl.getUserById
)

router.post(
    '/',
    [
        checkToken,
        isAdmin,
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'LastName is required').not().isEmpty(),
        check('email').custom(validateDB.emailExist),
        check('email', 'E-mail invalid').isEmail(),
        check('password', 'min. 6 characters')
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        check('role').custom(validateDB.roleValid),
        validateReq
    ],
    userCrtl.createUser
)

router.put(
    '/:userId',
    [
        checkToken,
        isAdmin,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(validateDB.idUserExist),
        validateReq
    ],
    userCrtl.updateUserById
)

router.delete(
    '/:userId',
    [
        checkToken,
        isAdmin,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(validateDB.idUserExist),
        validateReq
    ],
    userCrtl.deleteUserById
)

module.exports = router
