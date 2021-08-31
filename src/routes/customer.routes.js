import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import { validateImage } from '../middlewares/validateImage'
import { checkToken, isAdmin, authorizedRole } from '../middlewares/checkAuth'
import {
    emailExist,
    idCustomerExist,
    customerExist,
    roleValid
} from '../helpers/validations-mongodb'
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
} from '../controllers/customer.controller'


const router = Router()

router.get('/', checkToken, getAllCustomers)

router.get(
    '/:userId',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idCustomerExist),
        validateReq
    ],
    getCustomerById
)

router.post(
    '/',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        validateImage,
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'LastName is required').not().isEmpty(),
        check('phone', 'Phone is required').not().isEmpty(),
        check('phone').custom(customerExist),
        check('phone', 'Must be a phone number').isMobilePhone(),
        validateReq
    ],
    createCustomer
)

router.put(
    '/:userId',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        validateImage,
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idCustomerExist),
        validateReq
    ],
    updateCustomerById
)

router.delete(
    '/:userId',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(idCustomerExist),
        validateReq
    ],
    deleteCustomerById
)
module.exports = router
