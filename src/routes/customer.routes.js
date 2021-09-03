import { Router } from 'express'
import { check } from 'express-validator'
import { validateReq } from '../middlewares/validateReq'
import { validateImage } from '../middlewares/validateImage'
import { checkToken, isAdmin, authorizedRole } from '../middlewares/checkAuth'
import * as customerCtrl from '../controllers/customer.controller'
import * as validateDB from '../helpers/validations-mongodb'

const router = Router()

router.get('/', checkToken, customerCtrl.getAllCustomers)

router.get(
    '/:userId',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(validateDB.idCustomerExist),
        validateReq
    ],
    customerCtrl.getCustomerById
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
        check('phone').custom(validateDB.customerExist),
        check('phone', 'Must be a phone number').isMobilePhone(),
        validateReq
    ],
    customerCtrl.createCustomer
)

router.put(
    '/:userId',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(validateDB.idCustomerExist),
        validateReq
    ],
    customerCtrl.updateCustomerById
)

router.delete(
    '/:userId',
    [
        checkToken,
        authorizedRole('ADMIN', 'USER'),
        check('userId', 'Id not valid').isMongoId(),
        check('userId').custom(validateDB.idCustomerExist),
        validateReq
    ],
    customerCtrl.deleteCustomerById
)

module.exports = router
