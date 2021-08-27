import { Router } from 'express'
import { check } from 'express-validator'
import { validate } from '../midelwares/validate'
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
        check('email', 'E-mail invalid').isEmail(),
        check('password', 'min. 6 characters')
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        validate
    ],
    createUser
)

router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.put('/:userId', updateUserById)
router.delete('/:userId', deleteUserById)

module.exports = router
